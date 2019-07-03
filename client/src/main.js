import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import VoerroTagsInput from '@voerro/vue-tagsinput'
import VueSweetalert2 from 'vue-sweetalert2'

Vue.use(VueSweetalert2)
Vue.component('tags-input', VoerroTagsInput)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
