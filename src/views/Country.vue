<template>
  <div>
    <TitleMapSelect/>
    <div class="main-container">
      <div class="main-container__inner">
        <h2 class="country-header px-4">{{title}}</h2>
        <div class="px-4 py-5 mb-4 bg-gray-100 rounded-md">
          <p v-if='checkedOn' class="font-semibold text-sm">
            Last checked on {{checkedOn}}
          </p>
          <p class="inline-flex mr-1 mb-0 font-semibold text-sm">
            Want the latest travel updates in your inbox?
          </p>
          <router-link :to="{name: 'Subscribe'}" class="inline-flex font-semibold text-sm"
            id="country-subscribe">
            Subscribe here →
          </router-link>
        </div>
        <div class="panel">
          <div class="panel__inner">
            <div class="md:flex">
              <div class="md:order-1">
                <TravelState :country="country" />
              </div>
              <div class="md:order-0 w-full md:w-1/2 mt-6 md:mt-0 md:mr-4">
                <CovidStats :country="country" />
              </div>
            </div>
          </div>
        </div>
        <div v-if='domesticContent || internationalContent || visaQuarantineContent'>
          <CountryBody :content="internationalContent">
            <h3>International Travel</h3>
          </CountryBody>
          <CountryBody :content="visaQuarantineContent">
            <h3>Visa &amp; Quarantine Measures</h3>
          </CountryBody>
          <CountryBody :content="domesticContent">
            <h3>Domestic Travel</h3>
          </CountryBody>
        </div>
        <CountryTravelIdeas :country="country" />
        <div class="panel">
          <div class="panel__inner">
            <p class="mb-0">
              Help us improve this data by dropping us
              <a :href="emailTo">an email</a>.
              Thank you very much for your help!
            </p>
          </div>
        </div>
        <CountrySources :countryCode="country.code" />
        <Disclaimer />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import CountryBody from '@/components/CountryBody.vue';
import CountrySources from '@/components/CountrySources.vue';
import CountryTravelIdeas from '@/components/CountryTravelIdeas.vue';
import CovidStats from '@/components/CovidStats.vue';
import Disclaimer from '@/components/Disclaimer.vue';
import TitleMapSelect from '@/components/TitleMapSelect.vue';
import TravelState from '@/components/TravelState.vue';
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'Country',
  components: {
    CountryBody,
    CountrySources,
    CountryTravelIdeas,
    CovidStats,
    Disclaimer,
    TitleMapSelect,
    TravelState,
  },
  data() {
    return {
      domesticContent: null,
      internationalContent: null,
      visaQuarantineContent: null,
      baseUrl: process.env.BASE_URL,
    };
  },
  computed: {
    ...mapState(['country']),
    ...mapGetters(['getCountryBySlug', 'getCountryGlobalState']),
    title() { return `${this.country.name} COVID-19 Travel Update`; },
    checkedOn() {
      return moment().format('MMMM D, YYYY');
    },
    emailTo() {
      const subject = encodeURI(`Travel Map Update for ${this.country.name}`);
      return `mailto:travel-map@tourhero.com?subject=${subject}`;
    },
  },
  methods: {
    ...mapActions(['updateCountryAction']),
    fetchData() {
      this.domesticContent = null;
      this.internationalContent = null;
      this.visaQuarantineContent = null;

      const country = this.getCountryBySlug(this.$route.params.country);
      if (!country) { this.$router.push({ name: 'NotFound' }); return; }
      this.updateCountryAction(country);

      const promises = [
        axios(`${this.baseUrl}data/${this.country.code}_domestic.md`),
        axios(`${this.baseUrl}data/${this.country.code}_international.md`),
        axios(`${this.baseUrl}data/${this.country.code}_visa_quarantine.md`),
      ];

      Promise.allSettled(promises).then(axios.spread((...r) => {
        if (r[0].status === 'fulfilled') { this.domesticContent = r[0].value.data; }
        if (r[1].status === 'fulfilled') { this.internationalContent = r[1].value.data; }
        if (r[2].status === 'fulfilled') { this.visaQuarantineContent = r[2].value.data; }
        this.$nextTick(() => document.dispatchEvent(new Event('render-completed')));
      }));
    },
  },
  metaInfo() {
    return {
      title: this.title,
      meta: [{
        name: 'description',
        content: `Find the latest updates on travel restrictions and reopening timelines for ${this.country.name}.`,
      }],
    };
  },
  watch: {
    '$route.path': 'fetchData',
  },
  created() {
    this.fetchData();
  },
  beforeRouteLeave(to, from, next) {
    this.updateCountryAction(null);
    next();
  },
};
</script>
