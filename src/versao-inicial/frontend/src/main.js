import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'
import store from './components/template/config/Store'
import './components/template/config/Bootstrap'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')