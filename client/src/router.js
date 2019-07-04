import Vue from 'vue';
import Router from 'vue-router';
// import Home from './views/Home.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "about" */ './views/Home.vue'),
    },
    {
      path: '/profile/:id',
      name: 'profileId',
      component: () => import(/* webpackChunkName: "about" */ './views/Profile.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      meta: {
        requiresAuth: true
      },
      component: () => import(/* webpackChunkName: "about" */ './views/Profile.vue'),
    },
    {
      path: '/search',
      name: 'search',
      component: () => import(/* webpackChunkName: "about" */ './views/Search.vue'),
    },
    {
      path: '/question/:id',
      name: 'question',
      component: () => import(/* webpackChunkName: "about" */ './views/ViewQuestion.vue'),
    },
    {
      path: '/newquestion',
      name: 'newquestion',
      meta: {
        requiresAuth: true
      },
      component: () => import(/* webpackChunkName: "about" */ './views/NewQuestion.vue'),
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import(/* webpackChunkName: "about" */ './views/Auth.vue'),
    },
    {
      path: '*',
      name: 'notfound',
      component: () => import(/* webpackChunkName: "about" */ './views/NotFound.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!localStorage.getItem('token')) {
      next({
        path: '/auth',
        query: { redirect: to.fullPath }
      })
    }
    else {
      next()
    }
  }
  else {
    next() // make sure to always call next()!
  }
})

export default router