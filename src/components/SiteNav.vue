<template>
  <nav class="fixed z-30 w-full bg-white shadow">
    <div class="flex items-center w-full h-12 px-4 sm:px-6 md:px-8">
      <router-link class="flex-shrink-0 -ml-2 no-underline hover:opacity-100"
        :to="{name: 'Home'}"><img class="block h-8 w-auto" alt="TourHero Logo"
        src="../assets/images/site-logo.png"></router-link>
      <router-link class="ml-5 text-sm font-medium text-gray-700 no-underline
        hover:text-gray-900" :to="{ name: 'About'}" id="sitenav-about">About</router-link>
      <a class="ml-5 text-sm font-medium text-gray-700 no-underline
        hover:text-gray-900" href="https://github.com/tourhero/travel-reopening" target="_blank" rel="nofollow" id="sitenav-contribute">Contribute</a>
      <router-link class="flex items-center px-2.5 py-0.5 ml-5 bg-primary text-sm
        font-medium text-white rounded-md no-underline hover:opacity-100" :to="{name: 'Subscribe'}"
        id="sitenav-subscribe">Subscribe</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'SiteNav',
};
</script>
