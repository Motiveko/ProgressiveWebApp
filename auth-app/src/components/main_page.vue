<template>
  <v-contatiner>
    <v-row>
      <v-col xs="12" class="mt-5 text-center">
        <h1 class="display-1 my-1">로그인 후 화면 페이지</h1>
        <p class="body-1">로그인을 통해 인증된 사용자가 방문한 페이지입니다.</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col dark offset="1" cols="10" class="mt-5 text-center">
        <!-- 구글 로그인의 경우 사진 이미지 정보 표시 -->
        <img v-if="fnGetUser.photoURL" :src="fnGetUser.photoURL" class="avatar_style" alt />
        <h3 class="pt-2 mt-4 grey lighten-2">{{ fnGetUser.name }}</h3>
        <p class="pb-2 grey lighten-2">{{ fnGetUser.email }}</p>
      </v-col>
      <v-col offset="3" cols="6" class="text-center mt-1">
        <v-btn @click="fnSendPasswordReset" block color="orange" large dark>
          <v-icon left>mdi-email</v-icon>비밀번호 재설정
        </v-btn>
      </v-col>
    </v-row>
  </v-contatiner>
</template>

<script>

import { oFirebaseAuth } from '@/datasources/firebase'

export default {
  computed: {
    fnGetUser() {
      // this.$store.getters.fnGetUser : Observer 를 바로 return하면 안된다. 왜그럴까?
      let oUserInfo = this.$store.getters.fnGetUser
      return oUserInfo;
    }
  },
  methods: {
    fnSendPasswordReset() {
      oFirebaseAuth 
        .sendPasswordResetEmail(this.fnGetUser.email)
        .then(() => {
          alert('비밀번호 재설정 메일을 발송했습니다!')
        })
        .catch(err => {
          alert('비밀번호 재설정 메일 발송 중 오류가 발생했습니다.')
          console.log(err)
        })
    }
  }
}
</script>

<style>
  .avatar_style {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
</style>