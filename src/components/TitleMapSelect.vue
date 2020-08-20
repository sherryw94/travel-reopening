<template>
  <div>
    <div class="main-container">
      <div class="main-container__inner">
        <div class="mb-4 sm:mb-6 lg:mb-8">
          <h1>The Ultimate Guide to COVID-19 Travel Restrictions</h1>
          <div class="flex flex-col sm:justify-between sm:flex-row mb-2 sm:mb-4">
            <div class="flex items-center sm:relative sm:order-last mt-1 mb-2 sm:my-0">
              <div class="inline-flex sm:flex">
                <ShareNetwork />
                <a
                  @click="show = !show"
                  v-clipboard:copy="copyIframe()"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"
                  class="pr-3 sm:pr-0 sm:pl-5 text-xl lg:text-2xl cursor-pointer">
                  <font-awesome-icon :icon="['fa', 'code']" />
                </a>
              </div>
              <transition
                enter-class="opacity-0"
                enter-active-class="transition-opacity duration-1000"
                leave-active-class="transition-opacity duration-1000 opacity-0">
                <div v-show="show" @click="show = !show" class="inline-flex sm:absolute sm:right-0
                  sm:-mt-16">
                  <span :class="badgeColor" class="badge badge--xs">{{copyMessage}}</span>
                </div>
              </transition>
            </div>
            <p class="w-full md:w-9/12 sm:order-first">
              A free and open-source project by
              <a class="inline-flex no-underline" href="https://www.tourhero.com/" target="_blank">TourHero</a>.
              <span class="inline-block mb-3 sm:mb-0">Made with
                <svg class="inline h-6 w-6 text-secondary fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M33.78 18C22.142 18 15 28.178 15 36.526 15 54.578 35.517 71.333 50 82c14.483-10.667 35-27.422 35-45.474C85 28.178 77.858 18 66.22 18c-6.5 0-12.053 5.182-16.22 10.105C45.833 23.182 40.28 18 33.78 18z"/></svg>
                by travelers for travelers.
              </span>
            </p>
          </div>
          <p class="w-full md:w-9/12">
            <span class="font-semibold">How it works:</span>
            Select the country you want to visit and view the travel restrictions.
            Or, switch to the country you’re traveling from to see which countries
            you’re allowed to enter.
            Travel safe!
          </p>
        </div>
        <div class="flex flex-col sm:flex-row mb-4 sm:mb-6 lg:mb-8">
          <div class="mr-0 sm:mr-2">
            <TravelDirectionToggle/>
          </div>
          <CountrySelect class="w-full md:max-w-md mt-4 sm:mt-0"/>
        </div>
      </div>
    </div>
    <div class="bg-warm-gray-50 py-1 mb-4 sm:mb-6 lg:mb-8">
      <div class="main-container">
        <div class="main-container__inner" id="map-vis">
          <WorldMap/>
          <div class="mt-8 md:-mt-24 md:pl-6">
            <Legend/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CountrySelect from '@/components/CountrySelect.vue';
import ShareNetwork from '@/components/ShareNetwork.vue';
import TravelDirectionToggle from '@/components/TravelDirectionToggle.vue';
import Legend from '@/components/Map/Legend.vue';
import WorldMap from '@/components/Map/WorldMap.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'TitleMapSelect',
  components: {
    CountrySelect,
    ShareNetwork,
    TravelDirectionToggle,
    Legend,
    WorldMap,
  },
  data() {
    return {
      country: null,
      show: false,
      copySuccess: null,
    };
  },
  computed: {
    ...mapGetters(['getCountryBySlug']),
    badgeColor() {
      if (this.copySuccess) {
        return 'badge--yes';
      }
      return 'badge--no';
    },
    copyMessage() {
      if (this.copySuccess) {
        return 'Copied embed code!';
      }
      return 'Copy failed';
    },
  },
  methods: {
    copyIframe() {
      const iframeUri = this.$router.resolve({ name: this.country ? 'CountryOembedMap' : 'OembedMap' }).href;
      return `<iframe src="https://www.tourhero.com${process.env.BASE_URL}${iframeUri.replace('/', '')}"></iframe>`;
    },
    onCopy() {
      this.copySuccess = true;
    },
    onError() {
      this.copySuccess = false;
    },
  },
  created() {
    if (!this.$route.params.country) { return; }
    this.country = this.getCountryBySlug(this.$route.params.country);
  },
};
</script>
