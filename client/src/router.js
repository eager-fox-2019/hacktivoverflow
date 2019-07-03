import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Landing from './views/landingPage.vue';
import Question from './views/questionPage.vue';
import User from './views/userPage.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'landing',
    component: Landing,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('./views/About.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/question',
    name: 'question',
    component: Question,
  },
  {
    path: '/user',
    name: 'user',
    component: User,
  },
  ],
});

// completed--- clean lint
