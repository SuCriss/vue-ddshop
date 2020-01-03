<!-- 登录页面 -->
<template>
  <div id="login">
    <div class="loginBox">
      <div class="auth-form">
        <div class="panfish">
          <img :src="imageURL" alt="" />
        </div>
        <van-icon class="closeBtn" @click="close" name="close" size="20" />
        <van-tabs v-model="activeName" animated>
          <van-tab title="登录" name="login">
            <Login />
          </van-tab>
          <van-tab title="注册" name="register">
            <Register />
          </van-tab>
        </van-tabs>
        <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
    >
      其他登录方式
    </van-divider>
    <van-grid :border="false" :column-num="2">
      <van-grid-item @click="thirdLogin(0)">
        <svg-icon iconClass='wechat'></svg-icon>
        <div class="title">微信</div>
      </van-grid-item>
      <van-grid-item @click="thirdLogin(1)">
        <svg-icon iconClass='QQ'></svg-icon>
        <div class="title">QQ</div>
      </van-grid-item>
    </van-grid>
    <p class="tips">
    <pre>温馨提示：
  未注册的手机号，登录时将自动注册，
  且代表同意<strong @click="userAggrement">用户协议、</strong><strong @click="privacyPolicy">隐私策略</strong>
    </pre>
    </p>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { Icon, Tab, Tabs,Divider,
  Button,
  Toast,
  Grid,
  GridItem } from "vant";
import Login from './components/LoginBox'
import Register from './components/Register'
import {mapState} from 'vuex'
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    [Icon.name]: Icon,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Divider.name]:Divider,
    [Grid.name]:Grid,
    [GridItem.name]:GridItem,
    Login,
    Register
  },
  data() {
    //这里存放数据
    return {
      activeName: "a"
    };
  },
  //监听属性 类似于data概念
  computed: {
      ...mapState('moduleA',['imageURL'])
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    close() {
      this.$router.back();
    },
    // 第三方登录
    thirdLogin(idx){
      if(idx==0){
        Toast({
          message:'微信登录-未实现'
        })
      }else if(idx==1){
        Toast({
          message:'QQ登录-未实现'
        })
      }
    },
    //用户协议
    userAggrement(){
      Toast({
        message:'用户协议'
      })
    },
    privacyPolicy(){
      Toast({
        message:'隐私策略'
      })
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
#login {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("../../images/login/back2.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
  .loginBox {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    opacity: 0.95;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 600;
  }
  .auth-form {
    position: relative;
    background: #fff;
    width: 26.5rem;
    max-width: 92%;
    border-radius: 8px;
    padding: 2rem;
    box-sizing: border-box;
  }
  img {
    position: absolute;
    top: 1rem;
    left: 50%;
    width: 4rem;
    transform: translate(-50%, -70%);
    z-index: 1;
    @media screen and (max-width: 320px) {
      top: 0.5rem;
      transform: translate(-50%, -40%);
      width: 5rem;
    }
  }
  .closeBtn {
    position: absolute;
    right: 0.8rem;
    top: 0.3rem;
  }
  pre{
    text-align: left;
  }
  .title {
  padding: 0.5rem;
  font-size: 0.5rem;
  color: grey;
}
.svg-icon{
  width: 1.5rem;
  height:1.5rem;
}
strong{
  color: #6565d9;
}
}
</style>
