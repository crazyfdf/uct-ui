<script>
export default {
  methods: {},
  onLaunch: function (options) {
    console.info(this.$uct.config);
    this.$uct.vuex("version", "0.0.2");
    console.log(this.$store.state.version);
  },
};
</script>

<style lang="scss">
@import "uview-ui/index.scss";
@import "@/components/uct/index.scss";
</style>
