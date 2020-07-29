<script>
export default {
  name: 'Heading',
  render(createElement) {
    return createElement(this.tag, this.title);
  },
  props: {
    tag: {
      type: String,
      default: 'h3',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
};
</script>
