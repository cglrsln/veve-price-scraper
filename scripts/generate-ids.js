#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

function readSets() {
  const rawdata = fs.readFileSync(path.join(__dirname, "../sets.json"));
  return JSON.parse(rawdata);
}

function writeSets(sets) {
  fs.writeFileSync(
    path.resolve(path.join(__dirname, "../sets.json")),
    JSON.stringify(sets, null, 2)
  );
}

function compareRarity(a, b) {
  const values = {
    COMMON: 1,
    UNCOMMON: 2,
    RARE: 3,
    ULTRA_RARE: 4,
    SECRET_RARE: 5,
  };

  return values[a.rarity] - values[b.rarity];
}

// Main
const sets = readSets();

sets.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));

let dropCount, currentSeason;
sets.forEach(set => {
  const season = set.season;

  if (season !== currentSeason) {
    dropCount = 1;
    currentSeason = season;
  } else {
    dropCount++;
  }

  set.id = [season, dropCount.toString().padStart(2, 0)].join(".");

  set.collectibles.sort(compareRarity);
  set.collectibles.forEach((c, i) => {
    c.id = [set.id, (i + 1).toString().padStart(2, 0)].join(".");
  });
});

writeSets(sets);
console.log(sets.map(s => `${s.id} ${s.date} ${s.name}`));
