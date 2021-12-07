#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

function readSets() {
  const rawdata = fs.readFileSync(path.join(__dirname, "../sets.json"));
  return JSON.parse(rawdata);
}

// function writeSets(sets) {
//   fs.writeFileSync(
//     path.resolve(path.join(__dirname, "../sets.json")),
//     JSON.stringify(sets, null, 2)
//   );
// }

// Main
const sets = readSets();

//const exported = sets.map(s => `${s.id}, "${s.brand} - ${s.name}"`);
const exported = sets.map(s => s.collectibles);


exported.flat().forEach(c => {
  console.log(`${c.id}, "${c.name}", ${c.rarity}, ${c.totalIssued}, ${c.floorPrice}`);
});

// sets.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));

// let dropCount, currentSeason;
// sets.forEach(set => {
//   const season = set.season;

//   if (season !== currentSeason) {
//     dropCount = 1;
//     currentSeason = season;
//   } else {
//     dropCount++;
//   }

//   set.id = [season, dropCount].join(".");

//   set.collectibles.sort(compareRarity);
//   set.collectibles.forEach((c, i) => {
//     c.id = [set.id, i + 1].join(".");
//   });
// });

// writeSets(sets);
// console.log(sets.map(s => `${s.id} ${s.date} ${s.name}`));
