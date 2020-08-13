<template>
  <div class="flex flex-col h-screen">
    <div class="mb-16 sm:mb-18 lg:mb-24"><SiteNav /></div>
    <router-view class="flex-grow" />
    <SiteFooter />
  </div>
</template>

<script>
import SiteNav from '@/components/SiteNav.vue';
import SiteFooter from '@/components/SiteFooter.vue';

export default {
  name: 'DefaultLayout',
  components: { SiteNav, SiteFooter },
};
</script>
