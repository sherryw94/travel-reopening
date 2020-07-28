<template>
  <div class="panel">
    <div class="panel__inner">
      <div class="md:flex">
        <div class="md:order-1">
          <TravelState :country="country" />
        </div>
        <div class="md:order-0 w-full md:w-1/2 mt-8 md:mt-0 md:mr-8">
          <CovidStats :country="country" />
        </div>
      </div>
      <p class="text-xs"><sup>*</sup>Statistics are published by <a href="https://www.ecdc.europa.eu/en/covid-19-pandemic" target="_blank">European Centre for Disease Prevention and Control</a>&nbsp;<CovidStatsDate :country="country" /></p>
    </div>
  </div>

</template>

<script>
import TravelState from '@/components/TravelState.vue';
import CovidStats from './CovidStats.vue';
import CovidStatsDate from './CovidStatsDate.vue';

export default {
  components: {
    CovidStats,
    CovidStatsDate,
    TravelState,
  },
  name: 'CovidStatsPanel',
  props: {
    country: {
      type: Object,
      required: true,
    },
  },
};

</script>
