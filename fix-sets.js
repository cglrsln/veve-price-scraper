/*
  Quick cli script to modify sets.json
*/
const fs = require('fs');
const path = require('path');

function readSets() {
  const rawdata = fs.readFileSync(path.join('./sets.json'));
  return JSON.parse(rawdata)
}

function readCurrent() {
  const rawdata = fs.readFileSync(path.join('./build/current.json'));
  return JSON.parse(rawdata)
}

const sets = readSets();
const current = readCurrent();

const updatedSets = sets.map(set => {

  const currentSet = current.find(cset => cset.name === set.name)
  set.brand = currentSet.collectibles[0].brand;

  return set;
})
console.log(JSON.stringify(updatedSets))
