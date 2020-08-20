<template>
  <div id="app" class="font-body text-gray-800">
    <component :is="layout" />
  </div>
</template>

<script>
import DefaultLayout from '@/views/layouts/DefaultLayout.vue';
import OembedLayout from '@/views/layouts/OembedLayout.vue';

export default {
  name: 'App',
  metaInfo: {
    title: 'The Ultimate Guide to COVID-19 Travel Restrictions',
    meta: [
      { charset: 'utf-8' },
      { vmid: 'description', name: 'description', content: 'A free and open-source project by TourHero. Find the latest information for travel restrictions around the world during this COVID-19 pandemic. Travel safe!' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:image', content: `https://www.tourhero.com${process.env.BASE_URL}img/travel-reopening-cover.jpg` },
      { name: 'og:image', content: `https://www.tourhero.com${process.env.BASE_URL}img/travel-reopening-cover.jpg` },
    ],
  },
  components: { DefaultLayout, OembedLayout },
  computed: {
    layout() {
      if (this.$route.name === 'OembedMap' || this.$route.name === 'CountryOembedMap') {
        return OembedLayout;
      }
      return DefaultLayout;
    },
  },
};
</script>
