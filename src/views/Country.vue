<template>
  <div>
    <TitleMapSelect/>
    <div class="main-container">
      <div class="main-container__inner" v-schema:scope="{ type: 'Article' }">
        <h2 class="country-header px-4" v-schema="{ prop: 'headline' }">{{title}}</h2>
        <span v-schema="{ prop: 'author', content: 'TourHero' }" />
        <span v-schema="{ prop: 'publisher', content: 'TourHero' }" />
        <span v-schema="{ prop: 'image', content: articleImage }" />
        <div class="px-4 py-5 mb-4 bg-gray-100 rounded-md">
          <p v-if="checkedOn" class="font-semibold text-sm">
            <span v-schema="{ prop: 'datePublished', content: '2020-05-01' }" />
              Last checked on
            <span v-schema="{ prop: 'dateModified', content: checkedOniso8601 }">
              {{checkedOn}}
            </span>
          </p>
          <p class="inline-flex mr-1 mb-0 font-semibold text-sm">
            Want the latest travel updates in your inbox?
          </p>
          <router-link :to="{name: 'Subscribe'}" class="inline-flex font-semibold text-sm"
            id="country-subscribe">Subscribe here →
          </router-link>
        </div>
        <Panel><CovidStatsPanel :country="country" /></Panel>
        <div v-if='domesticContent || internationalContent || visaQuarantineContent'
          v-schema="{ prop: 'articleBody' }">
          <Panel title="International Travel"
            v-schema="{ prop: 'articleSection' }">
            <CountryBody :content="internationalContent" />
          </Panel>
          <Panel title="Visa &amp; Quarantine Measures"
            v-schema="{ prop: 'articleSection' }">
            <CountryBody :content="visaQuarantineContent" />
          </Panel>
          <Panel title="Domestic Travel"
            v-schema="{ prop: 'articleSection' }">
            <CountryBody :content="domesticContent" />
          </Panel>
        </div>
        <Panel title="Travel Ideas">
          <CountryTravelIdeas :country="country" />
        </Panel>
        <Panel>
          <p>
            Help us improve this data by dropping us <a :href="emailTo">an email</a>.
            Thank you very much for your help!
          </p>
        </Panel>
        <Panel title="Sources"><CountrySources :countryCode="country.code" /></Panel>
        <Panel title="About Our Data"><Disclaimer /></Panel>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable @typescript-eslint/camelcase */

import axios from 'axios';
import moment from 'moment';
import CountryBody from '@/components/CountryBody.vue';
import CountrySources from '@/components/CountrySources.vue';
import CountryTravelIdeas from '@/components/CountryTravelIdeas.vue';
import CovidStatsPanel from '@/components/CovidStats/Panel.vue';
import Disclaimer from '@/components/Disclaimer.vue';
import Panel from '@/components/Panel.vue';
import TitleMapSelect from '@/components/TitleMapSelect.vue';
import { checkedOn } from '@/constants/travel';
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'Country',
  components: {
    CountryBody,
    CountrySources,
    CountryTravelIdeas,
    CovidStatsPanel,
    Disclaimer,
    Panel,
    TitleMapSelect,
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
      return moment(checkedOn).format('MMMM D, YYYY');
    },
    checkedOniso8601() {
      return moment(checkedOn).toISOString();
    },
    articleImage() {
      return `https://www.tourhero.com${process.env.BASE_URL}img/travel-reopening-cover.jpg`;
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
        axios(`${this.baseUrl}data/written/${this.country.code}_domestic.md`),
        axios(`${this.baseUrl}data/written/${this.country.code}_international.md`),
        axios(`${this.baseUrl}data/written/${this.country.code}_visa_quarantine.md`),
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
