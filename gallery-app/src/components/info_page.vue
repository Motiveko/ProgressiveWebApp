<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="py-3 px-3">
          <!-- contain 어트리뷰트를 이용해 세부 사진을 컨테이너 크기에 맞도록 자동으로 조절하여 표시 -->
          <v-img height="450px" contain:src="this.itemPic.url"></v-img>
          <v-card-text v-if="this.itemPic.title">
            <h1 class="headline mt-1 text-center">
              {{ this.itemPic.title }}
            </h1>
            <p class="body-1 mt-1 text-center">{{ this.itemPic.info }}</p>
          </v-card-text>
        </v-card>
        <v-col cols="12" class="mt-3 text-center">
          <v-btn color="grey" fab dark @click="fnDeleteItem()">
            <v-icon>delete</v-icon>
          </v-btn>
        </v-col>
      </v-col>    

    </v-row>

  </v-container>
</template>

<script>

import {oStorage, oPicturesinDB} from '@/datasources/firebase'

export default {
    name: "App",
    firebase: { oPictures: oPicturesinDB },
    data() {
      return {
        oPictures: [],
        itemPic: null    // 검색 결과 항목을 저장할 객체 변수
      }
    },
    created() {
      const itemID = this.$route.params.p_id
      this.itemPic = this.oPictures.find( item => item['.key'] === itemID)
    },
    methods : {
      fnDeleteItem() {
        // 파이어베이스 DB의 사진 노드 삭제
        oPicturesinDB.child(this.itemPic['.key']).remove()
        // 스토리지에 이미지가 존재할 경우 삭제
        if(this.itemPic['filename'])
          oStorage.ref('images').child(this.itemPic['filename']).delete()   // filename : storage에 노드의 키값
        this.$router.push('/')
      }
    }
}
</script>

<style>

</style>