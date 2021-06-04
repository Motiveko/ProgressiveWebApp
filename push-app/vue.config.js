module.exports = {
  runtimeCompiler: true,

  pwa: {
    workboxPluginMode: "InjectManifest",
    workboxOptions:{
      swSrc: "src/service-worker.js"
    }
  },
  devServer: {
    disableHostCheck: true
  }
}