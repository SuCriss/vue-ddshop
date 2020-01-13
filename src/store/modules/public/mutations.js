import {
  getLocalStore,
  setLocalStore,
  removeLocalStore
} from "../../../utils/global";
import { ADD_TO_CART } from "../../../utils/pubsub_type";
import { Toast } from "vant";
import router from "@/router/index";
import { ADD_FOODS,INIT_SHOP_CART } from "./mutation-type";
const mutations = {
  // 加载等待框
  toggleLoading(state, flag) {
    state.isShowLoading = flag;
  },
  // 设置token
  setToken(state, token) {
    state.token = token;
  },
  // 添加商品到购物车
  [ADD_FOODS](state, { foodID, foodName, smallImage, foodPrice }) {
    let shopCart = state.shopCart;
    if (shopCart[foodID]) {
      shopCart[foodID]["num"]++; //商品加一
    } else {
      shopCart[foodID] = {
        id: foodID,
        name: foodName,
        price: foodPrice,
        smallImage: smallImage,
        checked: true,
        num: 1
      };
      // shopCart重新复赋值
      state.shopCart = {
        ...shopCart
      };
    }
    setLocalStore("shopCart", state.shopCart);
  },
  // 添加商品到购物车
  [ADD_TO_CART](state, food) {
    if (!state.userInfo.token) {
      //测试，实际应客户登录后才能进行添加商品到购物车的操作
      setTimeout(() => {
        this.commit("public/ADD_FOODS", {
          foodID: food.id,
          foodName: food.name,
          smallImage: food.small_image,
          foodPrice: food.price
        });
        Toast.success({
          message: "成功加入购物车",
          duration: 800,
          forbidClick: true
        });
      }, 500);
    } else {
      router.push("/login");
    }
  },
    // 2.页面初始化,获取本地购物车的数据
    [INIT_SHOP_CART](state) {
      // 2.1 先存本地取购物车数据
      let initShopCart = getLocalStore('shopCart');
      if (initShopCart) {
          // 2.1 如何购物车有数据那么就把它通过对象的方式赋值给store
          state.shopCart = JSON.parse(initShopCart);
      }
  },
};
export default mutations;
