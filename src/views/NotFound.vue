<template>
  <div class="main-container">
    <div class="main-container__inner">
      <div class="flex flex-col items-center sm:flex-row sm:items-start sm:pt-6 md:pt-8">
        <div class="mb-12 sm:mb-0 sm:mr-4">
          <div class="flex items-end">
            <h1 class="text-secondary">Oops... It's a 404.</h1>
            <svg class="inline-flex h-12 w-auto text-secondary fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M50 20a22.5 22.5 0 00-22.5 22.5 25.73 25.73 0 00.9 6.32 22.27 22.27 0 002.41 5.44c1 1.5 2.53 3.75 4.46 6.44s3.41 4.62 7.27 9.64c3 3.83 5.48 7.1 7.46 9.66 2-2.56 4.51-5.83 7.46-9.66 3.86-5 5.33-6.94 7.27-9.64s3.46-4.94 4.46-6.44a22.27 22.27 0 002.41-5.44 25.73 25.73 0 00.9-6.32A22.5 22.5 0 0050 20zm8.49 28.16L55.66 51 50 45.33 44.34 51l-2.83-2.83 5.66-5.66-5.66-5.66L44.34 34 50 39.67 55.66 34l2.83 2.83-5.66 5.67z"/></svg>
          </div>
          <p>It looks like something went wrong.</p>
          <p class="mb-6">Please check your spelling and try again, or let us take you home.</p>
          <router-link :to="{ name: 'Home'}" tag="button"
            class="w-full sm:max-w-xs bg-primary text-white py-2
            px-4 rounded-md focus:outline-none focus:shadow-outline">
            Take me home
          </router-link>
        </div>
        <img class="h-auto w-8/12 md:w-6/12" src="@/assets/images/undraw-lost.svg">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  mounted() { this.$nextTick(() => document.dispatchEvent(new Event('render-completed'))); },
  metaInfo() {
    return {
      title: '404 | Project Travel Reopening',
      meta: [{
        vmid: 'description',
        name: 'description',
        content: 'Oops... It\'s a 404. It seems like there is a problem with the URL.',
      }],
    };
  },
};
</script>
