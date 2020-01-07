import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './icons/index'
import './utils/filter'
import './utils/webAppConsole'
import FastClick from 'fastclick'
import VTop from './components/backtotop/backtotop'
import Loading from './components/loading'
import { Lazyload } from 'vant';
import {get, post, put} from './config/http'
import api from './config/api'
import 'reset-css'
import './style/css/common.less'


// 解决移动端点击延迟200毫秒的问题
if('addEventListener' in document){
  document.addEventListener('DOMContentLoaded',function(){
    FastClick.attach(document.body)
  },false)
}
Vue.use(Lazyload)
Vue.component('Loading',Loading)
// 注册为全局组件
Vue.component('v-top', VTop);
Vue.config.productionTip = false
Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$put = put;
Vue.prototype.$api = api;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
