<template>
    <v-container flow>
        <v-row>
            <v-col cols="12" class="text-center my-5">
                <h1 class="display-1">회원가입 페이지</h1>
            </v-col>
        </v-row>
        <v-row>
            <!-- xs : 2 8 2, sm이상 : 3 6 3 -->
            <v-col class="text-center" cols="8" offset="2" sm="6" offset-sm="3">
                <!-- .prevent로 submit시 페이지 새로고침 되지 않음 -->
                <form @submit.prevent="fnRegisterUser">
                    <v-text-field name="Email" label="이메일" type="email" v-model="sEmail" required></v-text-field>
                    <v-text-field name="Password" label="비밀번호" type="password" v-model="sPassword" required></v-text-field>
                    <!-- rules attribute를 이용해 비밀번호 확인이 맞는지 검사, rules는 array로 선언해야하므로 []에 넣는다 -->
                    <v-text-field 
                        name="ConfirmPassword" 
                        label="비밀번호 확인" 
                        type="password" 
                        v-model="sConfirmPassword" 
                        required
                        :rules="[fnComparePassword]"
                    ></v-text-field>
                    <v-btn type="submit" v-if="!fnGetLoading" color="orange" dark>회원가입</v-btn>
                    <v-progress-circular
                        v-if="fnGetLoading"
                        indeterminate
                        :width="7"
                        :size="70"
                        color="grey lighten-1"
                    ></v-progress-circular>
                    <v-alert type="error" dismissible v-model="bAlert">
                        {{ fnGetErrMsg }}
                    </v-alert>
                </form>
            </v-col>
        </v-row>
    </v-container>    
</template>

<script>
export default {
    data() {
        return {
            bAlert: false,
            sEmail: '',
            sPassword: '',
            sConfirmPassword: ""
        }
    },
    computed: {
        fnComparePassword() {
          if( this.sPassword == this.sConfirmPassword )return true;
          else return "비밀번호가 일치하지 않습니다!"   // 이 값을 에러메세지로 표시해준다.
        },
        fnGetErrMsg() {
            return this.$store.getters.fnGetErrorMessage;
        },
        fnGetLoading() {
            return this.$store.getters.fnGetLoading
        }
    },
    methods: {
        fnRegisterUser() {
            if(this.fnComparePassword == true) {
                this.$store.dispatch("fnRegisterUser", {
                    pEmail: this.sEmail,
                    pPassword: this.sPassword
                })
            }
        }
    },
    // watch : data, computed등의 값들을 모니터링
    watch: {
        // computed의 fnGetLoading()가 값을 반환하면 watch속성에 정의된 같은 함수명의 매개변수에 전달된다.
        fnGetErrMsg(pMsg) {
            // 에러메시지 있으면 alert창 표시
            if(pMsg) this.bAlert = true
        },
        // data의 bAlert 변수값이 watch속성의 bAlert()에서 모니터링된다. 변수값이 변경되면 bAlert()의 매개변수에 전달된다
        bAlert(pValue) {
            // 에러없으면 에러메시지 초기화
            if(pValue == false) this.$store.commit("fnSetErrorMessage", "")
        }
    }
}
</script>

<style>

</style>