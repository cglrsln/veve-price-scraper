#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

function readComics() {
  const rawdata = fs.readFileSync(path.join(__dirname, "../comics.json"));
  return JSON.parse(rawdata);
}

// Main
const comics = readComics();

comics.sort((a, b) => Date.parse(a.drop) - Date.parse(b.drop));

comics.forEach(comic => {
  comic.issues.forEach(issue => {
    console.log(`${issue.drop}, ${comic.series}, ${issue.issue}`);
  });
});


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
// });

// writeSets(sets);
// console.log(sets.map(s => `${s.id} ${s.date} ${s.name}`));
