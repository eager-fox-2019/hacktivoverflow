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
      },
      children: [
        { path: 'login',
          name: 'login',
          component: () => import('./views/Login.vue'),
          meta: { title: 'login' }
        },
        { path: 'register',
          name: 'register',
          component: () => import('./views/Register.vue'),
          meta: { title: 'register' }
        },
        { path: 'edit',
          name: 'editProfile',
          component: () => import('./views/EditProfile.vue'),
          meta: { title: 'edit profile' }
        }
      ]
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
