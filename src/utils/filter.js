import Vue from 'vue'
//过滤金额格式
Vue.filter('moneyFormat',(money)=>{
    if(!money) return ''
    return '¥' + Number(money).toFixed(2)
})
//过滤时间格式
Vue.filter('timeFormat',(value)=>{
    if(!value && isNaN(value)) return
    return value<10?'0'+value:value
})