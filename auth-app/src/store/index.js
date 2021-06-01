import Vue from 'vue'
import Vuex from 'vuex'

import VuexPersistence from 'vuex-persist'

import modProvider from '../store-mod/provider'
import modCommon from '../store-mod/common'

Vue.use(Vuex)

export default new Vuex.Store({
  // vuex를 모듈별로 분리
  modules: {
    // 시간지연, 에러메시지 처리등 공통내용
    common: modCommon,
    // 구글 오픈 로그인, 이메일 처리
    provider: modProvider
  },
  plugins: [(new VuexPersistence({
    storage: window.localStorage
  })).plugin]
})
