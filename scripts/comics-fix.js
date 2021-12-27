#!/usr/bin/env node
// used to patch comics with property changes

const fs = require("fs");
const path = require("path");

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

const currentComics = readComics();

currentComics.forEach(comic => {
  comic.issue = parseInt(comic.issue.slice(1));

  comic.variants.forEach(variant => {
    variant.floorPrice = variant.floor;
    delete variant.floor;
  });
});

writeComics(currentComics);
