<template>
  <div class="inline">{{latestUpdate}}</div>
</template>

<script>
/* eslint-disable @typescript-eslint/camelcase */
import { csv, timeParse } from 'd3';
import moment from 'moment';

export default {
  name: 'CovidStatsDate',
  data() {
    return {
      countryDataDates: {},
    };
  },
  props: {
    country: Object,
  },
  computed: {
    latestUpdate() {
      if (Object.keys(this.countryDataDates).length === 0) {
        return '';
      }
      const { dates } = this.countryDataDates[this.country.alpha3];
      const sortedDates = dates.sort((a, b) => b - a);
      return `as of ${moment(sortedDates[0]).format('MMMM D, YYYY')}`;
    },
  },
  created() {
    csv('data/covid/covid-data.csv').then((r) => {
      this.countryDataDates = r.reduce((acc, { iso_code, date }) => {
        if (!acc[iso_code]) {
          acc[iso_code] = {
            dates: [],
          };
        }
        const parsedDate = timeParse('%Y-%m-%d')(date);
        acc[iso_code].dates.push(parsedDate);
        return acc;
      }, {});
    });
  },
};
</script>
