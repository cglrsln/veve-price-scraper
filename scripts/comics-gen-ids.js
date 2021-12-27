#!/usr/bin/env node

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
currentComics.sort((a, b) => Date.parse(a.drop) - Date.parse(b.drop));

let nextId = 1;
currentComics.forEach(comic => {
    comic.id = `C${nextId.toString().padStart(3, '0')}`;

    let nextVariantId = 1;
    comic.variants.forEach(variant => {
        variant.id = `${comic.id}.${nextVariantId}`
        nextVariantId++;
    });

    nextId++;
})

writeComics(currentComics);