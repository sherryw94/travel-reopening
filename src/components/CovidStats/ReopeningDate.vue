<template>
  <div v-if="reopeningDate">
    <h3>{{country.name}} Border Reopening</h3>
    <div class="inline-grid grid-cols-legend row-gap-2 col-gap-4 items-baseline">
      <span>Forecasted</span>
      <span class="badge badge--yes">{{reopeningDate}}</span>
    </div>
  </div>
</template>

<script>
import { findCountryReopeningDate } from '@/constants/travel';
import moment from 'moment';

export default {
  name: 'ReopeningDate',
  props: {
    country: Object,
  },
  computed: {
    reopeningDate() {
      const date = findCountryReopeningDate(this.country.code);
      if (!date) { return false; }
      return moment(date).format('MMMM D, YYYY');
    },
  },
};
</script>
