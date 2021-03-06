#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

function readComics() {
  const rawdata = fs.readFileSync(path.join("./comics.v2.json"));
  return JSON.parse(rawdata);
}

// let seriesId = 0;
// function nextSeriesId() {
//     return `C${seriesId++}`;
// }

function formatRarity(rarity) {
  switch (rarity) {
    case "COMMON":
      return "Common";
    case "UNCOMMON":
      return "Uncommon";
    case "RARE":
      return "Rare";
    case "ULTRA_RARE":
      return "Ultra Rare";
    case "SECRET_RARE":
      return "Secret Rare";
  }
}

const comics = readComics();
const issues = [];

comics.forEach(comic => {
  comic.variants.forEach(v => {
    issues.push({
      id: v.id,
      name: [comic.series, `#${comic.issue}`].join(" "),
      rarity: formatRarity(v.rarity),
      totalIssued: v.totalIssued,
      floorPrice: v.floorPrice,
    });
  });
});

issues.sort((a, b) => a.id - b.id);

// Write out CSV
const createCsvStringifier = require("csv-writer").createObjectCsvStringifier;

const csvStringifier = createCsvStringifier({
  header: [
    { id: "id", title: "id" },
    { id: "name", title: "name" },
    { id: "rarity", title: "rarity" },
    { id: "totalIssued", title: "Total Editions" },
    { id: "floorPrice", title: "Floor Price" },
  ],
});

console.log(csvStringifier.stringifyRecords(issues));

//write out total count
const totalCount = issues.reduce(
  (current, next) => current + next.totalIssued,
  0
);
console.log(totalCount);
