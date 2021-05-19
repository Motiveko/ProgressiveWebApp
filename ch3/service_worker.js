const sCacheName = 'hello-pwa-v2'
const aFilesToCache = [
    './', './index.html', './manifest.json', './images/hello-pwa.png',
    './images/icons/favicon.ico',
    './images/icons/android-chrome-512x512.png'
]

self.addEventListener('install', pEvent => {
    console.log('서비스 워커 설치함');
    pEvent.waitUntil(
        caches.open(sCacheName)
        .then(pCache => {
            console.log('파일을 캐시에 저장함');
            return pCache.addAll(aFilesToCache);
        })
    )
})

self.addEventListener('activate', pEvent => {
    console.log('서비스 워커 동작 시작됨');
})

self.addEventListener('fetch', pEvent => {
    pEvent.respondWith(
        caches.match(pEvent.request)
        .then(response => {
            if(!response) {
                console.log('네트워크에서 데이터 요청', pEvent.request);
                return fetch(pEvent.request);
            }
            console.log('캐시에서 데이터 요청', pEvent.request);
            return response;
        }).catch(err => console.error(err))
    )
})