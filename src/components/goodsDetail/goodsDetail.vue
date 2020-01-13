<!-- 商品详情页 -->
<template>
  <div id="goodsDetail">
    <van-nav-bar title="商品详情" fixed left-arrow @click-left="onClickLeft" />
    <div class="goodsWrapper">
      <div class="goodsImage">
        <img v-lazy="goodsInfos.small_image" alt="" />
      </div>
      <div class="flashGood" v-if="goodsInfos.isFlash">
        <van-row>
          <van-col span="12" class="flashLeft"
            ><div class="flash">限时抢购<i>抢购中</i></div></van-col
          >
          <van-col span="12" class="flashRight"
            ><div class="end">
              距结束
              <div class="endTime">
                <van-count-down :time="time">
                  <template v-slot="timeData">
                    <span class="item">{{ timeData.hours | timeFormat }}</span
                    >:
                    <span class="item">{{ timeData.minutes | timeFormat }}</span
                    >:
                    <span class="item">{{
                      timeData.seconds | timeFormat
                    }}</span>
                  </template>
                </van-count-down>
              </div>
            </div>
          </van-col>
        </van-row>
      </div>
      <!-- 产品详细信息 -->
      <div class="goods_desc">
        <div class="goods_title">{{ goodsInfos.name }}</div>
        <div class="goods_spec">{{ goodsInfos.spec }}</div>
        <div class="goods_price clear">
          {{ goodsInfos.origin_price | moneyFormat }}
          <i>{{ goodsInfos.price }}</i>
          <span class="already_sales">已售 {{ goodsInfos.total_sales }}</span>
        </div>
        <van-divider />
        <div class="goods_tip">
          <van-icon
            name="cluster-o"
          />此商品按500g/份计价,如实收少于500g将退还差价
        </div>
        <van-divider />
        <div class="goods_tip"><van-icon name="clock-o" />最快29分钟送达</div>
      </div>
    </div>
    <!-- 规格 -->
    <div class="specifications">
      <div class="speci_title">规格</div>
      <van-divider dashed />
      <div class="speciInfo"><span>保存条件</span> <i>冷藏</i></div>
      <van-divider dashed />
      <div class="speciInfo"><span>保质期</span> <i>15天</i></div>
    </div>
    <div class="showGoods">
      <img :src="goodsInfos.small_image" alt="" />
      <img :src="goodsImage" alt="" />
    </div>
    <van-goods-action style="z-index:100">
      <van-goods-action-icon icon="cart-o" :info="goodsNum" text="购物车" @click="goToCart" />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="addToCart(goodsInfos)"
      />
    </van-goods-action>
    <v-top />
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {
  NavBar,
  Divider,
  Row,
  Col,
  CountDown,
  Icon,
  Toast,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton
} from "vant";
import {mapState,mapMutations} from 'vuex'
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    [NavBar.name]: NavBar,
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Divider.name]: Divider,
    [CountDown.name]: CountDown,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [GoodsActionButton.name]: GoodsActionButton
  },
  data() {
    //这里存放数据
    return {
      goodsInfos: this.$route.query,
      time: 1 * 60 * 60 * 1000,
      goodsImage:
        "https:\/\/img.ddimg.mobi\/3f280ff77ab3d1571213379189.jpg?width=750&height=1869"
    };
  },
  //监听属性 类似于data概念
  computed: {
    ...mapState('public',['shopCart']),
    goodsNum(){
      var num = 0;
      Object.values(this.shopCart).forEach((good,index)=>{
        console.log(this.shopCart)
        num +=good.num*1
      });
      console.log(num)
      if(num>0){
        return num
      }
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    ...mapMutations('public',{
      addToCart:'ADD_TO_CART'
    }),
    // 返回
    onClickLeft() {
      this.$router.go(-1);
    },
    goToCart(){
      Toast({
        message:"跳到购物车页面",
        forbidClick:true,
        duration:800
      })
      this.$router.push({ name: 'cart' });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    console.log(this.shopCart);
  },
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
#goodsDetail {
  background: #f5f5f5;
  text-align: left;
  .goodsWrapper {
    width: 100%;
    margin-top: 46px;
    background: #fff;
    text-align: left;
    .goodsImage {
      width: 100%;
      img {
        width: 100%;
      }
    }
    .flashLeft,
    .flashRight {
      height: 2.4rem;
      padding: 0 0.8rem;
      vertical-align: middle;
      line-height: 2.4rem;
      color: #ffffff;
      font-size: 0.825rem;
      background: #e25450;
      i {
        font-size: 0.6rem;
        margin-left: 0.675rem;
      }
    }
    .flashRight {
      background: #fcefe9;
      .end {
        color: #e25450;
      }
      .endTime {
        display: inline-block;
        .item {
          display: inline-block;
          width: 1.4rem;
          margin-right: 0.2rem;
          color: #fff;
          font-size: 12px;
          text-align: center;
          background-color: #e25450;
        }
      }
    }
    .goods_desc {
      padding: 0.5rem;
      .goods_title {
        font-size: 1rem;
        font-weight: 700;
      }
      .goods_spec {
        margin: 0.5rem 0 01rem;
        font-size: 0.8rem;
        color: #999;
      }
      .goods_price {
        color: #e25450;
        i {
          text-decoration: line-through;
          font-size: 0.725rem;
          color: #ccc;
        }
        .already_sales {
          float: right;
        }
      }
      .goods_tip {
        font-size: 0.725rem;
        color: #999;
      }
    }
  }
  .specifications {
    margin-top: 1.215rem;
    background: #fff;
    padding: 0.5rem;
    .speciInfo {
      margin: 0.725rem 0;
      font-size: 0.875rem;
      color: #999;
      span {
        display: inline-block;
        width: 5rem;
      }
      i {
        margin-left: 1.215rem;
      }
    }
  }
  .showGoods {
    margin-top: 1.215rem;
    width: 100%;
    background: #fff;
    img {
      width: 100%;
    }
  }
}
</style>
