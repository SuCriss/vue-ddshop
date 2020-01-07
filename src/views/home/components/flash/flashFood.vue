<!-- 限时抢购商品 -->
<template>
  <div id="flashFood">
    <div class="flashFoodItem clear">
      <ul class="itemContainer clear" ref="ulContainer">
        <li
          class="flash_food"
          ref="foodItem"
          v-for="(food, index) in flash_sale_product_list"
          :key="index"
        >
          <img v-lazy="food.small_image" alt="" class="foodImage" />
          <span class="title">{{ food.name }}</span>
          <div class="price">
            <p class="nowPrice">{{ food.price | moneyFormat }}</p>
            <p class="originPrice">{{ food.origin_price | moneyFormat }}</p>
            <div class="buyCar" @click.stop="addToCart(food, index)">
              <svg-icon
                iconClass="car"
                style="width:1.3rem;height:1.3rem;"
              ></svg-icon>
            </div>
          </div>
        </li>
      </ul>
      <transition
        appear
        @beforeEnter="beforeEnter"
        @afterEnter="afterEnter"
        v-for="(item, index) in showMoveDot"
        :key="index"
      >
        <div class="move_dot" ref="ball" v-if="item">
          <img :src="dropImage" alt="" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import BScroll from "better-scroll";
import { mapState, mapMutations } from "vuex";
import { ADD_TO_CART } from "../../../../utils/pubsub_type";
export default {
  props: {
    flash_sale_product_list: Array
  },
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      showMoveDot: [],
      dropImage: "",
      elLeft: 0,
      elTop: 0
    };
  },
  //监听属性 类似于data概念
  computed: {
    ...mapState("public", ["userInfo"])
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    ...mapMutations("public", ["ADD_TO_CART"]),
    addToCart(food, num) {
      this.ADD_TO_CART(food);
      if (!this.userInfo.token) {
        //测试
        console.log(event.target)
        //   获取商品图片
        this.dropImage = food.small_image;
        //   添加到购物车
        this.elLeft = event.target.getBoundingClientRect().left;
        this.elTop = event.target.getBoundingClientRect().top;
        this.showMoveDot = [...this.showMoveDot, true];
      }
    },
    beforeEnter(el) {
      //设置transform值
      el.style.transform = `translate3d(${this.elLeft - 30}px,${this.elTop -
        100}px,0)`;
      // 设置透明度
      el.style.opcaity = 0;
    },
    afterEnter(el) {
      //获取底部购物车徽标位置
      const badgePosition = document
        .getElementById("buycar")
        .getBoundingClientRect();
      // 设置transform
      el.style.transform = `translate3d(${badgePosition.left +
        10}px,${badgePosition.top - 30}px,0)`;
      // 加入贝塞尔曲线
      el.style.transition = "transform .88s cubic-bezier(0.3,-0.25,0.7,-0.15)";
      el.style.transition = "transform .88s linear";
      this.showMoveDot = this.showMoveDot.map(item => false);
      // 设置透明度
      el.style.opcaity = 1;
      // 监听小球动画结束方法
      el.addEventListener("transitionend", () => {
        el.style.display = "none";
        this.listenerInCart();
      });
      el.addEventListener("webkitAnimationEnd", () => {
        el.style.display = "none";
        this.listenerInCart();
      });
    },
    listenerInCart() {
      document.getElementById("buycar").classList.add("moveToCart");
      setTimeout(() => {
        document.getElementById("buycar").classList.remove("moveToCart");
      }, 500);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.dropBalls = [];
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.$nextTick(() => {
      let contentWraperWidth = 0; //初始化容器宽度
      let el = this.$refs.foodItem;
      if (el) {
        for (let i = 0; i < el.length; i++) {
          contentWraperWidth += el[i].clientWidth;
        }
      }
      // 设置ul宽度
      this.$refs.ulContainer.style.width = contentWraperWidth + "px";
      if (!this.scroll) {
        this.scroll = new BScroll(".flashFoodItem", {
          probeType: 3,
          startX: 0,
          click: true,
          scrollX: true,
          scrollY: false,
          eventPassthrough: "vertical"
        });
      } else {
        this.scroll.refresh();
      }
    });
  },
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
#flashFood {
  .flashFoodItem {
    width: 100%;
    overflow: hidden;
    position: relative;
    .move_dot {
      position: fixed;
      z-index: 100;
      top: 1rem;
      height: 2rem;
      width: 2rem;
      border-radius: 50%;
      img {
        animation: mymove 0.9s ease-in-out;
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
      }
    }
  }
  .itemContainer {
    display: flex;
    width: 100%;
    overflow: hidden;
    justify-content: flex-start;
  }
  .flash_food {
    flex: 0 0 5.5rem;
    align-items: center;
    box-sizing: border-box;
    padding-right: 0.5rem;
    .foodImage {
      width: 100%;
      border-radius: 50%;
      background: url("../../../../images/placeholderImg/product-img-load.png");
      background-size: contain;
    }
    .title {
      padding: 0.2rem;
      font-size: 0.65rem;
      height: 1.8rem;
      line-height: 1rem;
      word-break: break-all;
      overflow: hidden;
      width:100%;
      display: -webkit-box;
      text-overflow: ellipsis;
      line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    .price {
      position: relative;
      padding-left: 0.5rem;
      .nowPrice {
        color: #f37078;
        font-size: 0.7rem;
      }
      .originPrice {
        font-size: 0.6rem;
        color: #999;
        text-decoration: line-through;
      }
      .buyCar {
        position: absolute;
        right: -10px;
        top: 0;
        width: 1.5rem;
        height: 1.5rem;
      }
    }
  }
  @keyframes mymove {
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(0.8);
    }
    50% {
      transform: scale(0.6);
    }
    75% {
      transform: scale(0.4);
    }
    100% {
      transform: scale(0.2);
    }
  }
  @-moz-keyframes mymove {
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(0.8);
    }
    50% {
      transform: scale(0.6);
    }
    75% {
      transform: scale(0.4);
    }
    100% {
      transform: scale(0.2);
    }
  }
  @-webkit-keyframes mymove {
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(0.8);
    }
    50% {
      transform: scale(0.6);
    }
    75% {
      transform: scale(0.4);
    }
    100% {
      transform: scale(0.2);
    }
  }
  @-o-keyframes mymove {
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(0.8);
    }
    50% {
      transform: scale(0.6);
    }
    75% {
      transform: scale(0.4);
    }
    100% {
      transform: scale(0.2);
    }
  }
}
</style>
