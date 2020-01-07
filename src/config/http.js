// 配置http

import axios from "axios";
import config from "./config";
import store from "../store/index";
import { Toast } from "vant";
console.log(config)
const instance = axios.create(config);
// const baseUrl = config.baseURL
// http请求拦截器
instance.interceptors.request.use(
  config => {
    // 写入header token
    if (localStorage.getItem("token")) {
      config.headers.Authorization = localStorage.getItem("token");
    }
    // 加载等待层
    showLoading(true);
    return config;
  },
  error => {
    // 关闭等待层
    showLoading(false);
    // 提示错误
    Toast.fail("请求错误");
    return Promise.reject(error);
  }
);

// http响应拦截器
instance.interceptors.response.use(
  res => {
    // 响应成功，关闭loading
    showLoading(false);
    // 对响应数据做处理
    var token = res.headers.Authorization;
    if (token) {
      store.commit("public/setToken", token);
      // 每次请求携带
      localStorage.setItem("token", token);
    }
    if (res.status === 200) {
      const data = res.data;
      // 后台的登录过期接口
      if (data.errorCode === 10000) {
        logout();
      }
    }
    return res;
  },
  err => {
    // 关闭等待层
    showLoading(false);
    switch (err.response.status) {
      case "401":
        Toast.fail("未授权");
        window.location.href = "/login";
        break;
      case "400":
        Toast.fail("参数错误");
        break;
      case "403":
        Toast.fail("登录超时，请重新登录！");
        break;
      case "404":
        Toast.fail("未找到页面！");
        break;
      case "500":
        Toast.fail("服务器异常！");
        break;
      case "504":
        Toast.fail("网关错误！");
        break;
      default:
          Toast.fail('系统发生未知异常，请稍后再试！');
    }
    return Promise.reject(err)
  }
);

// 显示等待层
function showLoading(flag) {
  // public制定具体谁的stores实例这里是public
    store.dispatch("public/toggleLoadingAsyn", flag);
  }
  
  // 退出登录
  function logoutFun() {
    // 清空本地缓存的token和store里的token
    store.commit("setToken", "");
    localStorage.removeItem("token");
    // 跳转至登录页，并携带用户退出时或token失效时的页面路由，方便登录后直接跳转到此页面。
    window.location.herf = "/login";
  }

/**
 * 
 * @param {get 请求url} url 
 * @param {get 请求参数} params 
 */
export function get(url,params={}){
    return new Promise((reslove,reject)=>{
        instance.get(url,{
            params:params
        }).then(res=>{
            reslove(res.data)
        }).catch(err=>{
            reject(err.data)
        })
    })
}
/**
 * 
 * @param {post 请求url} url 
 * @param {post 请求参数} params 
 */
export function post(url,params={}){
    return new Promise((resolve,reject)=>{
        instance.post(url,JSON.stringify(params)).then(res=>{
            resolve(res.data)
        }).catch(err=>{
            reject(err.data)
        })
    })
}

export function put(url,params={}){
    return new Promise((resolve,reject)=>{
        instance.put(url,JSON.stringif(params)).then(res=>{
            resolve(res.data)
        }).catch(err=>{
            reject(err.data)
        })
    })
}

