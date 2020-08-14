<template>
  <div>
    <p class="mt-3 text-base md:text-lg font-medium">{{mapTitle}}</p>
    <svg :width="width" :height="height" />
  </div>
</template>

<script>
import {
  event, select, json, mouse, zoom,
} from 'd3';
import { geoPath } from 'd3-geo';
import { geoVanDerGrinten3 } from 'd3-geo-projection';
import { feature } from 'topojson';
import { mapGetters, mapState } from 'vuex';
import { OpenStatus, TravelDirection } from '@/constants/travel';

const EXCLUDE_COUNTRIES = ['Antarctica']; // Antarctica

const renderTooltip = (accessor) => (selection) => {
  if ('ontouchstart' in document) { return; }
  let tooltipDiv;
  const bodyNode = select('body').node();
  selection.on('mouseover', () => {
    // Clean up lost tooltips
    select('body').selectAll('div.tooltip').remove();
    // Append tooltip
    tooltipDiv = select('body').append('div').attr('class', 'tooltip');
    const absoluteMousePos = mouse(bodyNode);
    tooltipDiv.style('left', `${absoluteMousePos[0] + 10}px`)
      .style('top', `${absoluteMousePos[1] - 15}px`)
      .style('position', 'absolute')
      .style('z-index', 1001);
  })
    .on('mousemove', (d, i) => {
      const absoluteMousePos = mouse(bodyNode);
      tooltipDiv.style('left', `${absoluteMousePos[0] + 20}px`)
        .style('top', `${absoluteMousePos[1] - 15}px`);
      const tooltipText = accessor(d, i) || '';
      tooltipDiv.html(tooltipText);
    })
    .on('mouseout', () => {
      tooltipDiv.remove();
    });
};

function travelStateLabel(state) {
  switch (state) {
    case OpenStatus.Open: return 'Allowed';
    case OpenStatus.Closed: return 'Restricted';
    case OpenStatus.Partial: return 'Partially allowed';
    default: return 'Unknown';
  }
}

