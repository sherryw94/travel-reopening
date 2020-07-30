<template>
  <table>
    <tr v-for="(reopening, index) in reopeningsList" :key="index">
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
import { futureReopenings } from '@/constants/travel';
import { mapGetters } from 'vuex';
import moment from 'moment';

export default {
  name: 'Reopening',
  computed: {
    ...mapGetters(['getCountryByCode']),

    reopeningsList() {
      return futureReopenings.map((c) => {
        const country = this.getCountryByCode(c.country);
        return {
          name: country.name,
          date: c.date,
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
