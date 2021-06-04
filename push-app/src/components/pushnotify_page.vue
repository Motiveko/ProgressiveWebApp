<template>
  <v-container>
    <v-row wrap>
      <v-col cols="12" class="text-center">
        <h1 class="display-1">메시지 보내기</h1>
      </v-col>
      <v-col class="my-3" offset="1" cols="10">
        <v-card color="blue-grey lighten-1" dark>
          <v-container class="my-3">
            <v-row>
              <v-col cols="12">
                <v-text-field autofocus name="title" label="제목" type="text" v-model="sTitle" color="white">
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <!-- text-area는 넘치면 스크롤 생긴다. 내용이 많을 때 사용 -->
                <v-textarea rows="3" name="message" label="내용" type="text" v-model="sMsg" color="white">
                </v-textarea>
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
            <v-btn block large color="orange" dark @click="fnSendPush">
              <v-icon left>message</v-icon>발 송
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
export default {
  data() {
    return {
      sTitle: '',
      sMsg: ''
    }
  },
  methods: {
    fnSendPush() {
      const PrepareData = JSON.stringify({
        pTitle: this.sTitle,
        pMsg: this.sMsg
      })
      fetch('https://us-central1-motiveko-84a06.cloudfunctions.net/storePushData', {
        method: 'POST',
        headers: {
          'Content-type' : 'application/json'
        },
        body: PrepareData
      })
      .then(res => {
        console.log('호출완료')
        console.log(res)
      })
      .catch(err => console.log('오류!' + err.message))
    }
  }
}
</script>