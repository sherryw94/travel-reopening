import Vue from 'vue';
import VueGtm from 'vue-gtm';
import VueRouter, { RouteConfig } from 'vue-router';
import VueMeta from 'vue-meta';
import Home from '../views/Home.vue';
import Subscribe from '../views/Subscribe.vue';

Vue.use(VueRouter);
Vue.use(VueMeta);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about.html',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/subscribe.html',
    name: 'Subscribe',
    component: Subscribe,
  },
  {
    path: '/404.html',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
    alias: '*',
  },
  {
    path: '/:country.html',
    name: 'Country',
    component: () => import('../views/Country.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from) {
    if (to.name === from.name) {
      return undefined;
    }
    return { x: 0, y: 0 };
  },
});

Vue.use(VueGtm, {
  id: process.env.VUE_APP_GTM_ID,
  enabled: process.env.NODE_ENV === 'production',
  vueRouter: router,
});

export default router;
