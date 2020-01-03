<!-- 返回顶部 -->
<template>
<div id='back_to_top'>
    <div class="scrollTop" v-show='showTop' @click='backToTop'>
        <svg-icon iconClass='backtotop' style="width:2.5rem;height:2.5rem"></svg-icon>
    </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
    scrollTop:0,
    dParams:20,
    scrollState:0,
    time:0
};
},
//监听属性 类似于data概念
computed: {
    showTop(){
        return (this.scrollTop >200?true:false)
    }
},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    //获取滚动距离
getScrollTop(){
    let scrollTopE = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    this.scrollTop = scrollTopE;
},
// 返回顶部
backToTop(e){
    if(!!this.scrollState){
        return;
    }
    this.scrollState =1;
    e.preventDefault();
    let _this =this;
    this.time = setInterval(function(){_this.goToTop(_this.scrollTop - _this.dParams)},10)
},
goToTop(dis){
    this.dParams +=20;
    dis = dis>0?dis:0;
    document.documentElement.scrollTop = document.body.scrollTop =window.pageYOffset = dis;
    if(this.scrollTop<10){
        clearInterval(this.time)
        this.dParams=20;
        this.scrollState =0;
    }
}
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    window.addEventListener('scroll',this.getScrollTop)
},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.scrollTop {
  right: 0;
  position: fixed;
  bottom: 5rem;
  cursor: pointer;
  z-index: 100;
}
</style>