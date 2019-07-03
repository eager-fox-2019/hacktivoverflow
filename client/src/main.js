import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import Animate from 'animate.css'
import 'buefy/dist/buefy.css'
import '@/main.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck, faCheckCircle, faInfoCircle, faExclamationTriangle, faExclamationCircle,
  faArrowUp, faAngleRight, faAngleLeft, faAngleDown,
  faEye, faEyeSlash, faCaretDown, faCaretUp, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios'

library.add(faCheck, faCheckCircle, faInfoCircle, faExclamationTriangle, faExclamationCircle,
  faArrowUp, faAngleRight, faAngleLeft, faAngleDown,
  faEye, faEyeSlash, faCaretDown, faCaretUp, faUpload)
Vue.component('vue-fontawesome', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(axios)
Vue.use(Buefy)
Vue.use(Animate)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
