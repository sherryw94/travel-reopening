<template>
  <div class="panel">
    <div class="panel__inner">
      <h3>Travel Ideas</h3>
      <div v-if="travelIdeasList.length"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div v-for="(media, index) in travelIdeasList" :key="index" class="bg-gray-100 rounded-md">
          <a :href="media.href" class="block no-underline" target="_blank">
            <img :alt="media.alt" :src="media.src"
              class="h-40 w-full rounded-md rounded-b-none object-cover" />
            <h4 class="mb-0 py-4 px-4 text-gray-800">{{media.title}}</h4>
          </a>
        </div>
      </div>
      <p v-else>
        If you have any travel articles about {{country.name}}
        that you'd like to share with us, <a :href="emailTo">let us know</a>
        for a chance to be featured here.
      </p>
    </div>
  </div>
</template>

<script>
import { findTravelIdeasForCountry } from '@/constants/travel';

export default {
  name: 'CountryTravelIdeas',
  computed: {
    emailTo() {
      const subject = encodeURI(`Travel Ideas for ${this.country.name}`);
      return `mailto:travel-map@tourhero.com?subject=${subject}`;
    },
    travelIdeasList() {
      return findTravelIdeasForCountry(this.country.code).map(
        ({
          alt, href, src, title,
        }) => ({
          alt,
          href,
          src: `${process.env.BASE_URL}img/travel_ideas/${src}`,
          title,
        }),
      );
    },
  },
  props: {
    country: Object,
  },
};
</script>
