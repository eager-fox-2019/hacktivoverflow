import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: () => import( /* webpackChunkName: "home" */ './views/Home.vue'),
    },
    {
      path: '/all',
      name: 'all',
      component: () => import( /* webpackChunkName: "all" */ './views/All.vue'),
    },
    {
      path: '/one',
      name: 'one',
      component: () => import( /* webpackChunkName: "one" */ './views/One.vue'),
    },
    {
      path: '/new',
      name: 'new',
      component: () => import( /* webpackChunkName: "new" */ './views/New.vue'),
    },
    {
      path: '/edit',
      name: 'edit',
      component: () => import( /* webpackChunkName: "edit" */ './views/Edit.vue'),
    },
    {
      path: '/mypost',
      name: 'mypost',
      component: () => import( /* webpackChunkName: "mypost" */ './views/Mypost.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
