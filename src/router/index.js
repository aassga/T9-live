import Vue from 'vue'
import VueRouter from 'vue-router'
import Router from 'vue-router'
import Lobby from '../views/Lobby/Lobby.vue'

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
  {
    path: "/Loading",
    name: "Loading",
    component: () => import(/* webpackChunkName: "Loading" */ '@/views/Loading/Loading.vue'),
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login/Login.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: Lobby
  },
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
