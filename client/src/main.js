import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './stylus/main.styl'
import VueSwal from 'vue-swal';
import CKEditor from '@ckeditor/ckeditor5-vue';

Vue.use(VueSwal);
Vue.use(CKEditor);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')