import Vue from 'vue'
import Vuex from 'vuex'
import ax from '@/api/server.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    user: {
      name: '',
      email: '',
      access_token: ''
    }
  },
  mutations: {
    LOGIN (state, payload) {
      state.isLogin = true
      state.user = payload
    },
    LOGOUT (state) {
      state.isLogin = false
      state.user.name = ''
      state.user.email = ''
      state.user.access_token = ''
    }
  },
  actions: {
    register (contex, payload) {
      return ax({
        method: 'post',
        url: '/user/register',
        data: payload
      })
    },
    login (contex, payload) {
      return ax({
        method: 'post',
        url: '/user/login',
        data: payload
      })
    },
    GLogin (contex, payload) {
      return ax({
        method: 'post',
        url: '/user/signingoogle',
        data: { token: payload }
      })
    },
    questionCreate (contex, payload) {
      return ax({
        method: 'post',
        url: '/question/create',
        data: payload,
        headers: {
          access_token: this.state.user.access_token
        }
      })
    }
  }
})
