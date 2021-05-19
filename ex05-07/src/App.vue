<template>
  <div id="app">
    <h1>안녕하세요?</h1>
    <router-view/>
    <hr>
    <p> 라우터 링크 사용: 
      <router-link to="/main">메인 페이지</router-link>
      <router-link to="/sub">서브 페이지</router-link>
    </p>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
