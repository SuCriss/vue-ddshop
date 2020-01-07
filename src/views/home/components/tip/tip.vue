<!-- tip -->
<template>
  <div id="tip" @click="goToMyVip">
    <div class="tipBox" v-for="(tip, index) in tips" :key="index">
      <img v-lazy="tip.imgUrl" />
      <span class="tipText">{{ tip.desc }}</span>
    </div>
    <div>
      <img :src="home_ad" class="adImg" alt="" />
      <div class="adTitle">
        加入<br />
        会员
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {mapState} from 'vuex'
export default {
  props: {
    home_ad: String
  },
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      tips: [
        {
          imgUrl: require("../../../../images/icon/transport.png"),
          desc: "最快29分钟送达"
        },
        {
          imgUrl: require("../../../../images/icon/money.png"),
          desc: "0元起送 0配送费"
        },
        { imgUrl: require("../../../../images/icon/seal.png"), desc: "安心退" }
      ]
    };
  },
  //监听属性 类似于data概念
  computed: {
    ...mapState('public',['userInfo'])
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    goToMyVip () {
      if (this.userInfo.token) {
        this.$router.push({ name: 'muVip' });
      } else {
        this.$router.push('/login');
      }
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
#tip {
  margin-top: 0.3rem;
  position: relative;
}
.tipBox {
  float: left;
  width: 33%;
  text-align: center;
}
.tipBox img {
  vertical-align: middle;
  height: 1rem;
  width: 1rem;
  margin-right: 0.2rem;
}
.tipText {
  font-size: 0.6rem;
  color: "#45c763";
}
.adImg {
  margin-top: 0.8rem;
  width: 100%;
  height: 6rem;
  margin-bottom: -0.2rem;
}
.adTitle {
  position: absolute;
  top: 3.4rem;
  left: 14%;
  width: 2.5rem;
  height: 2.5rem;
  line-height: 1.2rem;
  border-radius: 50%;
  font-size: 0.1rem;
  text-align: center;
  color: gold;
  background-image: linear-gradient(to right, #ff9569 0%, #e92758 100%);
  -webkit-animation-name: scaleDraw; /*关键帧名称*/
  -webkit-animation-timing-function: ease-in-out; /*动画的速度曲线*/
  -webkit-animation-iteration-count: infinite; /*动画播放的次数*/
  -webkit-animation-duration: 3s; /*动画所花费的时间*/

  @keyframes scaleDraw {
    /*定义关键帧、scaleDrew是需要绑定到选择器的关键帧名称*/
    0% {
      transform: scale(1); /*开始为原始大小*/
    }
    25% {
      transform: scale(1.1); /*放大1.1倍*/
    }
    50% {
      transform: scale(1);
    }
    75% {
      transform: scale(1.1);
    }
  }
}
</style>
