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
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ './views/Register.vue')
    },
    {
      path: '/askquestion',
      name: 'askquestion',
      component: () => import(/* webpackChunkName: "askquestion" */ './views/AskQuestion.vue')
    },
    {
      path: '/tags',
      name: 'tags',
      component: () => import(/* webpackChunkName: "tags" */ './views/Tags.vue')
    },
    {
      path: '/users',
      name: 'users',
      component: () => import(/* webpackChunkName: "users" */ './views/Users.vue')
    },
    {
      path: '/myquestions',
      name: 'myquestions',
      component: () => import(/* webpackChunkName: "myquestions" */ './views/MyQuestions.vue')
    },
    {
      path: '/editquestion/:id',
      name: 'editquestion',
      component: () => import(/* webpackChunkName: "editquestion" */ './views/EditQuestion.vue')
    },
    {
      path: '/questions/:id',
      name: 'questions',
      component: () => import(/* webpackChunkName: "questions" */ './views/DetailQuestion.vue')
    },
    // {
    //   path: '/detail',
    //   name: 'detail',
    //   component: () => import(/* webpackChunkName: "detail" */ './views/DetailQuestion.vue')
    // }

  ]
})
