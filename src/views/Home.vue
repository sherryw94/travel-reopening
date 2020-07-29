<template>
  <div>
    <TitleMapSelect/>
    <div class="main-container">
      <div class="main-container__inner">
        <Panel tag="h2" title="Countries Reopening">
          <Reopening/>
        </Panel>
      </div>
    </div>
  </div>
</template>

<script>
import Panel from '@/components/Panel.vue';
import Reopening from '@/components/Reopening.vue';
import TitleMapSelect from '@/components/TitleMapSelect.vue';

export default {
  name: 'Home',
  components: { Panel, Reopening, TitleMapSelect },
  mounted() {
    this.$nextTick(() => document.dispatchEvent(new Event('render-completed')));
  },
};
</script>
