import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'
import store from './components/template/config/Store'
import './components/template/config/Bootstrap'
import router from './components/template/config/router'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')