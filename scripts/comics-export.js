#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

function readComics() {
    const rawdata = fs.readFileSync(path.join('./comics.v2.json'));
    return JSON.parse(rawdata)
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
            return 'Ultra Rare';
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
            name: [comic.series, `#${comic.issue}`].join(' '),
            rarity: v.rarity,
            totalIssued: v.totalIssued,
            floorPrice: v.floorPrice
        })
    })
})

issues.sort((a, b) => a.id - b.id);

issues.forEach(i => {
    console.log(`${i.id}, "${i.name}", "${formatRarity(i.rarity)}", ${i.totalIssued}, ${i.floorPrice}`)
})

const totalCount = issues.reduce((current, next) => current + next.totalIssued, 0);
console.log(totalCount);
