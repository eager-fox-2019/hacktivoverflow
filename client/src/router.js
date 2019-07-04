import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './views/Register.vue'
import Detail from './views/Detail.vue'
import login from './views/login.vue'
import myquestion from './views/myquestion.vue'

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
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/details/:questionId',
      name: 'details',
      component: Detail
    },
    {
      path: '/myquestion',
      name: 'myquestion',
      component: myquestion
    }
  ],
  beforeRouteUpdate (to, from, next) {
    // just use `this`
    this.questionId = to.params.questionId
    next()
  }
})
