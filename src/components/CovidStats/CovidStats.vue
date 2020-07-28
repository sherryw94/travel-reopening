<template>
  <div>
    <h3>COVID-19 Statistics</h3>
    <CovidStatsFigure class="mb-4"
    :data="countryData.newCases">Daily new confirmed cases</CovidStatsFigure>
    <CovidStatsFigure class="mb-4"
    :data="countryData.totalCases">Total confirmed cases</CovidStatsFigure>
    <CovidStatsFigure class="mb-6"
    :data="countryData.totalDeaths">Total deaths</CovidStatsFigure>
  </div>
</template>

<script>
/* eslint-disable @typescript-eslint/camelcase */
import { csv, timeParse } from 'd3';
import CovidStatsFigure from './CovidStatsFigure.vue';

export default {
  name: 'CovidStats',
  components: {
    CovidStatsFigure,
  },
  data() {
    return {
      countriesData: [],
    };
  },
  props: {
    country: Object,
  },
  computed: {
    countryData() { return this.countriesData[this.country.alpha3] || []; },
  },
  created() {
    csv('data/covid/covid-data.csv').then((r) => {
      this.countriesData = r.reduce((acc, {
        iso_code, date, total_cases, total_deaths, new_cases,
      }) => {
        if (!acc[iso_code]) {
          acc[iso_code] = {
            totalCases: [],
            newCases: [],
            totalDeaths: [],
          };
        }
        const parsedDate = timeParse('%Y-%m-%d')(date);
        acc[iso_code].totalCases.push({ date: parsedDate, value: +total_cases });
        acc[iso_code].newCases.push({ date: parsedDate, value: +new_cases });
        acc[iso_code].totalDeaths.push({ date: parsedDate, value: +total_deaths });
        return acc;
      }, {});
    });
  },
};
</script>
