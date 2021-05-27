<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center">
        <video ref="rVideo" class="style_video"></video>
      </v-col>
      <v-col cols="12" class="mt-5 text-center">
        <p>현재 iOS는 지원하지 않습니다.</p>
      </v-col>
    </v-row>
    <div class="text-center my-3">
      <v-btn v-if="!this.bIsWait" color="red" fab dark bottom @click="fnCameraCapture()">
        <v-icon>camera</v-icon>
      </v-btn>
      <v-progress-circular v-if="this.bIsWait" :size="50" indeterminate color="grey"></v-progress-circular>
    </div>
  </v-container>
</template>

<script>

import { oStorage, oPicturesinDB } from '@/datasources/firebase'

export default {
  firebase : { oPictures : oPicturesinDB },
  data() {
    return {
      oPictures: [],
      oVideoStream: null,
      bIsWait: false
    }
  },
  mounted() {
    // 웹 API를 이용해서 사용자 카메라 접근 요청(영상 only?)
    navigator.mediaDevices.getUserMedia({
      video: true
    }).then(pVideoStream => {
      // 카메라 영상 스트림 정보를 저장
      this.oVideoStream = pVideoStream
      // 카메라 영상 스트림 정보를 video 엘리먼트에 표시
      this.$refs.rVideo.srcObject = pVideoStream
      this.$refs.rVideo.play()
    }).catch(err => console.log(err))
  },
  destroy() {
    // 화면을 종료할 경우 현재 재생되는 영상 트랙을 찾아 종료시킨다. 영상 트랙이란..?
    const oTrack = this.oVideoStream.getTracks()
    oTrack.map(pTrack => pTrack.stop())
  },
  methods: {
    fnCameraCapture() {
      this.bIsWait = true

      const oVideoTrack = this.oVideoStream.getVideoTracks()[0]
      let oCaptureedImage = new window.ImageCapture(oVideoTrack)
      const options = {
        imageHeight: 359, imageWidth: 640, fillLightMode: 'off'
      };
      
      // oCaptureedImage.takePhotos내부의 callback함수 내에서는 this를 쓸 수 없게되므로 this를 self로 선언 후 사용한다.
      const self = this

      return oCaptureedImage.takePhoto(options).then(pImageData => {
        const oTrack = self.oVideoStream.getTracks()
        oTrack.map(pTrack => pTrack.stop())
        console.log('캡쳐 :' + pImageData.type + ', ' + pImageData.size + '바이트')
        
        // 저장할 이미지 파일 이름으로 사용할 ID
        const nID = new Date().toISOSTRING()

        let uploadTask = oStorage.ref('images').child('pic' + nID).put(pImageData)
        uploadTask.on('stage_changed', function(snapshot) {
          let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('업로드 : ' + progress + '% 완료', snapshot.state)
        }), function(err) {
          console.log(err)
        }, function() {
          // 업로드 완료 후 callback?
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log('업로드URL : ', downloadURL);
            oPicturesinDB.push({
              'url' : downloadURL, 'title': '', 'info': '', 'filename': 'pic' + nID
            })
          })
          .then(self.$router.push('/'))
        }
        
      })
    }
  }
}
</script>

<style>

</style>