<template>
  <span :class="countryFlag"></span>
</template>

<script>
export default {
  name: 'CountryFlag',
  computed: {
    countryFlag() {
      return `flag-icon flag-icon-${this.countryCode.toLowerCase()} shadow`;
    },
  },
  props: {
    countryCode: String,
  },
};
</script>
