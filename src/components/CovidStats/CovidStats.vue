<template>
  <div>
    <h3>COVID-19 Statistics</h3>
    <CovidStatsFigure class="mb-4" :covidData="covidData.newCases">
      Daily new confirmed cases
    </CovidStatsFigure>
    <CovidStatsFigure class="mb-4" :covidData="covidData.totalCases">
      Total confirmed cases
    </CovidStatsFigure>
    <CovidStatsFigure class="mb-6" :covidData="covidData.totalDeaths">
      Total deaths
    </CovidStatsFigure>
  </div>
</template>

<script>
import CovidStatsFigure from './CovidStatsFigure.vue';

export default {
  name: 'CovidStats',
  components: {
    CovidStatsFigure,
  },
  props: {
    country: Object,
    covidData: Object,
  },
};
</script>
