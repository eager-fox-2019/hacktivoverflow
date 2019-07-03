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
      component: Home,
      meta: {
        title: 'home'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue'),
      meta: {
        title: 'about'
      }
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('./views/User.vue'),
      meta: {
        title: 'user'
      }
    },
    {
      path: '/question/:id',
      name: 'question',
      component: () => import('./views/Question.vue'),
      meta: {
        title: 'question'
      }
    }
  ]
})
