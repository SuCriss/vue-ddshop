import QS from 'qs'
// 不同环境对应的借口
const PRODUCTION_URL = 'http://172.20.10.6:8080/api/';
const DEVELOPMENT_URL = 'http://localhost:8080/api/'
// const DEVELOPMENT_URL = 'http://api.7-orange.cn:7300/mock/5def6a2d448e330a1116366e/api/';
console.log(process.env.NODE_ENV)
// 不同环境ajax请求前缀设置
const baseURL = process.env.NODE_ENV === 'production'?PRODUCTION_URL:DEVELOPMENT_URL;

const config = {
    // baseURL
    baseURL:baseURL,
    // 设置超时时间
    timeout:50000,
    // 返回数据类型
    responseType:'json',//default
    url:'/',

    // 请求方法
    method:'get',//default

    //发送请求之前对数据进行处理，比如form-data格式化等
    transformRequest:[function(data){
        data = QS.stringify(data)
        return data;
    }],
    //响应返回之前对数据进行处理
    transformResponse:[function(data){
        if(typeof data ==='string'){
            data = JSON.parse(data)
        }
        return data;
    }],

    // 请求头信息
    headers:{
        // "Content-Type":"application/x-www-form-urlencoded",
        // "Token":"",
        "Access-Control-Allow-Origin":"*",
        "Content-Type":"application/json"
    },
    // 请求参数
    params:{},

    //post请求参数，axios.post(url,{},data)
    data:{},

    // 跨域携带cookie
    withCreentials:true
}
export default config;