<template>
  <div class="flex items-start">
    <ShareNetwork
      v-for="network in networks"
      :network="network.network"
      :key="network.network"
      :url='`https://tourhe.ro/${network.network}-share`'
      title="The Ultimate Guide to COVID-19 Travel Restrictions"
      description="A free and open-source project by TourHero.
        Find the latest information for travel restrictions around
        the world during this COVID-19 pandemic."
      quote="Check this free guide for the latest travel restrictions around the world."
      hashtags="tourherotravel"
      twitterUser="tourherotravel"
    >
      <div class="pr-2 sm:pr-0 sm:pl-3 text-xl cursor-pointer">
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
        { network: 'facebook', icon: 'facebook-f' },
        { network: 'twitter', icon: 'twitter' },
        { network: 'linkedin', icon: 'linkedin-in' },
        { network: 'telegram', icon: 'telegram-plane' },
        { network: 'whatsapp', icon: 'whatsapp' },
      ],
    };
  },
};
</script>
