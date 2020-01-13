<!-- 分类 -->
<template>
  <div id="category">
    <!--内容-->
    <div class="listWrapper">
      <!--左边-->
      <div class="leftWrapper" v-show='cateWrapper' ref="ratingsWrapper">
        <div>
          <ul class="wrapper">
            <li
              class="categoryItem"
              v-for="(cate, index) in categoryList"
              :class="{ selected: currentIndex === index }"
              @click="clickLeftLi(index)"
              :key="cate.id"
              ref="sidebarItem"
            >
              <span class="textWrapper">{{ cate.name }}</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 右边 -->
      <div class="rightWraper">
        <ContentView :categoriesDetailData="categoriesDetailData" />
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { Sidebar, SidebarItem } from "vant";
import BScroll from "better-scroll";
import ContentView from "./components/ContentView";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    [Sidebar.name]: Sidebar,
    [SidebarItem.name]: SidebarItem,
    ContentView
  },
  data() {
    //这里存放数据
    return {
      currentIndex: 0,
      cateWrapper:false,
      categoryList: [],
      categoriesDetailData: []
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    _initBScroll() {
      // 1.4.初始化滚动视图
      this.$nextTick(() => {
        if (!this.leftScroll) {
          this.cateWrapper=true;
          this.leftScroll = new BScroll(this.$refs.ratingsWrapper, {
            probeType: 3,
            click: true,
            scrollY: true,
            tap: true,
            mouseWheel: true
          });
        } else {
          this.leftScroll.refresh();
        }
      });
    },
    //获取分类菜单
    getCategoryApi() {
      this.$get(this.$api.category.categoryApi)
        .then(res => {
          console.log(res);
          this.categoryList = res.data.cate;
          this._initBScroll();
        })
        .catch(err => {});
    },
    getContentData() {
      this.$get(this.$api.category.categoryDetailApi + "/lk001")
        .then(res => {
          console.log("categoryDetail", res);
          this.categoriesDetailData = res.data.cate;
        })
        .catch(err => {});
    },
    //初始化数据
    async _initData() {
      this.getCategoryApi();
      this.getContentData();
    },
    async clickLeftLi(index) {
      console.log(index);
      let _this = this;
      _this.currentIndex = index;
      setTimeout(() => {
        console.log(_this.$refs);
        let menuLists = _this.$refs.sidebarItem;
        let el = menuLists[index];
        console.log(el);
        _this.leftScroll.scrollToElement(el, 300);
      }, 800);

      //   获取右侧数据
      let param;
      if (index >= 9) {
        param = `/lk0${index + 1}`;
      } else {
        param = `/lk00${index + 1}`;
      }
      _this.getOtherCategoryDetailData(param);
    },
    getOtherCategoryDetailData(param) {
      this.$get(this.$api.category.categoryDetailApi + param)
        .then(res => {
          console.log("categoryDetailOther", res);
          this.categoriesDetailData = res.data.cate;
        })
        .catch(err => {});
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this._initData();
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {
    this.$nextTick(() => {
      console.log('activated')
      if (this.$route.params.currentIndex > -1) {
        this.clickLeftLi(this.$route.params.currentIndex + 1);
      }
    });
  } //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
#category {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  overflow: hidden;
}

.listWrapper {
  display: flex;
  //   better-scroll 触发的绝对定位
  position: absolute;
  top: 0;
  bottom: 3rem;
  width: 100%;
  overflow: hidden;
}

.leftWrapper {
  background-color: #f4f4f4;
  width: 5.3125rem;
  flex: 0 0 5.3125rem;
}

.categoryItem {
  padding: 0.75rem 0;
  border-bottom: solid 0.01rem #e8e9e8;
  border-left: solid 0.1875rem transparent;
  position: relative;
}

.categoryItem .textWrapper {
  line-height: 1.25rem;
  padding: 0.3125rem 0.6875rem;
  font-size: 0.8125rem;
  color: #666666;
}

.categoryItem.selected {
  background: #fff;
  border-left-color: #3cb963;
}

.categoryItem.selected .textWrapper {
  font-weight: bold;
  font-size: 0.875rem;
  color: #333333;
}
.rightWraper {
  text-align: left;
  font-size: 0.8rem;
  width: calc(100% - 5.3125rem);
  max-height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
