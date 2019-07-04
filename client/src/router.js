import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import AddForm from './components/AddForm'
import LandingPage from './components/LandingPage'
import FrontPage from './views/FrontPage'
import EditQuestionForm from './components/EditQuestionForm'
import EditAnswerForm from './components/EditAnswerForm'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'Front Page',
    component: FrontPage, //login register
    children: [{
        path: '/home',
        name: 'Home',
        component: Home
      },
      {
        path: '/add_question',
        name: 'add_question',
        component: AddForm
      },
      {
        path: '/edit_question',
        name: 'edit_question',
        component: EditQuestionForm
      },
      {
        path: '/edit_answer',
        name: 'edit_answer',
        component: EditAnswerForm
      },
      {
        path: '/landing_page',
        name: 'landingPage',
        component: LandingPage
      }
    ]
  },]
})
