<template>
  <div class="loading" v-if="isShowLoading">
    <van-overlay class-name="none_bg" :show="isShowLoadingTrans">
      <div class="wrapper" @click.stop>
        <div class="block">
          <van-loading color="#1989fa" />
        </div>
      </div>
    </van-overlay>
    <div class="loading_container">
      <div
        class="load_img" @click.stop
        :style="{ backgroundPositionY: -(positionY % 7) * 2.5 + 'rem' }"
      ></div>
      <svg-icon iconClass="loading" style="width:1.5rem;height:1.5rem" />
    </div>
  </div>
</template>

<style lang="less" scoped>
@import "./index.less";
.loading{
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 99999;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.none_bg {
  background: none;
}
@keyframes load {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-50px);
  }
  100% {
    transform: translateY(0px);
  }
}
@keyframes ellipse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.3);
  }
  100% {
    transform: scale(1);
  }
}
.loading_container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 2.5rem;
  height: 2.5rem;
}
.load_img {
  width: 100%;
  height: 100%;
  background: url(../../images/loading/icon_loading.png) no-repeat 0 0;
  background-size: 2.5rem auto;
  transform: translateY(0px);
  animation: load 0.6s infinite ease-in-out;
  position: relative;
  z-index: 11;
}
.load_ellipse {
  position: absolute;
  width: 2.6rem;
  height: 2.6rem;
  top: 2.2rem;
  left: 0.2rem;
  z-index: 10;
  animation: ellipse 0.6s infinite ease-in-out;
}
</style>

<script>
import { Loading, Overlay } from "vant";
import { mapGetters } from "vuex";
export default {
  name: "Loading",
  data() {
    return {
      isShowLoadingTrans: false,
      positionY: 0,
      timer: null
    };
  },
  components: {
    [Loading.name]: Loading,
    [Overlay.name]: Overlay
  },
  computed: {
    ...mapGetters("public", {
      isShowLoading: "getLoading"
    })
  },
  methods: {},
  mounted() {
    this.timer = setInterval(() => {
      this.positionY++;
    }, 600);
  },
  beforeDestroy () {
    clearInterval(this.timer);
  }
};
</script>
