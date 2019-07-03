import Vue from 'vue'
import Vuex from 'vuex'
import ax from './api'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin : false
  },
  mutations: {
    setIsLogin(state,data){
      state.isLogin = data
    }
  },
  actions: {
    register(context,data){
      console.log('masuk store',data);
      ax.post('/register',data)
      .then(({data})=>{
        console.log(data);
      })
      .catch(err =>{
        console.log(err);
      })
    },

    login(context,data){
      ax.post('/login',data)
      .then(({data})=>{
        console.log(data)
        localStorage.setItem('token', data.token)
        localStorage.setItem('userId', data.id)
        localStorage.setItem('username', data.username)
        context.commit('setIsLogin',true)
      })
      .catch(err =>{
        console.log(err);
        
      })
    }
  }
})
