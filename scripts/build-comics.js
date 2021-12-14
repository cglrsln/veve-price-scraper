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
            return "(Common)";
        case "UNCOMMON":
            return "(Uncommon)";
        case "RARE":
            return "(Rare)";
        case "ULTRA_RARE":
            return '(Ultra Rare)';
        case "SECRET_RARE":
            return "(Secret Rare)";
    }
}

const issues = [];
const series = readSeries();

series.forEach(s => {
    s.issues.forEach(issue => {
        issue.variants.forEach(v => {
            issues.push({
                name: [s.series, issue.issue, formatRarity(v.rarity)].join(' '),
                publisher: s.publisher,
                issue: issue.issue,
                drop: issue.drop,
                variantName: v.name,
                totalIssued: v.totalIssued
            })
        })
    })
})

issues.sort((a, b) => a.drop - b.drop);

issues.forEach(i => {
    console.log(`"${i.name}", ${i.publisher}, ${i.drop}, "${i.variantName}", ${i.totalIssued}`)
})
