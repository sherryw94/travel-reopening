import Vue from 'vue';
import * as Sentry from '@sentry/browser';
import { Vue as VueIntegration } from '@sentry/integrations';
import VueSocialSharing from 'vue-social-sharing';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faFacebookF, faTwitter, faLinkedinIn, faTelegramPlane, faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VueSchemaMicrodata from 'vue-schema-microdata';
import VueI18n from 'vue-i18n';
import { messages, defaultLocale } from '@/i18n';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './assets/styles/index.scss';
import 'flag-icon-css/css/flag-icon.css';

library.add(
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faTelegramPlane,
  faWhatsapp,
);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;
Vue.use(VueSocialSharing);
Vue.use(VueSchemaMicrodata);
Vue.use(VueI18n);

const i18n = new VueI18n({
  messages,
  locale: defaultLocale,
  fallbackLocale: defaultLocale,
});

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
  mounted: () => document.dispatchEvent(new Event('x-app-rendered')),
}).$mount('#app');

Sentry.init({
  dsn: process.env.VUE_APP_SENTRY,
  integrations: [new VueIntegration({ Vue, attachProps: true })],
});
