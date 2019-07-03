import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAlertify from 'vue-alertify';
import './registerServiceWorker'

// Vue.use(require('vue-moment'));
Vue.use(VueAlertify);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  methods: {
    success: function () {
      this.$alertify.success('success');
    },
    alert: function () {
      this.$alertify.alert('This is alert', () =>
        this.$alertify.warning('alert is closed')
      );
    },
    alertWithTitle: function () {
      this.$alertify.alert('alert title', 'This is alert', () =>
        this.$alertify.warning('alert is closed')
      );
    },
    confirm: function () {
      this.$alertify.confirm(
        'This is comfirm',
        () => this.$alertify.success('ok'),
        () => this.$alertify.error('cancel')
      );
    },
    confirmWithTitle: function () {
      this.$alertify.confirm(
        'confirm title',
        'This is comfirm',
        () => this.$alertify.success('ok'),
        () => this.$alertify.error('cancel')
      );
    },
    prompt: function () {
      this.$alertify.prompt(
        'This is prompt',
        'default value',
        (evt, value) => this.$alertify.success('ok: ' + value),
        () => this.$alertify.error('cancel')
      );
    },
    promptWithTitle: function () {
      this.$alertify.promptWithTitle(
        'prompt title',
        'This is prompt',
        'default value',
        (evt, value) => this.$alertify.success('ok: ' + value),
        () => this.$alertify.error('cancel')
      );
    },
    promptWithTypeColor: function () {
      this.$alertify
        .promptWithTitle(
          'prompt title',
          'This is prompt',
          'default value',
          (evt, value) => this.$alertify.success('ok: ' + value),
          () => this.$alertify.error('cancel')
        )
        .set('type', 'color');
    },
  },
  render: h => h(App)
}).$mount('#app')