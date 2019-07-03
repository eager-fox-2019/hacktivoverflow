import Vue from 'vue'
import Router from 'vue-router'

// Components
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Question from './components/questions/QDetailCard.vue'

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
      component: Login
    },
    {
      path: '/question/:qid',
      name: 'questiondetail',
      component: Question
    }
  ]
})
