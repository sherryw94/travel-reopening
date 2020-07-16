/* eslint-disable max-len, @typescript-eslint/ban-ts-ignore */
import Vue from 'vue';
import Vuex from 'vuex';
// @ts-ignore
import { countries as CountryOptions } from '@/constants/countries';
// @ts-ignore
import { countries } from '@/constants/travel.yaml';
import { OpenStatus, TravelDirection } from '@/constants/travel';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    country: null,
    countryOptions: CountryOptions
      .sort((a: {name: string}, b: {name: string}) => a.name.localeCompare(b.name)),
    travelContext: TravelDirection.Inbound,
    countries,
  },
  mutations: {
    updateCountry(state, country) {
      state.country = country;
    },
    toggleContext(state) {
      const context = state.travelContext === TravelDirection.Inbound
        ? TravelDirection.Outbound : TravelDirection.Inbound;
      state.travelContext = context;
    },
  },
  actions: {
    updateCountryAction({ commit }, country) {
      commit('updateCountry', country);
    },
    toggleContextAction({ commit }) {
      commit('toggleContext');
    },
  },
  modules: {
  },
  getters: {
    getCountryByCode(state) {
      return (code: string) => state.countryOptions
        .find((country: {code: string}) => country.code === code);
    },
    getCountryBySlug(state) {
      return (slug: string) => state.countryOptions
        .find((country: {slug: string}) => country.slug === slug);
    },
    getCountryById(state) {
      return (id: string) => state.countryOptions
        .find((country: {id: string}) => country.id === id);
    },
    getCountryGlobalState(state) {
      return (code: string) => {
        const c = state.countries[code] || {};
        return {
          domestic: c?.travel?.domestic,
          inbound: c?.travel?.inbound,
          outbound: c?.travel?.outbound,
        };
      };
    },
    getCountryState(state) {
      return (code: string, direction: string, currentCountry: {code: string}) => {
        if (!currentCountry) { return state.countries[code]?.travel[direction]; }

        const fromCountryCode = direction === TravelDirection.Inbound ? code : currentCountry.code;
        const toCountryCode = direction === TravelDirection.Inbound ? currentCountry.code : code;
        const fromCountry = state.countries[fromCountryCode]?.travel || {};
        const toCountry = state.countries[toCountryCode]?.travel || {};

        if (fromCountry.outbound === OpenStatus.Closed) { return OpenStatus.Closed; }
        if ([OpenStatus.Open, OpenStatus.Partial, undefined].includes(fromCountry.outbound)) {
          if (toCountry?.inbound_allowed) { return toCountry.inbound_allowed.includes(fromCountryCode) ? OpenStatus.Open : OpenStatus.Closed; }
          if (toCountry?.inbound_restricted) { return toCountry.inbound_restricted.includes(fromCountryCode) ? OpenStatus.Closed : OpenStatus.Open; }
          return toCountry.inbound;
        }
        return undefined;
      };
    },
  },
});
