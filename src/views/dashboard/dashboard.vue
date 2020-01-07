<!-- dashboard -->
<template>
  <div id="dashboard">
    <van-tabbar
      v-model="active"
      :safe-area-inset-bottom="true"
      class="active_tab"
      active-color="#75a342"
    >
      <!-- 给购物车的Tabbar加个ID 方便做加入购物车的小球动画 -->
      <van-tabbar-item
        v-for="(item, index) in tabbars"
        :key="index"
        :id="index == 3 ? 'buycar' : ''"
        @click="tab(index, item.name)"
        :info="item.name == 'cart' ? goodsNum : ''"
      >
        <span :class="currIndex == index ? active : ''">{{ item.title }}</span>
        <template slot="icon" slot-scope="props">
          <img :src="props.active ? item.active : item.normal" />
        </template>
      </van-tabbar-item>
    </van-tabbar>

    <!-- 缓存界面选择加载 -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {Tabbar, TabbarItem,Toast} from 'vant'
import {mapState} from 'vuex'
export default {
    name:'dashboard',
  //import引入的组件需要注入到对象中才能使用
  components: {
      [Tabbar.name]:Tabbar,
      [TabbarItem.name]:TabbarItem
  },
  data() {
    //这里存放数据
    return {
    currIndex: 0,
      active: 0,
      tabbars: [
        {
          name: "home",
          title: '首页',
          normal: require("@/images/tabbar/home_default.png"),
          active: require("@/images/tabbar/home_selected.png")
        },
        {
          name: "category",
          title: '分类',
          normal: require("@/images/tabbar/category_default.png"),
          active: require("@/images/tabbar/category_selected.png")
        },
        {
          name: "eat",
          title: '吃什么',
          normal: require("@/images/tabbar/eat_default.png"),
          active: require("@/images/tabbar/eat_selected.png"),
        },
        {
          
          name: "cart",
          title: "购物车",
          normal: require("@/images/tabbar/shoppingcart_default.png"),
          active: require("@/images/tabbar/shoppingcart_selected.png"),
          num: 5
        },
        {
          name: "mine",
          title: '我的',
          normal: require("@/images/tabbar/mine_default.png"),
          active: require("@/images/tabbar/mine_selected.png")
        }
      ]
    };
  },
  //监听属性 类似于data概念
  computed: {
    ...mapState('public',['shopCart']),
    goodsNum(){
      let num = 0;
      Object.values(this.shopCart).forEach((goods,index)=>{
        num +=goods.num*1
      });
      if(num>0) return num;
    }
  },
  //监控data中的数据变化
  watch: {
    '$route':{
      handler(val,oldVal){
        this.tabbarSelected(val.name)
      }
    }
  },
  //方法集合
  methods: {
    tab(index,name){
      this.currIndex=index;
      this.$router.push(name)
    },
    tabbarSelected (item) {
      const mapType = {
        home: 0,
        category: 1,
        eate: 2,
        cart: 3,
        mine: 4
      }
      this.active = mapType[item]
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.tabbarSelected(this.$route.name)
  },
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
// .moveToCart {
//   animation: mymove 0.5s ease-in-out;
// }
</style>
