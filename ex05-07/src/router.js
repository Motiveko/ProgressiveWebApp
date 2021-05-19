import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import Main from './main_page.vue'
import Sub from './sub_page.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/main', component: Main },
    { path: '/sub', component: Sub },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: function () { 
        return import(/* webpackChunkName: "about" */ './views/About.vue')
      }
    }
  ]
})
