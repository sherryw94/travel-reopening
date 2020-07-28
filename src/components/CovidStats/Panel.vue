<template>
  <div class="panel">
    <div class="panel__inner">
      <div class="md:flex">
        <div class="md:order-1">
          <TravelState :country="country" />
        </div>
        <div class="md:order-0 w-full md:w-1/2 mt-8 md:mt-0 md:mr-8">
          <CovidStats :country="country" :covidData="covidData" />
        </div>
      </div>
      <p class="text-xs">
        <sup>*</sup>
        Statistics are published by
        <a href="https://www.ecdc.europa.eu/en/covid-19-pandemic" target="_blank">
          European Centre for Disease Prevention and Control
        </a>&nbsp;<CovidStatsDate :country="country" :covidData="covidData.newCases" /></p>
    </div>
  </div>
</template>

<script>
/* eslint-disable @typescript-eslint/camelcase */

import { csv, timeParse } from 'd3';
import TravelState from '@/components/TravelState.vue';
import CovidStats from './CovidStats.vue';
import CovidStatsDate from './CovidStatsDate.vue';

export default {
  components: {
    CovidStats,
    CovidStatsDate,
    TravelState,
  },
  data() {
    return {
      covidData: {
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
          this.covidData = r.reduce((acc, {
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
