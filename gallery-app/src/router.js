import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home_page',
      // component: home_page
      component: () => import('./components/home_page.vue')   // 모듈 import와 컴포넌트 등록을 한줄로 해결
    },
    {
      path: '/camera',
      name: 'camera_page',
      component: () => import('./components/camera_page.vue')
    },
    {
      path: '/info',
      name: 'info_page',
      component: () => import('./components/info_page.vue')
    },
    {
      path: '/post',
      name: 'post_page',
      component: () => import('./components/post_page.vue')
    },
  ]
})
