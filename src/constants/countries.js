/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const countriesJson = require('./country-codes_json.json');

const removeDiacritics = (text) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const toSlug = (name) => {
  if (!name) { return ''; }
  return removeDiacritics(name)
    .replace(/(\.|\(|\)|-|&)+/, '')
    .replace(/\W+/g, ' ')
    .split(/ /)
    .map((w) => w.toLowerCase())
    .join('_');
};

const countryNameOverrides = {
  BA: 'Bosnia and Herzegovina',
  CD: 'Democratic Republic of the Congo',
  CG: 'Congo',
  CZ: 'Czech Republic',
  UK: 'United Kingdom',
  US: 'United States of America',
};

const countrySearchAliases = {
  AE: 'UAE',
};

const countries = countriesJson.map((c) => {
  const code = c['ISO3166-1-Alpha-2'];
  const name = countryNameOverrides[code] || c['CLDR display name'];
  const searchAlias = countrySearchAliases[code] || '';
  const searchKey = [
    name,
    searchAlias,
    c['ISO3166-1-Alpha-3'],
    c['CLDR display name'],
    c['UNTERM English Formal'],
  ].join(',');

  return {
    id: c['ISO3166-1-numeric'],
    code,
    name,
    alpha3: c['ISO3166-1-Alpha-3'],
    slug: toSlug(c['CLDR display name']),
    searchKey: removeDiacritics(searchKey),
  };
}).filter(({ name }) => !!name);

module.exports = {
  countries,
  removeDiacritics,
};
