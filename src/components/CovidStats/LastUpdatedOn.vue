<template>
  <div class="inline">
    <span v-if="date">
      as of {{date}}
    </span>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'LastUpdatedOn',
  props: {
    stats: Array,
  },
  computed: {
    date() {
      if (!this.stats.length) { return false; }
      const maxDate = this.stats.reduce((a, b) => (a.date > b.date ? a.date : b.date));
      return moment(maxDate).format('MMMM D, YYYY');
    },
  },
};
</script>
