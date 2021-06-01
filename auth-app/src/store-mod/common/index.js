
export default {
  state: {
    bIsLoading: false,
    sErrorMessage: ''
  },
  mutations: {
    fnSetLoading(state, payload) {
      state.bIsLoading = payload
    },
    fnSetErrorMessage(state, payload) {
      state.sErrorMessage = payload
    }
  },
  getters: {
    fnGetLoading(state) {
      return state.bIsLoading
    },
    fnGetErrorMessage(state) {
      return state.sErrorMessage
    }
  },
  actions: {

  }
}