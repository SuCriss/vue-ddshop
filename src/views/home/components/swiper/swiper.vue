<!-- 轮播 -->
<template>
  <div id="swiper">
    <van-swipe id="swipe" :autoplay="3000">
      <van-swipe-item v-for="(item, index) in swipe_list" :key="index">
        <img v-lazy="item.icon_url" :alt="item.public_name" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { Swipe, SwipeItem } from "vant";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  props: {
    // 接受父组件传过来的数据
    swipe_list: Array
  },
  data() {
    //这里存放数据
    return {
        
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
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
<style scoped>
#swipe {
  padding-top: 6rem;
  width: 95%;
  height: 10rem;
  margin: auto;
  border-radius: 1rem;
}
#swipe img {
  width: 100%;
  height: 100%;
}
/*
穿透修改样式
*/
#swipe >>> .swiper-pagination-bullet-active {
  background-color: #75a342;
}

#swipe >>> .swiper-pagination-bullet {
  width: 0.3rem;
  height: 0.3rem;
  border-radius: 0;
}
</style>
