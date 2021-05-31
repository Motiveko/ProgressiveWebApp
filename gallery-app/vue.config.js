module.exports = {
  pwa: {
    workboxPluginMode: 'InjectManifest', // InjectManifest 플러그인 모드는 반드시 선언
    workboxOptions: {
      swSrc: "src/service-worker.js"
    }
  },
  transpileDependencies: [
    'vuetify'
  ]
}
