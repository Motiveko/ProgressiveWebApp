import firebase from 'firebase/app'
import "firebase/firebase-auth"
import router from "@/router"

export default ({
  state: {
    oUser: null
  },
  mutations: {
    fnSetUser(state, payload) {
      state.oUser = payload
    }
  },
  getters: {
    fnGetUser() {
      return state.oUser
    },
    fnGetAuthStatus(state) {
      return state.oUser != null
    }
  },
  actions: {
    // 이메일,비번으로 회원가입
    fnRegisterUser({ commit }, payload) {
      commit("fnSetLoading", true)

      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.pEmail, payload.pPassword)
        .then(pUserInfo => {
          // 신규 회원 이메일 정보를 스토어에 저장
          commit("fnSetUser", {
            email: pUserInfo.email
          });
          commit("fnSetLoading", false)
          commit("fnSetErrorMessage", "")
          router.push("/main")
        })
        .catch(err => {
          commit("fnSetErrorMessage", err.message)
          commit("fnSetLoading", false)
        })
    },
    // 파이어베이스를 이용한 이메일 회원 로그인
    fnDoLogin({ commit }, payload) {
      commit("fnSetLoading", true)

      firebase
        .auth()
        .signInWithEmailAndPassword(payload.pEmail, payload.pPassword)
        .then(pUserInfo => {
          commit("fnSetUser", {
            id: pUserInfo.uid,
            name: pUserInfo.displayName,
            email: pUserInfo.email,
            photoURL: pUserInfo.photoURL
          })
          commit("fnSetLoading", false)
          commit("fnSetErrorMessage", "")
          router.push("/main")          
        })
        .catch(err => {
          commit("fnSetErrorMessage", err.message)
          commit("fnSetLoading", false)
        })        
    },
    fnDoGoogleLogin_Popup({ commit }) {
      commit("fnSetLoading", true)
      
      // 파이어베이스에 구글 로그인 인증 처리 요청

      // 로그인 제공자 객체를 생성
      var oProvider = new firebase.auth.GoogleAuthProvider();
      // 오픈 계정의 범위 설정 -> 유저의 profile과 이메일 가져와도 되겠습니까?
      oProvider.addScope("profile")
      oProvider.addScope("email")

      firebase
        .auth()
        .signInWithPopup(oProvider)
        .then(pUserInfo => {
          commit("fnSetUser", {
            id: pUserInfo.uid,
            name: pUserInfo.displayName,
            email: pUserInfo.email,
            photoURL: pUserInfo.photoURL
          });
          commit("fnSetLoading", false)
          commit("fnSetErrorMessage", "")
          router.push("/main")  
        })
        .catch(err => {
          commit("fnSetErrorMessage", err.message)
          commit("fnSetLoading", false)
        })
    },
    // 자동 로그인 처리
    fnDoLoginAuto({ commit }, pUserInfo) {
      commit("fnSetLoading", true)
      commit("fnSetUser", {
        id: pUserInfo.uid,
        name: pUserInfo.displayName,
        email: pUserInfo.email,
        photoURL: pUserInfo.photoURL
      });      
      commit("fnSetLoading", false)
      commit("fnSetErrorMessage", "")      
    },
    fnDoLogout({ commit }) {
      // 파이어에비으세 로그아웃 요청
      // TODO : 이 api가 알아서 브라우저나 기기를 식별해 로그아웃 시킨다는것이겠지?
      // 로그인도 마찬가지로 로그인 호출시 브라우저, 기기 등을 식별해서 로그인?
      firebase.auth().signOut();
      commit("fnSetUser", null)
      router.push("/")
    },
  }
})