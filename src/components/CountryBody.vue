<template>
  <div v-if="!!this.content">
    <vue-markdown :source="content" :anchorAttributes='anchorAttributes'></vue-markdown>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown';

export default {
  name: 'CountryBody',
  components: {
    'vue-markdown': VueMarkdown,
  },
  data() {
    return {
      anchorAttributes: { target: '_blank', rel: 'nofollow' },
    };
  },
  props: {
    content: String,
  },
};
</script>
