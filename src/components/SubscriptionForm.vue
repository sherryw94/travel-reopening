<template>
  <div id="subscription">
    <div v-if='status === "new"'>
      <h1>Subscribe to COVID-19 Travel Restrictions Newsletter</h1>
      <p>Get the latest COVID-19 travel news in your inbox</p>
      <form ref="formElement" @submit.prevent="response" autocomplete="off">
        <input class="appearance-none block w-full sm:max-w-xs py-2 px-3 mb-2
          border rounded-md text-gray-700 focus:outline-none focus:shadow-outline"
          name="entry.1302821693" id="name" required placeholder="Enter your name">
        <input class="appearance-none block w-full sm:max-w-xs py-2 px-3 mb-2
          border rounded-md text-gray-700 focus:outline-none focus:shadow-outline"
          name="entry.1349569946" id="email" required placeholder="Enter your email">
        <button class="button-primary" type="submit" id="subscribe-button">
          Subscribe
        </button>
      </form>
    </div>
    <div v-if='status === "submitted"'>
      <h1>You Are Subscribed</h1>
      <p class="mb-0">Awesome! You’ll get the latest updates in your inbox.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SubscriptionForm',
  data() {
    return {
      status: 'new',
    };
  },
  methods: {
    response() {
      const { formElement } = this.$refs;
      const formData = new FormData(formElement);
      const url = process.env.VUE_APP_SUBSCRIPTION_FORM_URL;
      // Google Forms fails due to CORS so assume data is accepted
      axios.post(url, formData).finally(() => { this.status = 'submitted'; });
    },
  },
};
</script>
