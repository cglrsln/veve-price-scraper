const fs = require('fs');
const path = require('path');

function buildPrices() {
  const dataDir = path.join(__dirname, '/data')
  const fileList = fs.readdirSync(dataDir)
  const mostRecentFileName = fileList.sort().pop()
  const rawdata = fs.readFileSync(path.join(dataDir, mostRecentFileName));
  return JSON.parse(rawdata)
}

function buildCatalog() {
  const prices = buildPrices()
  const catalog = {}

  prices.forEach((item) => {
    catalog[item.slug] = {
      brand: item.brand.name,
      name: item.name,
      rarity: item.rarity,
      totalIssued: item.totalIssued,
      floorPrice: item.metrics.lowestPrice
    }
  })

  return catalog
}

function buildSets() {
  const catalog = buildCatalog()
  const setsFileName = './sets.json'
  const setsRawdata = fs.readFileSync(setsFileName);
  const sets = JSON.parse(setsRawdata);

  sets.forEach(set => {
    // replace slugs with collectibles
    set.slugs.forEach(slug => {
      if (!set.collectibles) { set.collectibles = [] }
      set.collectibles.push(catalog[slug])
    })
    delete set.slugs

    // calcuate total floor price of collectibles
    console.log(set.name)
    if (set.collectibles) {
      set.total = set.collectibles.reduce((prev, current) => prev + current.floorPrice, 0)
    } else {
      set.total = 0
    }
  })

  return sets
}

// main
const sets = buildSets()

const buildDir = 'build'
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir)
}

fs.writeFileSync(path.resolve(buildDir, './current.json'), JSON.stringify(sets, null, 2));