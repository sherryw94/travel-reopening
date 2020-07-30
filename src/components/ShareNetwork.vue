<template>
  <div class="flex items-start">
    <ShareNetwork
      v-for="network in networks"
      :network="network.network"
      :key="network.network"
      :url='`https://tourhe.ro/covid-travel-${network.slug}`'
      title="The Ultimate Guide to COVID-19 Travel Restrictions"
      description="A free and open-source project by TourHero.
        Find the latest information for travel restrictions around
        the world during this COVID-19 pandemic."
      quote="Check this free guide for the latest travel restrictions around the world."
      hashtags="tourherotravel"
      twitterUser="tourherotravel"
    >
      <div class="pr-5 sm:pr-0 sm:pl-5 text-xl lg:text-2xl cursor-pointer">
        <font-awesome-icon :icon="['fab', network.icon]" />
      </div>
    </ShareNetwork>
  </div>
</template>
<script>
export default {
  data() {
    return {
      networks: [
        { network: 'facebook', slug: 'fb', icon: 'facebook-f' },
        { network: 'twitter', slug: 'tw', icon: 'twitter' },
        { network: 'linkedin', slug: 'wa', icon: 'linkedin-in' },
        { network: 'telegram', slug: 'tl', icon: 'telegram-plane' },
        { network: 'whatsapp', slug: 'li', icon: 'whatsapp' },
      ],
    };
  },
};
</script>
