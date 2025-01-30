import App from './App'
import uviewPlus from 'uview-plus'

// #ifndef VUE3
import Vue from 'vue'

import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
const pinia = createPinia()
export function createApp() {
  const app = createSSRApp(App)
 
  app.use(uviewPlus)
  app.use(pinia)
  return {
    app
  }
}
// #endif