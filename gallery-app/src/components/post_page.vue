<template>
  <v-container>
    <v-row mt-4>
      <!-- 1 10 1 -->
      <v-col offset="1" cols="10">
        <v-card>
          <v-img height="200px" :src="this.sPicUrl"></v-img>
        </v-card>
      </v-col>
    </v-row>
    <v-row mt-5>
      <v-col offset="2" cols="8">
        <v-text-field name="title" label="사진 제목" v-model="sTitle" autofocus></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <!-- 2 8 2 -->
      <v-col offset="2" cols="8">
        <v-text-field name="info" label="사진 설명" v-model="sInfo" multi-line rows="3"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="text-center">
        <v-btn color="orange" dark large @click="fnSubmitPost()">업로드</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import oPictureData from '@/datasources/picture-data'
import {oPicturesinDB} from '@/datasources/firebase'

export default {
    name: "App",
    firebase: { oPictures: oPicturesinDB },
    data() {
      return {
        oPictures: [],
        aPictures: oPictureData.aPictures,
        sTitle: '',
        sInfo: '',
        sPicUrl: ''
      }
    },
    mounted() {
      let nIndex = Math.floor(Math.random() * 12)
      const itemPic = this.aPictures[nIndex]
      this.sTitle = itemPic.title
      this.sInfo = itemPic.info
      this.sPicUrl = itemPic.url
      
    },
    methods : {
      fnSubmitPost() {
        oPicturesinDB.push({
          'url' : this.sPicUrl,
          'title' : this.sTitle,
          'info' : this.sInfo
        }).then(this.$router.push('/'))
      }
    }
}
</script>

<style>

</style>