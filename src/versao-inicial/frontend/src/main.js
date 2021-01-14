import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'

import './components/template/config/Bootstrap'
import './components/template/config/msgs'
import './components/template/config/axios'
import store from './components/template/config/Store'
import router from './components/template/config/router'


Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')