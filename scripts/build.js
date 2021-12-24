const fs = require("fs");
const path = require("path");

function buildPrices() {
  const dataDir = path.join("./data");
  const fileList = fs.readdirSync(dataDir);
  const mostRecentFileName = fileList.sort().pop();
  const rawdata = fs.readFileSync(path.join(dataDir, mostRecentFileName));
  return JSON.parse(rawdata);
}

function readOverrides() {
  const setsFileName = "./overrides.json";
  const setsRawdata = fs.readFileSync(setsFileName);
  return JSON.parse(setsRawdata);
}

function buildCatalog() {
  const prices = buildPrices();
  const catalog = {};

  prices.forEach(item => {
    catalog[item.slug] = {
      brand: item.brand.name,
      name: item.name,
      rarity: item.rarity,
      totalIssued: item.totalIssued,
      floorPrice: item.metrics.lowestPrice,
    };
  });

  return catalog;
}

function buildSets() {
  const catalog = buildCatalog();
  const setsFileName = "./sets.json";
  const setsRawdata = fs.readFileSync(setsFileName);
  const sets = JSON.parse(setsRawdata);

  const overrides = readOverrides();

  sets.forEach(set => {
    // replace slugs with collectibles
    set.slugs.forEach(slug => {
      if (!set.collectibles) {
        set.collectibles = [];
      }
      set.collectibles.push(catalog[slug]);
    });
    delete set.slugs;

    // Apply Overrides
    // set.collectibles.forEach(c => {
    //   const found = overrides.find(el => el.name === c.name)
    //   if (found) { c.floorPrice = found.price}
    // })

    // calcuate total floor price of collectibles
    if (set.collectibles) {
      set.total = set.collectibles.reduce(
        (prev, current) => prev + current.floorPrice,
        0
      );
      set.marketCap = set.collectibles.reduce(
        (prev, current) => prev + current.floorPrice * current.totalIssued,
        0
      );
    } else {
      set.total = 0;
      set.marketCap = 0;
    }

    console.log(set.name, "total: ", set.total, "marketcap: ", set.marketCap);
  });

  return sets;
}

// main
const sets = buildSets();

const buildDir = "./build";
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir);
}

fs.writeFileSync(
  path.resolve(buildDir, "./current.json"),
  JSON.stringify(sets, null, 2)
);

//comics
fs.copyFileSync('comics.json', path.resolve(buildDir, "comics.json"));
fs.copyFileSync('comics.v2.json', path.resolve(buildDir, "comics.v2.json"));
