<template>
  <div class="mb-4 bg-white overflow-hidden shadow rounded-md">
    <div class="px-4 py-5 md:p-6">
      <Heading v-if="title" :tag="tag" :title="title" />
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Heading from '@/components/Heading.vue';

export default {
  name: 'Panel',
  components: {
    Heading,
  },
  props: {
    tag: String,
    title: String,
  },
};
</script>
