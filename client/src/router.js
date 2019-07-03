import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import QuestionDetail from './views/QuestionDetail.vue'
import AddQuestion from './views/AddQuestion.vue'
import Registration from './views/Registration.vue'
import MyProfile from './views/MyProfile.vue'

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
      path: '/questions/:id',
      name: 'question detail',
      component: QuestionDetail
    },
    {
      path: '/addquestion',
      name: 'addQuestion',
      component: AddQuestion
    },
    {
      path: '/register',
      name: 'register',
      component: Registration
    },
    {
      path: '/profile/:id',
      name: 'profile',
      component: MyProfile
    }
  ]
})
