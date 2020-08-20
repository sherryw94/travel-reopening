<template>
  <div>
    <div class="md:flex">
      <div class="md:order-1" id="travel-status">
        <div class="flex flex-col">
          <TravelState :country="country" />
          <ReopeningDate :country="country" class="mt-8" />
        </div>
      </div>
      <div class="md:order-0 w-full md:w-1/2 mt-8 md:mt-0 md:mr-8" id="covid-stats">
        <h3>COVID-19 Statistics</h3>
        <Graph class="mb-4" :stats="stats.newCases">Daily new confirmed cases</Graph>
        <Graph class="mb-4" :stats="stats.totalCases">Total confirmed cases</Graph>
        <Graph class="mb-6" :stats="stats.totalDeaths">Total deaths</Graph>
      </div>
    </div>
    <p class="text-xs">
      <sup>*</sup>Statistics are published by
      <a href="https://www.ecdc.europa.eu/en/covid-19-pandemic" target="_blank" rel="nofollow noopener">
        European Centre for Disease Prevention and Control
      </a><LastUpdatedOn :stats="stats.newCases" />
    </p>
  </div>
</template>

<script>
/* eslint-disable @typescript-eslint/camelcase */

import { csv, timeParse } from 'd3';
import TravelState from '@/components/TravelState.vue';
import Graph from './Graph.vue';
import LastUpdatedOn from './LastUpdatedOn.vue';
import ReopeningDate from './ReopeningDate.vue';

export default {
  components: {
    TravelState,
    Graph,
    LastUpdatedOn,
    ReopeningDate,
  },
  data() {
    return {
      baseUrl: process.env.BASE_URL,
      stats: {
        totalCases: [],
        newCases: [],
        totalDeaths: [],
      },
    };
  },
  name: 'CovidStatsPanel',
  props: {
    country: {
      type: Object,
      required: true,
    },
  },
  created() { this.getData(); },
  methods: {
    getData() {
      csv(`${this.baseUrl}data/covid/covid_${this.country.alpha3}.csv`)
        .then((r) => {
          this.stats = r.reduce((acc, {
            date, total_cases, total_deaths, new_cases,
          }) => {
            if (!date) { return acc; }
            const parsedDate = timeParse('%Y-%m-%d')(date);
            acc.totalCases.push({ date: parsedDate, value: +total_cases });
            acc.newCases.push({ date: parsedDate, value: +new_cases });
            acc.totalDeaths.push({ date: parsedDate, value: +total_deaths });
            return acc;
          }, {
            totalCases: [],
            newCases: [],
            totalDeaths: [],
          });
        });
    },
  },
  watch: {
    country() { this.getData(); },
  },
};

</script>
