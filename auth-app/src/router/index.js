import Vue from 'vue'
import VueRouter from 'vue-router'

import firebase from 'firebase/app'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'start_page',
    component: () => import('./components/start_page.vue')
  },
  {
    path: '/main',
    name: 'main_page',
    component: () => import('./components/main_page.vue'),
    // 메인 페이지는 인증과 연동, bAuth: true는 인증이 필요한 페이지라는 의미
    // meta: { bAuth : true } 
  },
  {
    path: '/login',
    name: 'login_page',
    component: () => import('./components/login_page.vue'),
  },
  {
    path: '/register',
    name: 'register_page',
    component: () => import('./components/register_page.vue'),
  },  
  {
    path: '/*',
    name: 'error_page',
    component: () => import('./components/error_page.vue'),
  },  
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

// 라우터 이동에 개입하여 인증이 필요한 경우 login 페이지로 전환
// router navigation의 글로벌 가드
router.beforeEach((to, from, next) => {
  // 이동하려는 페이지가 인증이 필요하면(bAuth==true) bNeedAuth = true
  const bNeedAuth = to.matched.some( record => record.meta.bAuth )  
  const bCheckAuth = firebase.auth().currentUser 
  if( bNeedAuth && !bCheckAuth ) {
    next('/login')
  } else {
    next()
  }
})

export default router
