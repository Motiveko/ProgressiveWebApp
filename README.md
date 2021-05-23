# ProgressiveWebApp
PWA 학습 레포지토리

 - TODO_LIST App
> https://motiveko-pwa.firebaseapp.com/

 - 사진 갤러리 App


## 학습 내용 정리

---

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
  ngrok http {port}
```



 
