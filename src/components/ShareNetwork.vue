<template>
  <div class="flex items-start">
    <ShareNetwork
      v-for="network in networks"
      :network="network.network"
      :key="network.network"
      url="https://www.tourhero.com/en/ultimate-guide-covid19-travel-restrictions-reopening/"
      title="The Ultimate Guide to COVID-19 Travel Restrictions"
      description="A free and open-source project by TourHero.
        Find the latest information for travel restrictions around
        the world during this COVID-19 pandemic.
        Travel safe!"
      quote="Get the latest travel reopening information"
      hashtags="tourherotravel"
      twitterUser="tourherotravel"
    >
      <img :src="require(`@/assets/images/social_${network.icon}.svg`)"
        class="h-6 w-6 mr-2 sm:mr-0 sm:ml-3 cursor-pointer" />
    </ShareNetwork>
  </div>
</template>
<script>
export default {
  data() {
    return {
      networks: [
        { network: 'facebook', icon: 'facebook' },
        { network: 'twitter', icon: 'twitter' },
        { network: 'linkedin', icon: 'linkedin' },
        { network: 'telegram', icon: 'telegram' },
        { network: 'whatsapp', icon: 'whatsapp' },
      ],
    };
  },
};
</script>
