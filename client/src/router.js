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
      name: 'questions-view',
      component: () => import('./views/Home.vue'),
      children: [
      ]
    },
    {
      path: '/questions/:id',
      name: 'questions-detail',
      component: () => import('./views/Question.vue')
    },
    {
      path: '/ask',
      name: 'ask-view',
      component: () => import('./views/Ask.vue')
    }
  ]
})
