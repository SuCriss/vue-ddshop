<!-- 分类菜单右侧页面 -->
<template>
  <div id="contentView">
    <van-tabs
      color="#fff"
      class="detail_header"
      title-active-color="#3cb963"
      v-model="active"
      scrollspy
      @change="changeTab"
      sticky
    >
      <van-tab
        v-for="(categoryDetail, index) in categoriesDetailData"
        :title="categoryDetail.name"
        :key="index"
      >
        <van-panel v-if="curPanel === index" :title="categoryDetail.name">
          <div v-if="curPanel === index">
            <van-card
              lazy-load
              class="card_wrapper"
              v-for="(it, idx) in categoryDetail.products"
              :key="idx"
              :price="it.price"
              :origin-price="it.origin_price"
              :desc="it.spec"
              :title="it.name"
              :thumb="it.small_image"
            >
              <div slot="footer"  @click.stop="addToCart(it)">
                <svg-icon
                  iconClass="car"
                  style="width:1.5rem;height:1.5rem"
                ></svg-icon>
              </div>
            </van-card>
          </div>
          
        </van-panel>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { Tab, Tabs, Panel, Card } from "vant";
import { mapMutations, mapState } from "vuex";
export default {
  props: {
    categoriesDetailData: Array
  },
  //import引入的组件需要注入到对象中才能使用
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Panel.name]: Panel,
    [Card.name]: Card
  },
  data() {
    //这里存放数据
    return {
      active: 0,
      curPanel: 0
    };
  },
  //监听属性 类似于data概念
  computed: {
    ...mapState("public", ["userInfo"])
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    ...mapMutations("public", {
      ADD_GOODS: "ADD_GOODS",
      addToCart: "ADD_TO_CART"
    }),
    //切换右侧导航栏
    changeTab(name, title) {
      console.log(name);
      console.log(title);
      this.curPanel = name;
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
#contentView {
  .van-tab {
    background: #666;
  }
  .van-tab__text {
    font-size: 0.73rem;
  }
  .van-panel {
    background: #ccc;
  }
  .van-card__title{
      font-size: 0.75rem;
      font-weight: 700;
  }
  .card_wrapper {
    overflow: auto;
    background: #fff;
  }
}
.van-card {
  margin-top: 0;
}
.van-card__price {
  color: #f00;
}
</style>
