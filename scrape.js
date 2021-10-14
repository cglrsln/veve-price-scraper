const path = require('path');
const fs = require('fs');
const axios = require("axios");

console.log("hello")

function fileString(ts) {
  const year = ts.getUTCFullYear();
  const month = (ts.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = ts
    .getUTCDate()
    .toString()
    .toString()
    .padStart(2, '0');
  const hour = ts.getUTCHours().toString().padStart(2, '0');
  const minute = ts.getUTCMinutes().toString().padStart(2, '0');
  const name = `${year}-${month}-${day}-${hour}-${minute}`;
  return name;
}

const dataFolder = '/data';
const now = new Date();
const pathToData = path.join(__dirname, dataFolder, fileString(now)) + '.json';

async function getData() {
  try {
    const response = await axios.get('https://ecomiwiki.com/api/metrics/marketplace')
    return response.data;
  } catch(error) {
    console.log(error)
  }
}

getData().then( data => {
  fs.writeFileSync(path.resolve(pathToData), JSON.stringify(data, null, 2));
})
