import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import jQuery from 'jquery'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)



import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-vue/dist/bootstrap-vue'
import 'jquery'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
