/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable @typescript-eslint/camelcase */
// @ts-ignore

import TravelDefaults from '@/constants/travel.yaml';

export const Travel = TravelDefaults;

const { countries, checked_on } = Travel;

export const checkedOn = process.env.VUE_APP_LAST_UPDATED_ON || checked_on;

export const reopenings = Object.keys(countries)
  .reduce((acc: {date: string; content: string; country: string}[], country) => {
    const { reopening } = countries[country];
    if (reopening) {
      const convertedOpenings = Object.keys(reopening)
        .map((date) => ({ date, content: reopening[date], country }));
      return acc.concat(convertedOpenings);
    }
    return acc;
  }, [])
  .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));

export const futureReopenings = reopenings.filter(({ date }) => Date.parse(date) > Date.now());

export enum OpenStatus {
  Open = 'yes',
  Closed = 'no',
  Partial = 'partial',
}

export enum TravelDirection {
  Inbound = 'inbound',
  Outbound = 'outbound',
}

export function findSourcesForCountry(countryCode: string) {
  return Object.values(countries[countryCode]?.sources || {})
    .flat()
    .filter((i) => i);
}

export function findTravelIdeasForCountry(countryCode: string) {
  return Object.values(countries[countryCode]?.travel_ideas || []);
}


export function findCountryReopeningDate(countryCode: string) {
  const date = Object.keys(countries[countryCode]?.reopening || []);
  return (!date.length ? false : Date.parse(date[0]));
}
