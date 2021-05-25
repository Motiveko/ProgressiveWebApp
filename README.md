# ProgressiveWebApp
PWA 학습 레포지토리

 - TODO_LIST App
> https://motiveko-pwa.firebaseapp.com/

 - 사진 갤러리 App


## 학습 내용 정리

---

<br>

### Ch 1 
1. PWA(Progressive Web App) 이란?
> 웹 앱이지만 앱과 같은 사용자 경험을 제공하는 것을 목표로 하는 웹 기술. 네이티브 앱처럼 홈 화면에 바로가기를 만들고, 알림을 보내고, 오프라인에서도 동작할 수 있게 하는것이 목표

2. PWA 핵심 기술
 - 서비스 워커
   - 브라우저와 서버 사이에서 상태값 변경 등을 감시하고 푸시 알림으로 사용자에게 메세지를 보낼 수 있다. 오프라인에서도 작동 가능하다.

 - 메니페스트
   - 앱 정보와 기본 설정을 담은 JSON 파일. 웹 앱의 제목, 소개글 등과 스플래시 스크린(앱 로딩화면), 화면 방향, 홈 화면 아이콘, 브라우저 아이콘, 기본 배경색 등의 정보가 담겨있다.

 - 푸시알림
   - PWA는 사용자가 푸시알림에 동의하기만 하면, 웹 사이트에 한번 방문하고 떠난 사용자에게도 푸시 알림을 보낼 수 있다.

 - 홈 화면에 추가 기능
    - PWA로 개발된 웹에 접속하면 웹브라우저는 사용자아게 홈화면 설치를 권유한다. 이를 통해 네이티브 앱과 같이 홈 화면에 아이콘을 추가하고 바로 접속할 수 있다.

<br>

### Ch 10

1. 서비스 워커의 런타임 캐시
  - 워크박스의 5가지 캐시 전략
    - Network-First
    - Cache-First
    - Stale-While-Revalidate
    - Network-Only
    - Cache-Only


#### 1-1 Network-First
> 인터넷 접속 성공 시 결과값을 보여주고, 실패 시 캐시를 보여준다. 항상 최신의 내용이 필요한 인터넷 기사 등에 적합

#### 1-2 Cache-First
>  캐시를 먼저 읽어서 보여준다. 캐시가 없다면 네트워크에 요청하고 결과값을 캐싱한다. 폰트, 이미지 등 거의 안바뀌는 내용에 적합.

#### 1-3 StaleWhile-Revalidate
> 캐시를 먼저 읽어서 보여준다. 동시에 네트워크에 요청해 결과값을 캐시와 비교 후 다르면 캐시를 업데이트한다. 업데이트가 가끔 발생하는 내용에 적합하다.

#### 1-4 Network-Only
> 무조건 네트워크 요청의 결과값을 보여준다. 내용이 자주 변해 캐시가 별로 의미 없는 경우 적합.

#### 1-5 Cache-Only
> 무조건 캐시에서 가져온 결과값을 보여준다. 오프라인 작업에 적합.


2. ngrok를 이용한 local 서버 포워딩
> ngrok를 이용하면 현재 로컬에서 개발중인 앱을 외부 모바일 기기 등을 통해 테스트 할 수 있다.

#### 2-1 ngrok 설치

```
npm i -g ngrok
```

#### 2-2 vue.config.js의 설정

```
module.exports = {
  ...

  devServer: {
    disableHostCheck: true
  }
}
```

#### 2-3 dev서버를 이용해 로컬  띄운 후 ngrok를 이용한 외부 포워딩
```
  npm run serve
  ngrok http {LOCAL_PORT}
```
 
<br> 

### Ch 11

<br>

### FireBase
 1. BaaS(Backend as a Service)란?
  - https://m.blog.naver.com/PostView.naver?blogId=jwh1807&logNo=220881940998&proxyReferer=https:%2F%2Fwww.google.com%2F

 2. FireBase
  - FireBase Hosting
    - https://firebase.google.com/docs/hosting?authuser=0
    - Firebase 호스팅은 웹 앱, 정적/동적 콘텐츠, 마이크로서비스를 위한 빠르고 안전한 호스팅을 제공합니다.
    - 보안 연결로 콘텐츠 전송 - SSL
    - 정적 및 동적 콘텐츠와 마이크로서비스 호스팅
      - https://firebase.google.com/docs/hosting/serverless-overview?authuser=0
    - 명령어 하나로 새 버전 배포
    - etc..
 
  - FireBase Realtime DB
    - https://firebase.google.com/docs/database/rtdb-vs-firestore?authuser=0
    - 여러 클라이언트에서 실시간으로 상태를 동기화해야 하는 모바일 앱을 위한 효율적이고 지연 시간이 짧은 솔루션
    - 데이터를 하나의 큰 JSON 트리로 저장(NoSQL)