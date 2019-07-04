import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store'
const toastifyHelper = require('./helpers/toastify')


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
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ './views/Register.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import(/* webpackChunkName: "user" */ './views/User.vue'),
      children: [

      ]
    },
    {
      path: '/newQuestion',
      name: 'questionform',
      component: () => import(/* webpackChunkName: "questionform" */ './views/QuestionForm.vue')
    },
    {
      path: '/question/:id',
      name: 'questionDetail',
      component: () => import(/* webpackChunkName: "questionDetail" */ './views/QuestionDetail.vue')
    },
    {
      path: '/question/:id/edit',
      name: 'questionEdit',
      component: () => import(/* webpackChunkName: "questionEdit" */ './views/QuestionEdit.vue'),
      beforeEnter: async function (to, from, next) {
        await store.dispatch('initApp')
        await store.dispatch('fetchQuestionDetail', { id: to.params.id })
        if (store.state.questionDetail.user._id === store.state.loggedUser.user) {
          next()
        } else {
          toastifyHelper('Not Authorized')
          next('/')
        }
      }
    },
    {
      path: '/answer/:id/edit',
      name: 'answerEdit',
      component: () => import(/* webpackChunkName: "answerEdit" */ './views/AnswerEdit.vue'),
      beforeEnter: async function (to, from, next) {
        await store.dispatch('initApp')
        await store.dispatch('fetchAnswerDetail', { id: to.params.id })
        let s = store
        if (s.state.answerDetail.user._id === s.state.loggedUser.user) {
          next()
        } else {
          toastifyHelper('Not Authorized')
          next('/')
        }
      }
    }
  ]
})
