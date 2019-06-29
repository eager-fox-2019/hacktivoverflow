import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

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
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ './views/Register.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/question/create',
      name: 'question-create',
      component: () => import(/* webpackChunkName: "question-create" */ './views/QuestionCreate.vue')
    },
    {
      path: '/question/:id',
      name: 'question-detail',
      component: () => import(/* webpackChunkName: "question-detail" */ './views/QuestionDetail.vue')
    },
    {
      path: '/question/:id/edit',
      name: 'question-edit',
      component: () => import(/* webpackChunkName: "question-edit" */ './views/QuestionEdit.vue')
    }
  ]
})
