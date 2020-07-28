<template>
  <div>
    <strong><slot /></strong>:
    &nbsp;<span>{{latestFigure.value}}</span>
    <svg />
  </div>
</template>

<script>
import {
  axisBottom, line, select, scaleTime, max, scaleLinear, axisRight, timeFormat,
} from 'd3';
import moment from 'moment';

const notAvailable = 'NA';

export default {
  name: 'Graph',
  props: {
    stats: { type: Array, default() { return []; } },
  },
  created() { window.addEventListener('resize', this.handleSizeChange); },
  computed: {
    latestFigure() {
      if (!this.stats || this.stats.length <= 0) { return { value: notAvailable }; }
      const lastFigure = (this.stats.slice(0) || []) // make copy of array to prevent mutation
        .sort((a, b) => b.date - a.date)
        .find(({ value }) => value);
      const formattedValue = lastFigure?.value
        ? lastFigure.value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : notAvailable;
      return { value: formattedValue };
    },
  },
  destroyed() { window.removeEventListener('resize', this.handleSizeChange); },
  methods: {
    drawData() {
      const margin = {
        top: 10, right: 30, bottom: 30, left: 40,
      };
      const baseWidth = select(this.$el).style('width').slice(0, -2);
      const width = baseWidth - margin.left - margin.right;
      const height = 100 - margin.top - margin.bottom;

      select(this.$el).select('svg').selectAll('g').remove();

      const svg = select(this.$el)
        .select('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

      const x = scaleTime()
        .domain([moment('2020-01-01').toDate(), moment().toDate()])
        .range([0, width]);

      svg.append('g')
        .attr('class', 'xaxis')
        .attr('transform', `translate(0, ${height})`)
        .call(axisBottom(x).tickFormat(timeFormat('%b')));

      // Add Y axis
      const y = scaleLinear()
        .domain([0, max(this.stats, ({ value }) => +value)])
        .range([height, 0]);

      svg.append('g')
        .attr('class', 'yaxis')
        .call(axisRight(y).ticks(3))
        .select('.tick:first-of-type')
        .remove();

      const nonEmptyData = this.stats.filter((d) => !!d.value && +d.value > 0);
      svg.append('path')
        .attr('class', 'stats')
        .datum(nonEmptyData)
        .attr('d', line()
          .x((d) => x(d.date))
          .y((d) => y(d.value)));
    },
    handleSizeChange() { this.drawData(); },
  },
  watch: {
    stats() { this.drawData(); },
  },
};
</script>

<style lang="scss">
  svg {
    .xaxis text { text-anchor: start; }
    .stats {
      fill: none;
      stroke: theme("colors.primary");
    }
  }
</style>
