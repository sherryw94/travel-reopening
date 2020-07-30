<template>
  <div class="inline-flex md:flex-col flex-wrap">
    <TravelStateBadge v-for="badge in badges" :key="badge" :travelState="badge"
      class="mr-1 md:mr-0 text-xs md:text-sm mb-1" />
  </div>
</template>

<script>
import TravelStateBadge from '@/components/TravelStateBadge.vue';
import { OpenStatus } from '@/constants/travel';

export default {
  name: 'Legend',
  components: { TravelStateBadge },
  data() {
    return {
      badges: [
        'selected',
        OpenStatus.Open,
        OpenStatus.Partial,
        OpenStatus.Closed,
        'unknown',
      ],
    };
  },
};
</script>
