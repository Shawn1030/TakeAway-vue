import Vue from 'vue'
import App from './App.vue'
import Header from './components/header/Header.vue'
import store from './store'
import './validate'
import  './mock/mockServer'
import VueLazyload from 'vue-lazyload'
import loading from './common/img/1.gif'
import {Button} from 'mint-ui'
import './filters'
//引入路由
import router from './router'

Vue.use(VueLazyload, {
  loading
})
Vue.component('Header',Header)
Vue.component('Button',Button)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
