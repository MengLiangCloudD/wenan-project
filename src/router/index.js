import Vue from 'vue'
import VueRouter from 'vue-router';

Vue.use(VueRouter)

const routes = [
  //首页
  {
    path: "/",
    name: "home",
    component: resolve=>(require(["@/components/home"],resolve)),
  },
  {
    path: "/list",
    name: "list",
    component: resolve=>(require(["@/components/list"],resolve)),
  },
  {
    path: "/pay",
    name: "pay",
    component: resolve=>(require(["@/components/pay"],resolve)),
  },
  {
    path: "/listInfo",
    name: "listInfo",
    component: resolve=>(require(["@/components/listInfo"],resolve)),
  },
  
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
