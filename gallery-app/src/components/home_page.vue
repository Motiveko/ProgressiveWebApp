<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="3" xl="2" v-for="item in this.oPictures" :key="item.key">
        <v-card class="py-2 px-2">
          <v-img :src="item.url" height="200px" class="pointer" @click="fnDisplayInfo(item['.key'])"></v-img>
          <v-card-title>
            <h1 class="title-grey--text text--darken-3 mb-3">
              {{item.title}}
            </h1>
            <p class="body-1 grey--text">{{item.info}}</p>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" class="mt-5 text-center" >
        <p v-if="!this.oPictures.length">사진이 없습니다. 추가해 주세요.</p>
      </v-col>

      <v-btn @click="$router.push('/post')" color="red" dark fixed bottom right fab> 
        <v-icon>add</v-icon>
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>

import {oPicturesinDB} from '@/datasources/firebase'

export default {
  name: 'App',
  data() {
    return { oPictures: [] }
  },
  firebase: { oPictures: oPicturesinDB },
  methods: {
    fnDisplayInfo(pID) {
      this.$router.push({
        name: 'info_page',
        params: { p_id: pID }
      })
    }
  }
}
</script>

<style>
  .pointer {
    cursor: pointer;
  }
</style>