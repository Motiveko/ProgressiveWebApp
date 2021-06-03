import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'subscribe_page',
    component: () => import('/.components/subscribe_page')
  },
  {
    path: '/pushnotify',
    name: 'pushnotify_page',
    component: () => import('/.components/pushnotify_page')
  }
]

const router = new VueRouter({
  routes
})

export default router
