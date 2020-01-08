<!-- 商品详情页 -->
<template>
  <div id="goodsDetail">
    <van-nav-bar title="商品详情" left-arrow @click-left="onClickLeft" />
    <div class="goodsWrapper">
      <div class="goodsImage">
        <img v-lazy="goodsInfos.small_image" alt="" />
      </div>
      <div class="flashGood" v-if="goodsInfos.isFlash">
        <van-row>
          <van-col span="12" class="flashLeft"
            ><div class="flash">限时抢购<i>抢购中</i></div></van-col
          >
          <van-col span="12" class="flashRight"
            ><div class="end">
              距结束
              <div class="endTime">
                <van-count-down :time="time">
                  <template v-slot="timeData">
                    <span class="item">{{ timeData.hours | timeFormat }}</span>:
                    <span class="item">{{
                      timeData.minutes | timeFormat
                    }}</span>:
                    <span class="item">{{
                      timeData.seconds | timeFormat
                    }}</span>
                  </template>
                </van-count-down>
              </div>
            </div>
          </van-col>
        </van-row>
      </div>
      <!-- 产品详细信息 -->
      <div class="goods_desc">
      
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { NavBar, Row, Col, CountDown } from "vant";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    [NavBar.name]: NavBar,
    [Row.name]: Row,
    [Col.name]: Col,
    [CountDown.name]: CountDown
  },
  data() {
    //这里存放数据
    return {
      goodsInfos: this.$route.query,
      time: 1 * 60 * 60 * 1000
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    onClickLeft() {
      this.$router.go(-1);
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
#goodsDetail {
  .goodsWrapper {
    width: 100%;
    text-align: left;
    .goodsImage {
      width: 100%;
      img {
        width: 100%;
      }
    }
    .flashLeft,
    .flashRight {
      height: 2.4rem;
      padding:0  0.8rem;
      vertical-align: middle;
      line-height: 2.4rem;
      color: #ffffff;
      font-size: 0.825rem;
      background: #e25450;
      i {
        font-size: 0.6rem;
        margin-left: 0.675rem;
      }
    }
    .flashRight {
      background: #fcefe9;
      .end {
        color: #e25450;
      }
      .endTime {
        display: inline-block;
        .item {
          display: inline-block;
          width: 1.4rem;
          margin-right:0.5rem;
          color: #fff;
          font-size: 12px;
          text-align: center;
          background-color: #e25450;
        }
      }
    }
  }
}
</style>
