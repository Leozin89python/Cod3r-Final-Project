import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'
import store from './components/template/config/Store'
import './components/template/config/Bootstrap'
import Router from './components/template/config/Router'

Vue.config.productionTip = false

new Vue({
  store,
  Router,
  render: h => h(App)
}).$mount('#app')