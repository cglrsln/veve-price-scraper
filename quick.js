#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

process.stdin.on('data', data => {
  const prices = JSON.parse(data.toString());
  processPrices(prices.data);
  process.exit();
});

function readSets() {
  const rawdata = fs.readFileSync(path.join('./sets.json'));
  return JSON.parse(rawdata)
}

function writeSets(sets) {
  fs.writeFileSync(path.resolve(path.join('./sets.json')), JSON.stringify(sets, null, 2));
}

function processPrices(prices) {

  const priceMap = prices.map(p => {
    return {
      name: p.name,
      floorPrice: p.metrics.lowestPrice,
      updatedAt: new Date(p.metrics.updatedAt)
    }
  })

  const currentSets = readSets();

  currentSets.forEach(cs => {
    cs.collectibles.forEach(cl => {
      const updatedPrice = priceMap.find(pm => pm.name === cl.name)
      if (updatedPrice) {
        console.log('updating', cl.name, cl.floorPrice, updatedPrice.floorPrice)
        cl.floorPrice = updatedPrice.floorPrice
        cl.updatedAt = updatedPrice.updatedAt.toISOString()
      }
    });
  });

  writeSets(currentSets);
}
