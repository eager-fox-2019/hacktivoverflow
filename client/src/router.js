import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/MainPage.vue'
import Register from './views/LoginRegister.vue'
import Detail from './views/Detail.vue'
import QuestionForm from './views/Qform.vue'
import Aform from './views/Aform.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/MainPage',
      name: 'home',
      component: Home,
      beforeEnter : (to, from, next) => {
        if(!localStorage.getItem("token")) {
          next('/')
        }else{
          next()
        }
      }
    },
    {
      path: '/',
      name: 'about',
      component : Register,
      beforeEnter : (to, from, next) => {
        if(localStorage.getItem("token")) {
          next('/MainPage')
        }else{
          next()
        }
      }
    },
    {
      path: '/detail/:Qid',
      name: 'detail',
      component : Detail
    },
    {
      path : '/formAdd',
      name : 'format',
      component : QuestionForm
    },
    {
      path : '/formAns/:Qid',
      name : 'generateAnswer',
      component : Aform
    }
  ]
})
