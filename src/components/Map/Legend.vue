<template>
  <div class="inline-flex md:flex-col flex-wrap">
    <TravelStateBadge travelState="selected"
      class="mr-1 md:mr-0 text-xs md:text-sm mb-1"/>
    <TravelStateBadge travelState="yes"
      class="mr-1 md:mr-0 text-xs md:text-sm mb-1"/>
    <TravelStateBadge travelState="partial"
      class="mr-1 text-xs md:mr-0 md:text-sm mb-1"/>
    <TravelStateBadge travelState="no"
      class="mr-1 md:mr-0 text-xs md:text-sm mb-1"/>
    <TravelStateBadge travelState="unknown"
      class="md:mb-0 mr-1 md:mr-0 text-xs md:text-sm mb-1"/>
  </div>
</template>

<script>
import TravelStateBadge from '@/components/TravelStateBadge.vue';

export default {
  name: 'Legend',
  components: { TravelStateBadge },
};
</script>
