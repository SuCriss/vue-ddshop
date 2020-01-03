<template>
  <div class="loading">
    <van-overlay class-name='none_bg' :show="isShowLoading">
      <div class="wrapper" @click.stop>
        <div class="block">
          <van-loading  color="#1989fa" />
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<style lang="less" scoped>
@import "./index.less";
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.none_bg{
  background: none
}
</style>

<script>
import { Loading, Overlay } from "vant";
import { mapGetters } from "vuex";
export default {
  name: "Loading",
  data() {
    return {};
  },
  components: {
    [Loading.name]: Loading,
    [Overlay.name]: Overlay
  },
  computed: {
      ...mapGetters('public',{
          isShowLoading:'getLoading'
      })
  },
  methods: {},
  mounted() {}
};
</script>
