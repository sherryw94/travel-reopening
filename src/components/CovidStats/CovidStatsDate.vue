<template>
  <div class="inline">
    <span v-if="lastUpdatedOn">
      as of {{lastUpdatedOn}}
    </span>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'CovidStatsDate',
  props: {
    covidData: Array,
  },
  computed: {
    lastUpdatedOn() {
      if (!this.covidData.length) { return false; }
      const maxDate = this.covidData.reduce((a, b) => (a.date > b.date ? a.date : b.date));
      return moment(maxDate).format('MMMM D, YYYY');
    },
  },
};
</script>
