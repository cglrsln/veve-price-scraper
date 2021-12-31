#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// process.stdin.on("data", data => {
//   const prices = JSON.parse(data.toString());
//   processComicsPrices(prices.data);
//   process.exit();
// });

function readComics() {
  const rawdata = fs.readFileSync(path.join("./comics.v2.json"));
  return JSON.parse(rawdata);
}

function writeComics(comics) {
  fs.writeFileSync(
    path.resolve(path.join("./comics.v2.json")),
    JSON.stringify(comics, null, 2)
  );
}

function processComicsPrices(prices) {
  const priceMap = prices.map(p => {
    return {
      series: p.comicSeries.name.trim(),
      rarity: p.cover.rarity.trim(),
      issue: p.comicNumber,
      floorPrice: p.metrics.lowestPrice,
      updatedAt: new Date(p.metrics.updatedAt),
    };
  });

  const currentComics = readComics();

  currentComics.forEach(issue => {
    issue.variants.forEach(v => {
      const updatedPrice = priceMap.find(pm => {
        return (
          pm.series === issue.series &&
          pm.issue === issue.issue &&
          pm.rarity === v.rarity
        );
      });

      if (updatedPrice) {
        updatedPrice.processed = true;
        console.log(
          `${issue.series} ${issue.issue} (${v.rarity}) ${v.floorPrice} => ${updatedPrice.floorPrice}`
        );

        v.floorPrice = updatedPrice.floorPrice;
        v.updatedAt = updatedPrice.updatedAt;
      }
    });
  });

  console.log(priceMap.filter(pm => !pm.processed));
  writeComics(currentComics);
}

module.exports = processComicsPrices;