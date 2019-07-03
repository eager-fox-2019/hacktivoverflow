import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import AddForm from './components/AddForm'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Home, //login register
    },
    {
      path: '/add_question',
      name: 'add_question',
      component: AddForm
    }
  ]
})
