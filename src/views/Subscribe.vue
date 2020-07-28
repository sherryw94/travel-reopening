<template>
  <div class="main-container">
    <div class="main-container__inner">
      <div class="flex flex-col items-center sm:flex-row sm:items-start">
        <div class="mb-12 sm:mb-0 sm:mr-1">
          <SubscriptionForm/>
        </div>
        <img class="h-auto w-8/12 md:w-6/12" src="@/assets/images/undraw-traveling.svg">
      </div>
    </div>
  </div>
</template>

<script>
import SubscriptionForm from '@/components/SubscriptionForm.vue';

export default {
  name: 'Subscribe',
  components: { SubscriptionForm },
  mounted() { this.$nextTick(() => document.dispatchEvent(new Event('render-completed'))); },
};
</script>
