<template>
  <table>
    <tr v-for="(reopening, index) in reopeningsList" :key="index">
      <td class="p-2 whitespace-no-wrap"><CountryFlag :countryCode="reopening.code" /></td>
      <td class="p-2 whitespace-no-wrap">{{toDate(reopening.date)}}</td>
      <td class="p-2 whitespace-no-wrap">
        <router-link class="no-underline" :to="{name: 'Country',
          params: {country: reopening.slug}}">{{reopening.name}}
        </router-link>
      </td>
    </tr>
  </table>
</template>

<script>
import CountryFlag from '@/components/CountryFlag.vue';
import { futureReopenings } from '@/constants/travel';
import { mapGetters } from 'vuex';
import moment from 'moment';

export default {
  name: 'Reopening',
  components: { CountryFlag },
  computed: {
    ...mapGetters(['getCountryByCode']),

    reopeningsList() {
      return futureReopenings.map((c) => {
        const country = this.getCountryByCode(c.country);
        return {
          date: c.date,
          code: country.code,
          name: country.name,
          slug: country.slug,
        };
      });
    },
  },
  methods: {
    toDate(string) {
      return moment(string).format('MMMM D, YYYY');
    },
  },
};
</script>
