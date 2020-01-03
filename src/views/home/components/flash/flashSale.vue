<!-- 限时抢购 -->
<template>
  <div id="flashSale">
    <div class="flashTitle clear">
      <div class="title">限时抢购</div>
      <van-count-down class="countStyle clear" :time="time">
        <template v-slot="timeData">
          <span class="item">{{ timeData.hours | timeFormat }}</span>
          <span class="item">{{ timeData.minutes | timeFormat }}</span>
          <span class="item">{{ timeData.seconds | timeFormat }}</span>
        </template>
      </van-count-down>
      <div class="more" @click='moreBtn'>更多</div>
      <FlashFood :flash_sale_product_list='flash_sale_product_list' />
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { CountDown,Toast } from "vant";
import FlashFood from './flashFood'
export default {
  props:{
    flash_sale_product_list:Array
  },
  //import引入的组件需要注入到对象中才能使用
  components: {
    [CountDown.name]: CountDown,
    FlashFood,
  },
  data() {
    //这里存放数据
    return {
      time: 30 * 60 * 60 * 1000
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //   更多
      moreBtn(){
          Toast({
              message:'更多',
              forbidClick:true,
              duration:800
          })
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
#flashSale {
  margin-top: 0.625rem;
  padding: 1.5rem 0 0.9375rem 0;
  background: white;
  .flashTitle {
    margin: 0 0.625rem 0.625rem;
    // height: 1.5625rem;
  }
  .title {
    display: inline-block;
    padding-left: 0.3125rem;
    border-left: 4px solid #3cb963;
    height: 1.3125rem;
    vertical-align: middle;
    float: left;
  }
  .item {
    display: inline-block;
    width:1rem;
    margin-right: 5px;
    color: #fff;
    font-size: 14px;
    text-align: center;
    background-color: #1989fa;
  }
  .countStyle{
    float: left;
    margin-left: 0.8rem;
}
.more{
    display: inline-block;
    float: right;
    margin-right: 0.3125rem;
    font-size:0.8rem;
    height: 1.4rem;
    line-height: 1.4rem;
    color: #3cb963;
    vertical-align: middle;
}
}
</style>