function tooltipBodyGlobal(country) {
  const state = this.getCountryGlobalState(country.code);
  return `
    <div class="bg-white rounded-md shadow">
      <div class="px-4 py-3">
        <div class="flex flex-col">
          <p class="mb-2 text-xs font-semibold">${country.name}</p>
          <div class="inline-grid grid-cols-legend row-gap-1 col-gap-2 items-baseline">
            <span class="text-xs">Domestic</span>
            <span class="badge badge--xs badge--${state.domestic || OpenStatus.Unknown}">
              ${travelStateLabel(state.domestic)}
            </span>
            <span class="text-xs">Entry</span>
            <span class="badge badge--xs badge--${state.inbound || OpenStatus.Unknown}">
              ${travelStateLabel(state.inbound)}
            </span>
            <span class="text-xs">Exit</span>
            <span class="badge badge--xs badge--${state.outbound || OpenStatus.Unknown}">
              ${travelStateLabel(state.outbound)}
            </span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function tooltipBodyForCountry(country) {
  const state = this.getCountryState(country.code, this.travelContext, this.country);
  return `
    <div class="bg-white rounded-md shadow">
      <div class="p-2">
        <div class="flex items-baseline">
          <span class="mr-2 text-xs font-semibold">${country.name}</span>
          <span class="badge badge--xs badge--${state || OpenStatus.Unknown}">
             ${travelStateLabel(state)}
          </span>
        </div>
      </div>
    </div>
  `;
}

function tooltipBody(d) {
  const country = this.getCountryById(d.id);
  if (!country) { return false; }

  const bodyFunction = this.country ? tooltipBodyForCountry : tooltipBodyGlobal;
  return bodyFunction.bind(this)(country);
}

function zoomHandler() {
  const g = select(this.$el).select('svg').select('g').selectAll('path');
  g.attr('transform', event.transform);
}

export default {
  data() {
    return {
      countries: [],
      isMobile: false,
      svgMaxWidth: 900,
      width: undefined,
      height: undefined,
      baseUrl: process.env.BASE_URL,
    };
  },
  computed: {
    ...mapGetters(['getCountryById', 'getCountryState', 'getCountryGlobalState']),
    ...mapState(['country', 'travelContext']),
    mapTitle() {
      if (this.country) {
        return this.travelContext === TravelDirection.Inbound
          ? `I can travel to ${this.country.name} from:`
          : `I can travel from ${this.country.name} to:`;
      }
      return this.travelContext === TravelDirection.Inbound
        ? 'Entry travel restrictions'
        : 'Exit travel restrictions';
    },
  },
  methods: {
    calculateMapSize() {
      const padding = 12 * 2; // 2 rem
      this.width = Math.min(+select('body').style('width').slice(0, -2) - padding, this.svgMaxWidth) - padding;
      this.height = Math.round(this.width / 2);
      this.isMobile = 'ontouchstart' in document && window.matchMedia('(max-width: 400px)').matches;
    },
    handleSizeChange() {
      // this.calculateMapSize();
      this.setup();
    },
    handleCountryChange(country) {
      this.drawCurrentCountry(country);
      this.drawOpenRegions(this.travelContext);
    },
    handleContextChange(context) {
      this.drawOpenRegions(context);
    },
    drawCurrentCountry(currentCountry) {
      select(this.$el)
        .selectAll('.state')
        .classed('current', (d) => !!currentCountry && +d.id === +currentCountry.id);
    },
    drawOpenRegions(context) {
      select(this.$el)
        .selectAll('.state')
        .classed('open', (d) => {
          if (d?.id) {
            const country = this.getCountryById(d.id);
            return this.getCountryState(country.code, context, this.country) === OpenStatus.Open;
          }
          return false;
        })
        .classed('closed', (d) => {
          if (d?.id) {
            const country = this.getCountryById(d.id);
            return this.getCountryState(country.code, context, this.country) === OpenStatus.Closed;
          }
          return false;
        })
        .classed('partial', (d) => {
          if (d?.id) {
            const country = this.getCountryById(d.id);
            return this.getCountryState(country.code, context, this.country) === OpenStatus.Partial;
          }
          return false;
        })
        .classed('undefined', (d) => {
          if (d?.id) {
            const country = this.getCountryById(d.id);
            return this.getCountryState(country.code, context, this.country) === undefined;
          }
          return true;
        });
    },
    setup() {
      if (!this.countries) { return; }
      this.calculateMapSize();
      const svg = select(this.$el).select('svg');
      svg.selectAll('g').remove();
      const projection = geoVanDerGrinten3()
        .translate([this.width / 2, this.height / 1.5])
        .scale(this.width / 2 / Math.PI);
      const path = geoPath().projection(projection);
      const g = svg.append('g');
      const zoomer = zoom().scaleExtent([1, 50]).on('zoom', zoomHandler.bind(this));
      svg.call(zoomer);

      g
        .selectAll('.state')
        .data(this.countries)
        .enter()
        .append('path')
        .attr('class', 'state')
        .attr('d', path)
        .on('click', (d) => {
          if (this.isMobile) { return; }
          const country = this.getCountryById(d.id);
          if (this.$route.params.country === country.slug) return;
          this.$router.push({ name: 'Country', params: { country: country.slug } });
        })
        .call(renderTooltip(tooltipBody.bind(this)));

      if (this.country) this.handleCountryChange(this.country);
      if (this.travelContext) this.handleContextChange(this.travelContext);
    },
  },
  created() { window.addEventListener('resize', this.handleSizeChange); },
  destroyed() {
    select('body').selectAll('div.tooltip').remove();
    window.removeEventListener('resize', this.handleSizeChange);
  },
  mounted() {
    json(`${this.baseUrl}data/countries-50m.json`).then((data) => {
      this.countries = feature(data, data.objects.countries)
        .features
        .filter(({ properties: { name } }) => !EXCLUDE_COUNTRIES.includes(name));
      this.setup();
    });
  },
  watch: {
    country(currentCountry) { this.handleCountryChange(currentCountry); },
    travelContext(context) { this.handleContextChange(context); },
  },
};
</script>

<style lang="scss">
  .state {
    @media (min-width: 400px), (hover: hover) {
      cursor: pointer;
      &:hover { opacity: 0.85; }
    }
    fill: theme("colors.gray.400");
    stroke: theme("colors.gray.200");
    stroke-width: 0.5;
    stroke-linejoin: round;
    stroke-linecap: round;
    vector-effect: non-scaling-stroke;
    transition: fill 100ms ease;
    &.undefined { fill: theme("colors.gray.400"); }
    &.closed    { fill: theme("colors.secondary"); }
    &.open      { fill: theme("colors.state-open") }
    &.partial   { fill: theme("colors.state-partial") }
    &.current   {
      fill: theme("colors.primary");
      &:hover {
        cursor: unset;
        opacity: 1;
      }
    }
  };
</style>
