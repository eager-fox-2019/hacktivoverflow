import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Logform from './views/Logform.vue'
import QuestionForm from './views/QuestionForm.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/logform',
      name: 'logform',
      component: Logform
    },
    {
      path: '/add-question',
      name: 'questionform',
      component: QuestionForm
    }
  ]
})
