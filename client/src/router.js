import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './components/loginform.vue'
import Register from './components/registerForm.vue'
import Post from './components/Post.vue'
import SinglePost from './components/SinglePost.vue'
import Newquestion from './components/formAddNewQuestion.vue'
import MyPost from './components/Myprofile.vue'


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
      path: '/newquestion',
      name: 'newquestion',
      component: Newquestion
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/question/:questionId',
      name: 'singleQ',
      component: SinglePost,
    },
    {
      path: '/post',
      name: 'post',
      component: Post,
    },
    {
      path: '/myprofile',
      name: '/myprofile',
      component: MyPost,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
