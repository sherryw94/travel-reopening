<template>
  <div class="main-container">
    <div class="main-container__inner">
      <h1>About Project Travel Reopening</h1>
      <p>
        Project Travel Reopening is a free and open source project by TourHero. It provides an
        up-to-date view of travel restrictions around the world due to the COVID-19 pandemic. We
        hope this information will be useful to individuals who require insights
        into the global situation in planning their travel.
      </p>
      <p>
        Our data is pulled from multiple sources including official government
        websites and news outlets. Selecting a country will display detailed information on domestic
        travel, international travel, and visa and quarantine regulations current
        to the destination, as well as relevant links to sources.
      </p>

      <h2>How You Can Contribute</h2>
      <p>
        As the situation changes rapidly around the world, keeping information
        up-to-date can be challenging. If you spot any incorrect or outdated
        information, we encourage you to contribute to the project. The source
        code and the data is open-sourced on GitHub:
        <a href="https://github.com/tourhero/travel-reopening" target="_blank" rel="nofollow noopener">
        https://github.com/tourhero/travel-reopening</a>.
        Alternatively, you can submit data or situation reports from your
        region to <a href="mailto:travel-map@tourhero.com" target="_blank">
          travel-map@tourhero.com</a>.
      </p>

      <h2>About Our Data</h2>
      <Disclaimer class="mb-3" />

      <h2>Legend</h2>
      <div class="mb-4">
        <TravelStateBadge travelState="selected" class="inline-block mb-1" />
        <p>Selected country</p>
      </div>
      <div class="mb-3">
        <TravelStateBadge travelState="unknown" class="inline-block mb-1" />
        <p>No information</p>
      </div>

      <h3>International Travel</h3>
      <div class="mb-4">
        <TravelStateBadge travelState="yes" class="inline-block mb-1" />
        <p>
          Travelers can enter and exit the country — no travel restrictions
          related to COVID-19 apply.
        </p>
      </div>
      <div class="mb-4">
        <TravelStateBadge travelState="partial" class="inline-block mb-1" />
        <p>
          Only certain travelers can enter/exit.
          Governments may advise against non-essential travel.
        </p>
      </div>
      <div class="mb-3">
        <TravelStateBadge travelState="no" class="inline-block mb-1" />
        <p>
          Entry/exit travel is prohibited. Repatriation travel may be possible.
        </p>
      </div>

      <h3>Domestic Travel</h3>
      <div class="mb-4">
        <TravelStateBadge travelState="yes" class="inline-block mb-1" />
        <p>
          Movement is allowed. Public transportation and domestic flights are operational.
          Hotels and restaurants are open.
        </p>
      </div>
      <div class="mb-4">
        <TravelStateBadge travelState="partial" class="inline-block mb-1" />
        <p>
          Certain movement restrictions apply, such as curfews, social gathering limits,
          and state border restrictions. Hotels and restaurants may not be open.
        </p>
      </div>
      <div class="mb-3">
        <TravelStateBadge travelState="no" class="inline-block mb-1" />
        <p>
          Strict movement restrictions apply. Domestic flights and trains are not operational.
          Only essential journeys are allowed.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Disclaimer from '@/components/Disclaimer.vue';
import TravelStateBadge from '@/components/TravelStateBadge.vue';

export default {
  name: 'About',
  components: { Disclaimer, TravelStateBadge },
  mounted() {
    this.$nextTick(() => document.dispatchEvent(new Event('render-completed')));
  },
  metaInfo() {
    return {
      title: 'About',
      meta: [{
        vmid: 'description',
        name: 'description',
        content: 'Project Travel Reopening is a free and open-source project by TourHero. It provides an up-to-date global view of travel restrictions due to the COVID-19 pandemic.',
      }],
    };
  },
};
</script>
