import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'

import {rtdbPlugin} from 'vuefire'

Vue.config.productionTip = false
Vue.use(rtdbPlugin)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
