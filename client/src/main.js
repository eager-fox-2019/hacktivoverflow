import Vue from 'vue';
import './plugins/vuetify'
import App from './App.vue';
import router from './router';
import store from './store';
import CKEditor from '@ckeditor/ckeditor5-vue';
import Progress from '@/components/Progress'
// import VoerroTagsInput from '@voerro/vue-tagsinput';
import VueTagsInput from '@johmun/vue-tags-input';

Vue.config.productionTip = false;

Vue.use( CKEditor );
// Vue.use(Progress)
// Vue.component('tags-input-voerro', VoerroTagsInput);
Vue.component('vue-tags-input', VueTagsInput);
Vue.component('Progress',Progress)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
