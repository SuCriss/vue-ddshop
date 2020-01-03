<!-- 首页 -->
<template>
  <div id="home">
    <div v-if="!isShowLoading">
      <div class="head">
        <!-- 头部 -->
        <Header></Header>
        <!-- 轮播 -->
        <Swiper :swipe_list="swipe_list" />
        <!-- 提示信息 -->
        <Tip :home_ad='home_ad' />
      </div>
      <!-- 导航栏 -->
      <Nav :nav_list='nav_list' />
      <!-- VIP -->
      <Vip />
      <!-- 限时抢购 -->
      <FlashSale :flash_sale_product_list='flash_sale_product_list' />
      <TabbarItem :tabbar_all_product_list="tabbar_all_product_list" />
    </div>
    <!-- 回到顶部按钮 -->
    <v-top />
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Header from './components/header/header'
import Swiper from './components/swiper/swiper'
import Nav from './components/nav/nav'
import Tip from './components/tip/tip'
import Vip from './components/vip/vip'
import FlashSale from './components/flash/flashSale'
import TabbarItem from './components/TabbarItem/TabbarItem'
import { mapGetters } from 'vuex'
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Header,
    Swiper,
    Tip,
    Nav,
    Vip,
    FlashSale,
    TabbarItem
  },
  data() {
    //这里存放数据
    return {
      swipe_list:[],
      home_ad:'',
      nav_list:[],
      flash_sale_product_list:[],
      tabbar_all_product_list:[]
    };
  },
  //监听属性 类似于data概念
  computed: {
    ...mapGetters('public',{
      isShowLoading:'getLoading'
    })
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    _initData(){
      let _this = this;
      _this.$get(_this.$api.home.homeApi).then(res=>{
        console.log(res)
        if(res.success){
          const data=res.data;
          _this.swipe_list = data.list[0].icon_list;
          _this.home_ad = data.home_ad.image_url;
          _this.flash_sale_product_list = data.list[3].product_list;
          _this.tabbar_all_product_list = data.list[12].product_list;
          _this.nav_list = data.list[2].icon_list;
        }
      }).catch(err=>{

      })
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // 数据初始化
    this._initData()
  },
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
#home {
  background-color: "#f5f5f5";
  padding-bottom: 3rem;
  .head {
    margin-top: -3rem;
    width: 100%;
    background-image: url("http://518taole.7-orange.cn/backImage.png");
  }
}
.van-divider {
  background-color: #f5f5f5;
  margin: 0;
}
</style>
