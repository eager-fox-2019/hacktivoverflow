import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login-register',
      component: () => import('./views/LoginRegister.vue')
    },
    {
      path: '/questions',
      name: 'all-questions',
      component: () => import('./views/AllQuestions.vue')
    },
    {
      path: '/questions/:id',
      name: 'single-question-view',
      component: () => import('./views/SingleQuestion.vue')
    },
    {
      path: '/ask',
      name: 'new-question',
      component: () => import('./views/NewQuestion.vue')
    }
  ]
})
