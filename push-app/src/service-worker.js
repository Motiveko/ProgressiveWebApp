console.log('service-worker.js')
// Workbox를 디버그모드로 설정 
workbox.setConfig({
    debug: true,
});
  
// Vue-Cli에서 기본으로 제공하는 프리캐시 설정을 Workbox에 적용 
workbox.precaching.precacheAndRoute(self.__precacheManifest);

self.addEventListener("push", function(event) {
    if(event.data) {
        data.JSON.parse(event.data.text())
    } else {
        console.log('데이타가 비어있습니다.')
    }

    const options = {
        body: data.pMsg,
        icon: "/img/push-noti-icon.png",
        badge: "/img/push-badge-icon.png",
        image: "/img/push-news.jpg",
        actions: [
            {
                action: "info",
                title: "이 링크는 상세 정보 페이지로 이동합니다.",
                icon: "/img/push-info.png"
            }
        ],
        vibrate: [500, 100, 500]
    }

    event.watiUntil(
        self.registration.showNotification(data.pTitle, options)    
    )
})

self.addEventListener(
    "notificationclick",
    function(event) {
        console.log(event)
        if(event.action == "like" ) {
            clients.openWindow("https://daum.com")
        } else if (event.action == "info") {
            clients.openWindow("https://www.naver.com")
        }
        event.notification.close()
    },
    false
)    