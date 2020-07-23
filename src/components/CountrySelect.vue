<template>
  <multiselect
    id="country-select"
    label="name"
    open-direction="below"
    :multiple="false"
    :internal-search="false"
    :hideSelected="true"
    :options="filteredOptions"
    :placeholder="placeholder"
    :selectLabel="selectLabel"
    :value="country"
    @search-change="searchChange"
    @input="updateCountryAction">
    <template v-slot:noResult>No country found. Check the spelling and try again.</template>
  </multiselect>
</template>

<script>
import Multiselect from 'vue-multiselect';
import { removeDiacritics } from '@/constants/countries';
import { TravelDirection } from '@/constants/travel';
import { mapGetters, mapState, mapActions } from 'vuex';

export default {
  name: 'CountrySelect',
  components: { Multiselect },
  data() {
    return {
      filteredOptions: [],
    };
  },
  watch: {
    country(val) {
      if (!val) {
        this.$router.push({ name: 'Home' });
        return;
      }
      const country = this.getCountryByCode(val.code);
      if (this.$route.params.country === country.slug) return;
      this.$gtm.trackEvent({
        action: 'select',
        category: 'dropdown_country',
        event: 'event_dropdown_country',
        label: country.name,
      });
      this.$router.push({ name: 'Country', params: { country: country.slug } });
    },
  },
  computed: mapState({
    ...mapGetters(['getCountryByCode']),
    ...mapState(['country', 'countryOptions', 'travelContext']),
    placeholder() {
      return this.travelContext === TravelDirection.Inbound
        ? 'Where are you traveling to?'
        : 'Where are you traveling from?';
    },
    selectLabel() {
      return 'ontouchstart' in document
        ? ''
        : 'Press enter to select';
    },
  }),
  created() { this.filteredOptions = this.countryOptions; },
  methods: {
    ...mapActions(['updateCountryAction']),
    searchChange(search) {
      this.filteredOptions = search
        ? this.countryOptions.filter((option) => {
          const regExp = new RegExp(removeDiacritics(search), 'gi');
          return regExp.test(option.searchKey);
        })
        : this.countryOptions;
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
.multiselect__tags {
  @apply pl-3 border rounded-md;
}

.multiselect__placeholder,
.multiselect__input {
  @apply pl-0 text-base leading-none;
}

.multiselect__single {
  @apply pl-0;
}

.multiselect__option--highlight,
.multiselect__option--highlight:after {
  @apply bg-primary;
}

.multiselect__option--selected.multiselect__option--highlight,
.multiselect__option--selected.multiselect__option--highlight:after {
  @apply bg-secondary;
}
</style>
