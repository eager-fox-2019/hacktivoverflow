import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Landing from './views/Landing.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import QuestionAnswer from './views/Question-Answer.vue'

Vue.use(Router)

 const router= new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'landing',
      component: Landing
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path:'/answer',
      name:'answer',
      component: QuestionAnswer,
      children:[
        {
        path:':id',
        name: 'QuestionAnswer',
        component: QuestionAnswer
        }
      ]
    }
  ]
})

//  router.beforeEach((to, from, next) => {
//    if(to.fullPath == '/'){
//      if(localStorage.token == undefined){
//        next()
//      }
//    }else if(to.fullPath == '/login'){
//      if(localStorage.token == undefined){
//        next()
//      }
//    }else if(to.fullPath == '/register'){
//      if(localStorage.token == undefined){
//        next()
//      }
//    }
//    else if(to.fullPath == '/home') {
//       if(localStorage.token == undefined){
//        next({ path: '/login', });
//       }else{
//         next()
//       }
//    }
//    else if(to.fullPath == '/answer/:id') {
//     if(localStorage.token == undefined){
//      next({ path: '/login', });
//     }else{
//       next()
//     }
//  }
//  })

export default router