import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import VeeValidate from 'vee-validate'
import SweetAlert from 'sweetalert2'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)
Vue.use(VeeValidate)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
