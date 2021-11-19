/*
  Quick cli script to modify sets.json
*/
const fs = require('fs');
const path = require('path');

function readSets() {
  const rawdata = fs.readFileSync(path.join('./sets.json'));
  return JSON.parse(rawdata)
}

const sets = readSets();

sets.forEach((set) => {
  set.collectibles = set.collectibles.map((item) => {
    delete item.brand;
    return item;
  });

})

sets.sort((a, b) => {
  return a.date - b.date;
})

console.log(JSON.stringify(sets))

// Nov - move brand up a level
// function readCurrent() {
//   const rawdata = fs.readFileSync(path.join('./build/current.json'));
//   return JSON.parse(rawdata)
// }

// const sets = readSets();
// const current = readCurrent();

// const updatedSets = sets.map(set => {

//   const currentSet = current.find(cset => cset.name === set.name)
//   set.brand = currentSet.collectibles[0].brand;

//   return set;
// })
// console.log(JSON.stringify(updatedSets))
