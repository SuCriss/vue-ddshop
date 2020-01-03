<!-- 登录页面内容 -->
<template>
  <div id="logincontent">
    <van-cell-group v-if="isShowMSlogin">
      <van-field
        v-model="phone"
        required
        clearable
        label="手机号"
        maxlength="11"
        :error-message="phoneNumRight ? '' : '请输入正确的手机号'"
        placeholder="请输入手机号码"
      />

      <van-field
        v-model="vailicode"
        label="请输入验证码"
        placeholder="验证码"
        required
      >
        <van-button
          :disabled="phoneChecked"
          slot="button"
          size="small"
          @click="sendVerifyCode"
          type="primary"
          >发送验证码</van-button
        >
      </van-field>
    </van-cell-group>
    <van-cell-group v-if="!isShowMSlogin">
      <van-field
        v-model="phone"
        required
        clearable
        label="手机号"
        maxlength="11"
        :error-message="phoneNumRight ? '' : '请输入正确的手机号'"
        @focus="changeImageUrl(0)"
        @blur="normalImageUrl"
        placeholder="请输入手机号码"
      />

      <van-field
        v-model="vailicode"
        type="password"
        label="密码"
        placeholder="请输入密码"
        @focus="changeImageUrl(1)"
        @blur="normalImageUrl"
        required
      >
      </van-field>
      <van-field
        v-model="imgCaptcha"
        center
        clearable
        maxlength="4"
        placeholder="请输入验证码"
      >
        <img
          class="verificationImage"
          :src="valiSrc"
          alt="captcha"
          @click.prevent="getCaptcha"
          ref="imgCaptcha"
          slot="button"
        />
      </van-field>
    </van-cell-group>
    <van-button type="info" class="login_btn" size="large">登录</van-button>
    <div class="switchLoginWay" @click="switchLoginWay">
      {{ isShowMSlogin ? "账号密码登录" : "短信验证码登录" }}
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {
  Field,
  Cell,
  Divider,
  CellGroup,
  Button,
  Toast,
  Grid,
  GridItem
} from "vant";
import { mapMutations, mapState } from "vuex";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    [Cell.name]: Cell,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [Divider.name]: Divider,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem
  },
  data() {
    //这里存放数据
    return {
      vailicode: "",
      phone: "",
      valiSrc:'http://demo.itlike.com/web/xlmc/api/captcha?time='+ new Date(),
      isShowMSlogin: true,
      imgCaptcha: ""
    };
  },
  //监听属性 类似于data概念
  computed: {
    phoneNumRight() {
      let value = this.phone;
      if (value.length > 10) {
        return /[1][3,4,5,6,7,8][0-9]{9}$/.test(value);
      } else {
        return true;
      }
    },
    phoneChecked() {
      if (this.phone.length > 10 && this.phoneNumRight) {
        return false;
      } else {
        return true;
      }
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    ...mapMutations("moduleA", {
      changeImageUrl: "getImageUrl",
      normalImageUrl: "normalImageUrl"
    }),
    //发送验证码
    sendVerifyCode() {
      Toast.success({
        message: "发送验证码成功",
        duration: 800,
        forbidClick: true
      });
    },
    //切换登录方式
    switchLoginWay() {
      let _this = this;
      _this.isShowMSlogin = !_this.isShowMSlogin;
    },
    // 3.账号密码登录切换图片验证码
    getCaptcha() {
      // 获取验证码的标签
      let captchaEle = this.$refs.imgCaptcha;
      this.$set(
        captchaEle,
        "src",
        "http://demo.itlike.com/web/xlmc/api/captcha?time=" + new Date()
      );
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
#logincontent {
  text-align: left;
  .login_btn {
    margin-top: 1rem;
  }
  .switchLoginWay {
    padding: 0.8rem 0;
    font-size: 0.9rem;
    font-weight: 700;
  }
  .verificationImage {
    position: absolute;
    right: 0;
    width: 8rem;
    height: 3rem;
    bottom: -7px;
    margin-left: 3rem;
  }
}
</style>
