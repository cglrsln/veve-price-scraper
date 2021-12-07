#!/usr/bin/env node

const path = require("path");

console.log("__dirname", __dirname);
console.log(process.mainModule);

console.log("process.cwd()", process.cwd());
console.log("path.join(./sets.json)", path.join("sets.json"));
console.log(
  "path.join(__dirname, ./sets.json)",
  path.join(__dirname, "../sets.json")
);
