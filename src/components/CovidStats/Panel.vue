<template>
  <div class="panel">
    <div class="panel__inner">
      <div class="md:flex">
        <div class="md:order-1">
          <TravelState :country="country" />
        </div>
        <div class="md:order-0 w-full md:w-1/2 mt-8 md:mt-0 md:mr-8">
          <h3>COVID-19 Statistics</h3>
          <Graph class="mb-4" :stats="stats.newCases">Daily new confirmed cases</Graph>
          <Graph class="mb-4" :stats="stats.totalCases">Total confirmed cases</Graph>
          <Graph class="mb-6" :stats="stats.totalDeaths">Total deaths</Graph>
        </div>
      </div>
      <p class="text-xs">
        <sup>*</sup>
        Statistics are published by
        <a href="https://www.ecdc.europa.eu/en/covid-19-pandemic" target="_blank">
          European Centre for Disease Prevention and Control
        </a><LastUpdatedOn :stats="stats.newCases" /></p>
    </div>
  </div>
</template>

<script>
/* eslint-disable @typescript-eslint/camelcase */

import { csv, timeParse } from 'd3';
import TravelState from '@/components/TravelState.vue';
import LastUpdatedOn from './LastUpdatedOn.vue';
import Graph from './Graph.vue';

export default {
  components: {
    LastUpdatedOn,
    Graph,
    TravelState,
  },
  data() {
    return {
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
      csv(`data/covid/covid_${this.country.alpha3}.csv`)
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
