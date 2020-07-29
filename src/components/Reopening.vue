<template>
  <ul>
    <li v-for="reopening in reopeningsList" :key="reopening.content">
      <span>{{toDate(reopening.date)}}:</span>
      <vue-markdown
        :source="'**' + reopening.name + ' Update** &ndash; ' + reopening.content"
        :anchorAttributes='anchorAttributes'></vue-markdown>
    </li>
  </ul>
</template>

<script>
import { futureReopenings } from '@/constants/travel';
import VueMarkdown from 'vue-markdown';
import { mapGetters } from 'vuex';
import moment from 'moment';

export default {
  name: 'Reopening',
  components: {
    'vue-markdown': VueMarkdown,
  },
  computed: {
    ...mapGetters(['getCountryByCode']),
    reopeningsList() {
      return futureReopenings.map((c) => {
        const countryHash = c;
        const country = this.getCountryByCode(countryHash.country);
        countryHash.name = country.name;
        return countryHash;
      });
    },
  },
  data() {
    return {
      anchorAttributes: { target: '_blank', rel: 'nofollow' },
    };
  },
  methods: {
    toDate(string) {
      return moment(string).format('MMMM D, YYYY');
    },
  },
};
</script>
