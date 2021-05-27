import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      // component: home_page
      component: () => import('./components/home_page.vue')   // 모듈 import와 컴포넌트 등록을 한줄로 해결
    },
    {
      path: '/camera',
      name: 'camera_page',
      component: () => import('./views/camera_page.vue')
    },
    {
      path: '/info',
      name: 'info_page',
      component: () => import('./views/info_page.vue')
    },
    {
      path: '/post',
      name: 'post_page',
      component: () => import('./views/post_page.vue')
    },
  ]
})
