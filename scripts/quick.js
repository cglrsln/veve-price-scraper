#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const processComicsPrices = require("./comics-quick");

process.stdin.on("data", data => {
  const prices = JSON.parse(data.toString());

  if (prices.data[0].brand) {
    console.log("Processing Sets");
    processSetPrices(prices.data);
  } else if (prices.data[0].comicSeries) {
    console.log("Processing Comics");
    processComicsPrices(prices.data);
  }

  process.exit();
});

function readSets() {
  const rawdata = fs.readFileSync(path.join("./sets.json"));
  return JSON.parse(rawdata);
}

function writeSets(sets) {
  fs.writeFileSync(
    path.resolve(path.join("./sets.json")),
    JSON.stringify(sets, null, 2)
  );
}

function processSetPrices(prices) {
  const priceMap = prices.map(p => {
    return {
      name: p.name.trim(),
      brand: p.brand.name.trim(),
      floorPrice: p.metrics.lowestPrice,
      updatedAt: new Date(p.metrics.updatedAt),
    };
  });

  const currentSets = readSets();

  currentSets.forEach(cs => {
    cs.collectibles.forEach(cl => {
      const updatedPrice = priceMap.find(
        pm => pm.name === cl.name && pm.brand === cs.brand
      );
      if (updatedPrice) {
        console.log(
          "updating",
          cl.name,
          cl.floorPrice,
          "=>",
          updatedPrice.floorPrice
        );
        cl.floorPrice = updatedPrice.floorPrice;
        cl.updatedAt = updatedPrice.updatedAt.toISOString();

        updatedPrice.proccesed = true;
      }
    });
  });

  writeSets(currentSets);

  // write out unprocessed collectibes
  priceMap.filter(pm => !pm.proccesed).forEach(pm => console.log(pm));
}
