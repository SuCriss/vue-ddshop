import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home/Home.vue";
import dashboard from "../views/dashboard/dashboard.vue";
import Category from '../views/category/category'
import GoodsDetail from '../views/goodsDetail/goodsDetail'
import Maps from "../views/home/components/map/map.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    // 是否数据缓存
    meta: {
      keepAlive: true
    }
  },
  {
    // 根页面
    path: "/dashboard",
    name: "dashboard",
    component: dashboard,
    children: [
      {
        path: "/dashboard",
        redirect: "/dashboard/home",
        meta: {
          keepAlive: true
        }
      },
      {
        path: "home",
        name: "home",
        component: Home,
        meta: {
          keepAlive: true
        }
      },
      {
        // 分类
        path:'category',
        name:'category',
        component:Category,
        meta:{
          keepAlive:true
        }
      },
      {
        path: "map",
        name: "map",
        component: Maps
      }
    ]
  },
  {
    path:'/goodsDetail',
    name:'goodsDetail',
    component:GoodsDetail
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/login/login.vue")
  }
];

const router = new VueRouter({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        x: 0,
        y: 0
      };
    }
  },
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
