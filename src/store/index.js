import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
let ms = require.context('./modules/',true,/\.index.js$/)
let modules={}
ms.keys().forEach(k => {
  console.log(ms(k))
  let n = k.split('/')[1]
  modules[n] = ms(k).default
});


const store =  new Vuex.Store({
  modules
})
export default store
