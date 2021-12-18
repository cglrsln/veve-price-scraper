#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

function readSeries() {
    const rawdata = fs.readFileSync(path.join('./comics.json'));
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

const issues = [];
const series = readSeries();

series.forEach(s => {
    s.issues.forEach(issue => {
        issue.variants.forEach(v => {
            issues.push({
                name: [s.series, issue.issue].join(' '),
                series: s.series,
                publisher: s.publisher,
                published: issue.published,
                issue: issue.issue,
                drop: issue.drop,
                rarity: v.rarity,
                variantName: v.name,
                totalIssued: v.totalIssued,
                exclusiveCover: !!v.exclusiveCover
            })
        })
    })
})

issues.sort((a, b) => Date.parse(a.drop) - Date.parse(b.drop));

let comicId = 0;
let currentSeries;
let currentVarient;
issues.forEach(i => {
    if (currentSeries != i.name) {
        currentSeries = i.name;
        currentVarient = 1;
        comicId++;
    }

    i.id = `C${(comicId).toString().padStart(3, 0)}.${currentVarient++}`;
})

issues.forEach(i => {
    console.log(`${i.id}, "${i.name}", "${formatRarity(i.rarity)}", "${i.variantName}", ${i.totalIssued}, ${i.exclusiveCover}, ${i.drop}, ${i.publisher}, ${i.published}`)
})


const totalCount = issues.reduce((current, next) => current + next.totalIssued, 0);
console.log(totalCount);