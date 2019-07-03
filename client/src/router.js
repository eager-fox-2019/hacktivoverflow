import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '@/components/signin.vue'
import Home from '@/views/home.vue'
import SignUp from '@/components/signup.vue'
import AskQuestion from '@/views/askquestion.vue'
import ViewPost from '@/views/viewpost.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/askquestion',
      name: 'AskQuestion',
      component: AskQuestion
    },
    {
      path: '/post/:id',
      name: 'ViewPost',
      component: ViewPost
    }
  ]
})
