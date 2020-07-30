<template>
  <span :class="badgeColor">{{badgeLabel}}</span>
</template>

<script>
import { OpenStatus } from '@/constants/travel';

export default {
  name: 'TravelStateBadge',
  computed: {
    badgeColor() {
      if (this.travelState) {
        return `badge badge--${this.travelState}`;
      }
      return 'badge badge--unknown';
    },
    badgeLabel() {
      switch (this.travelState) {
        case 'selected': return 'Selected';
        case OpenStatus.Open: return 'Allowed';
        case OpenStatus.Closed: return 'Restricted';
        case OpenStatus.Partial: return 'Partially allowed';
        default: return 'Unknown';
      }
    },
  },
  props: {
    travelState: String,
  },
};
</script>
