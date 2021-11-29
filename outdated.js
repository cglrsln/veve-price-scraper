#!/usr/bin/env node
console.log(process.version)

const fs = require('fs');
const path = require('path');

function readSets() {
  const rawdata = fs.readFileSync(path.join('./sets.json'));
  return JSON.parse(rawdata)
}


const sets = readSets();

const collectibles = sets.map(set => {
  return set.collectibles;
}).flat()

collectibles.sort((a, b) => Date.parse(a.updatedAt || '01 Jan 1970') - Date.parse(b.updatedAt || '01 Jan 1970'))
console.log(collectibles.slice(0, 20))

