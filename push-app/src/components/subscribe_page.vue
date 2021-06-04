<template>
  <v-card class="mx-auto" max-width="500">
    <v-img src="../assets/img/push-image.jpg"></v-img>
    <v-row align="center">
      <v-col offset="1" cols="2">
        <v-img contain color="blue-darken-2" src="../assets/img/push-noti.png" max-width="70px"></v-img>
      </v-col>
      <v-col cols="8">
        <v-card-title primary-title>
          <h1 class="headline">졸업작품 전시회 푸시 알림</h1>
          <div class="body-1">
            졸업작품 전시회의 초청 푸시 알림을 보내려고 합니다.
            [알림 허용] 단추를 클릭하시면 알림 정보를 받으실 수 있습니다.
          </div>
        </v-card-title>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col offset="1" cols="5">
        <v-btn block large @click="fnPushSubscribe" color="orange" dark>
          <v-icon dark left>add_alert</v-icon>알림 허용
        </v-btn>
      </v-col>
      <v-col cols="5">
        <v-btn block large @click="fnUnSubscription" color="orange" dark> 
          <v-icon dark left>notifications_off</v-icon>알림 해제
        </v-btn>
      </v-col>
    </v-row>
    <v-snackbar v-model="bMsg">
      푸시 알림이 해제되었습니다.
      <v-btn color="orange" text @click="bMsg = false">닫기</v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>

import { oSubscriptionsinDB } from '@/datasources/firebase'

export default {
  data() {
    return {
      bMsg: false
    }
  },
  methods: {
    fnPushSubscribe() {
      // 알림 동의여부창 호출
      let temp_this = this;

      Notification.requestPermission(function(result) {
        // result : granted / denied
        if(result !== "granted") {
          console.log("푸시 알림 기능이 허용되지 않았습니다.")
        } else {
          temp_this.fnConfigurePushSub()
        }
      })
    },
    fnConfigurePushSub() {
      // 서비스워커 점검 및 푸시 서버 설정
      let temp_this = this;
      console.log(navigator.serviceWorker)
      if(!("serviceWorker" in navigator)) {
        console.log("서비스 워커가 없습니다.")
        return;
      } 
      navigator.serviceWorker.ready
        .then((swreg) => {
          // swreg : ServiceWorkerRegistration
          // 푸시 서버에서 구독 정보를 가져온다.
          return swreg.pushManager.getSubscription()
        })
        .then((sub) => {
          // sub : PushSubscription
          if( sub === null ) {
            // 첫 구독일 때 처리
            temp_this.fnNewSubscription()
            temp_this.fnDisplayNotification()
          } else {
            console.log('이미 구독되어 있습니다.')
          }
        })
    },
    fnNewSubscription() {
      let temp_this = this;
      navigator.serviceWorker.ready
        .then(swreg => {
          // 새로운 구독자 등록용 공개 키
          const vapidPublicKey = 'BDd2EsaQxJSwePTOwuzZhqXv3eBrKB1cZFJnVr07Q7z4YzKQWzqcKEIGqUt3UH7IVHrubmqtFwD1kZ-JGHg6G98'
          const convertedVapidPublicKey = temp_this.urlBase64ToUint8Array(vapidPublicKey);
          return swreg.pushManager
                  .subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: convertedVapidPublicKey
                  })
                  .then(newSub => {
                    // newSub : 푸시 메시지를 전달하는데 필요한 정보 반환값
                    const filteredSub = JSON.parse(JSON.stringify(newSub));
                    var pushConfig = {
                      endPoint: filteredSub.endpoint,
                      keys: {
                        p256dh: filteredSub.keys.p256dh,
                        auth:   filteredSub.keys.auth
                      }
                    }
                    console.log(pushConfig)
                    return oSubscriptionsinDB.push(pushConfig)
                  })
        })
    },
    // 구독자 등록 해제
    fnUnSubscription() {
      let temp_this = this
      navigator.serviceWorker.ready
        .then(swreg => {
          return swreg.pushManager.getSubscription()
        })
        .then(oldSub => {
          temp_this.bMsg = true
          oldSub.unsubscribe()
        })
        .catch(err => console.log(err)) 
    },
    // 푸시 알림 메시지 준비 및 발송
    fnDisplayNotification() {
      // todo
      const title = '졸업작품 전시회'
      const options = {
        body: '새로운 소식 알림 서비스에 가입하신 것을 환영합니다!',
        icon: '/img/push-noti.png',
        badge: '/img/push-badge-icon.png',
        image: '/img/push-image.jpg',
        actions: [
          {
            // 푸시알림에 title, icon의 내용이 표시되고 action값이 매개변수로 전달되어 이것을 이용해서 지정된 웹페이지로 이동 등이 가능하다.
            action: 'like',
            title: '구독과 좋아요는. 사랑입니다.',
            icon: '/img/push-coffe.png'
          }
        ],
        // 진동, 500ms 진동 후 100ms 멈췄다 500ms 진동한다는 뜻
        vibrate: [500, 100, 500]
      }
      navigator.serviceWorker.ready.then(swreg => {
        swreg.showNotification(title, options)
      })
    },
    // 코드 등록 때 필요할 숫자 변환용 유틸리티 함수
    urlBase64ToUint8Array(base64String) {
      const padding = '='.repeat((4 - base64String.length % 4) % 4)
      const base64 = (base64String + padding)
        /* eslint-disable */
        .replace(/\-/g, '+')
        /* eslint-enable */
        .replace(/_/g, '/')
      const rawData = window.atob(base64)
      return Uint8Array.from([...rawData].map((char) =>
        char.charCodeAt(0)))
    }
  }
}
</script>