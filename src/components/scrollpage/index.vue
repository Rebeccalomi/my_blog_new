<template>
  <div style="overflow: hidden">
    <slot></slot>
    <div
      style="height: 40px;margin-top: 10px;z-index: 1"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(245,245,245)"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    loading: Boolean,
    noData: Boolean,
    offset: Number
  },
  name: "index",
  mounted() {
    this.handleScroll();
  },
  data() {
    return {};
  },
  methods: {
    handleScroll(e) {
      var that = this;
      let scrollbarEl = this.$refs.myScrollbar.wrap;
      if (!that.noData) {
        let curHeight =
          document.documentElement.scrollTop || document.body.scrollTop;
        var scrollPage = document.getElementById("scroll-page");
        scrollbarEl.onscroll = function() {
          console.log(scrollbarEl.scrollTop);
          if (
            scrollbarEl.scrollTop >
            scrollbarEl.scrollHeight - document.body.clientHeight
          ) {
            console.log("1");
          }
        };
      }
    }
  }
};
</script>

<style scoped></style>
