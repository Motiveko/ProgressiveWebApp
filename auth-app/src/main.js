import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import firebase from 'firebase/app'
import '@/datasources/firebase'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  // 앱 최초 실행 시
  created() {
    // 사용자가 로그아웃, 비밀번호변경 등을 처리했을 경우
    firebase.auth().onAuthStateChanged(pUserInfo => {
      // 사용자가 이미 로그인되어있으면 vuex에 상태값 저장
      if(pUserInfo) {
        store.dispatch('fnDoLoginAuto', pUserInfo)
      }
    })
  },
  render: h => h(App)
}).$mount('#app')
