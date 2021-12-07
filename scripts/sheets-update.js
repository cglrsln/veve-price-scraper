#!/usr/bin/env node

process.stdin.on("data", data => {
  const dataLines = data.toString().split("\n");
  const lines = dataLines.map(line => line.split("\t"));

  const finalLines = lines.map(line => {
    const [id, name, rarity, edition, cost, floor] = line;

    const formattedEdition = edition
      .replace(/\#/, "") //remove previous
      .toUpperCase()
      .replace(/\d+/, "#$&");
    const formattedCost = cost.slice(1);
    return [id, name, rarity, formattedEdition, formattedCost, floor];
  });

  finalLines.forEach(line => {
    console.log(line.join(";"));
  });

  process.exit();
});

// const fs = require("fs");
// const path = require("path");

// process.stdin.on("data", data => {

//   console.log(data.toString());

//   // const prices = JSON.parse(data.toString());
//   // processPrices(prices.data);
//   process.exit();
// });

// function readSets() {
//   const rawdata = fs.readFileSync(path.join("./sets.json"));
//   return JSON.parse(rawdata);
// }

// function writeSets(sets) {
//   fs.writeFileSync(
//     path.resolve(path.join("./sets.json")),
//     JSON.stringify(sets, null, 2)
//   );
// }

// function processPrices(prices) {
//   const priceMap = prices.map(p => {
//     return {
//       name: p.name.trim(),
//       brand: p.brand.name.trim(),
//       floorPrice: p.metrics.lowestPrice,
//       updatedAt: new Date(p.metrics.updatedAt),
//     };
//   });

//   const currentSets = readSets();

//   currentSets.forEach(cs => {
//     cs.collectibles.forEach(cl => {
//       const updatedPrice = priceMap.find(pm => pm.name === cl.name && pm.brand === cs.brand);
//       if (updatedPrice) {
//         console.log(
//           "updating",
//           cl.name,
//           cl.floorPrice,
//           "=>",
//           updatedPrice.floorPrice
//         );
//         cl.floorPrice = updatedPrice.floorPrice;
//         cl.updatedAt = updatedPrice.updatedAt.toISOString();

//         updatedPrice.proccesed = true;
//       }
//     });
//   });

//   writeSets(currentSets);

//   // write out unprocessed collectibes
//   priceMap.filter(pm => !pm.proccesed).forEach(pm => console.log(pm));
// }
