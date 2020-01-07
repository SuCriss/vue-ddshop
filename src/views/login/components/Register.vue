<!-- 注册页面 -->
<template>
  <div id="register">
    <van-cell-group>
      <van-field
        v-model="phone"
        required
        clearable
        label="手机号"        
        placeholder="请输入手机号"
        maxlength="11"
        :error-message="phoneNumRight ? '' : '请输入正确的手机号'"
        @focus="changeImageUrl(0)"
        @blur="normalImageUrl"
      />

      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
         @focus="changeImageUrl(1)"
        @blur="normalImageUrl"
        required
      />
    </van-cell-group>
     <van-button type="primary" class="login_btn" size="large">注册</van-button>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { Toast, Field, Cell, CellGroup,Button } from "vant";
import {mapMutations} from 'vuex'
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    [Field.name]: Field,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]:Button
  },
  data() {
    //这里存放数据
    return {
        phone:'',
        password:''
    };
  },
  //监听属性 类似于data概念
  computed: {
      phoneNumRight(){
          let value = this.phone;
          if(value>10){
              return /[1][3,4,5,6,7,8][0-9]{9}$/.test(value)
          }else{
              return true
          }
      }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
      ...mapMutations('moduleA',{
          changeImageUrl:'getImageUrl',
          normalImageUrl:'normalImageUrl'
      })
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
#register{
    text-align: left;
    .login_btn {
    margin-top: 1rem;
  }
}
</style>
