<!-- 头部 -->
<template>
  <div class="wrapper" :style="showBackColor?'background-color:white;':''">
    <div class="locationWrapper" ref="location">
    <svg viewBox="0 0 30 30"
           class="icon iconLocation">
        <path fill="#FFFFFF"
              fill-rule="evenodd"
              d="M14.521 30.445c.817.738 2.142.75 2.958 0 0 0 11.521-9.82 11.521-17.158C29 5.95 23.18 0 16 0S3 5.949 3 13.287c0 7.339 11.521 17.158 11.521 17.158zM16 18a5 5 0 1 0 0-10 5 5 0 0 0 0 10z"></path>
      </svg>
      <router-link to="/dashboard/map" tag="span" class="address">{{location}}</router-link>
    </div>
    <div class="searchWrapper"
         ref="search"
         @click="goSearch">
      <div class="searchContent">
        <div class="iconSearchWrapper">
          <svg viewBox="0 0 32 32"
               class="icon iconSearch">
            <path fill="#999"
                  fill-rule="evenodd"
                  d="M23.624 21.503c3.47-4.51 3.14-11.003-.992-15.135-4.491-4.49-11.773-4.49-16.264 0-4.49 4.491-4.49 11.773 0 16.264 4.132 4.131 10.625 4.462 15.135.992l4.66 4.66a1.5 1.5 0 1 0 2.121-2.121l-4.66-4.66zm-3.114-.993A8.5 8.5 0 1 0 8.49 8.49a8.5 8.5 0 0 0 12.02 12.02z"></path>
          </svg>
        </div>
        <span class="searchPrompt">输入商品名称</span>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {Toast} from 'vant'
import PubSub from 'pubsub-js'
import { LOCATION_ADDRESS } from '../../../../utils/pubsub_type'
import { getLocalStore } from '../../../../utils/global'
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
        showBackColor:false,
        location: getLocalStore('userLocation') || '请选择位置'
    };
  },
  //监听属性 类似于data概念
  computed: {
     
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 滚动到某个位置时头部背景变色
      handleScroll(){
          let _this = this;
        //   垂直盾冬的值兼容问题
        let scrollTopE = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        let screenHeight = window.screen.availHeight;
        scrollTopE > 168?_this.showBackColor=true:_this.showBackColor=false
      },
      goSearch(){
        Toast({
          message:'未实现',
          duration:800,
          forbidClick:true
        })
      }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
      let _this = this;
      _this.$nextTick(()=>{
          window.addEventListener('scroll',_this.handleScroll)
      });
     PubSub.subscribe(LOCATION_ADDRESS, (msg, data) => {
      if (msg == LOCATION_ADDRESS) {
        _this.location = data;
      }
    })
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy () {
    // 移除监听事件
    window.removeEventListener('scroll', this.handleScroll);
    // 移除通知时间
    PubSub.subscribe(LOCATION_ADDRESS);
  }, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.wrapper {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;
  height: 3.125rem;
  line-height: 3.125rem;
  width: 100%;
  box-sizing: border-box;
  border-top: solid 1px #eeeeee;
  color: white;
  display: flex;
}
.iconLocation {
  position: absolute;
  left: 0.3rem;
  top: 1.0625rem;
  width: 1.875rem;
  height: 1rem;
  vertical-align: middle;
}

.hidden {
  display: none;
}

// 地址框
.locationWrapper {
  margin-top: 0.6rem;
  height: 1.875rem;
  line-height: 1.875rem;
  max-width: 55%;
  white-space: nowrap;
  opacity: 0.6;
  min-width: 23%;
  background-color: black;
  border-radius: 3.125rem;
  flex: 0, 0, 20rem;
}
.locationWrapper .address {
  padding-left: 0.8rem;
  display: inline-block;
  font-size: 0.8rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 70%;
  min-width: 20%;
  vertical-align: middle;
}
.locationWrapper .iconArrow {
  vertical-align: middle;
}

.locationWrapper.wheel {
  opacity: 0;
  -webkit-transition: opacity 1.2s;
  transition: opacity 1.2s;
}

// 搜索框
.searchWrapper {
  flex: 1;
  top: 0.625rem;
  height: 3.125rem;
  line-height: 3.125rem;
}

.searchWrapper.wheel {
  width: 96%;
  -webkit-transition: width 1s ease 0.2s;
  transition: width 1s ease 0.2s;
}

.searchContent {
  margin-top: 0.625rem;
  flex: 1;
  margin-right: 2%;
  margin-left: 2%;
  border-radius: 3.125rem;
  height: 1.875rem;
  line-height: 1.875rem;
  text-align: center;
  background: #f2f2f2;
  vertical-align: middle;
}

.iconSearchWrapper {
  display: inline-block;
  width: 1.25rem;
  height: 100%;
  vertical-align: middle;
}

.iconSearch {
  margin-top: 0.3125rem;
  width: 1.25rem;
  height: 1.25rem;
}

.searchPrompt {
  display: inline-block;
  vertical-align: top;
  margin-left: 0.25rem;
  text-align: center;
  font-size: 0.875rem;
  color: #999999;
}
.icon {
  fill: #999;
  width: 1rem;
  height: 1rem;
}
</style>
