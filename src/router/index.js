import Vue from 'vue'
import VueRouter from 'vue-router'
import Router from 'vue-router'
import lobbyRouter from './modules/lobby'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    redirect: "/Loading"
  },
  // {
  //   path: '/',
  //   redirect: "/Lobby"
  // },
  {
    path: "/Loading",
    name: "Loading",
    component: () => import(/* webpackChunkName: "Loading" */ '@/views/Loading/Loading.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login/Login.vue')
  },
  {
    path: '/MemberRule',
    name: 'MemberRule',
    component: () => import(/* webpackChunkName: "MemberRule" */ '../views/MemberRule/MemberRule.vue')
  },
  ...lobbyRouter,
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
