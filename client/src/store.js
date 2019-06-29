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
    },
    allQuestion: [],
    filterQuestion: [],
    selectedQuestion: {}
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
    },
    ALL_QUESTION (state, payload) {
      state.allQuestion = payload
    },
    FILTER_NONE (state) {
      state.filterQuestion = state.allQuestion
    },
    SELECT_QUESTION (state, payload) {
      for (let i = 0; i < state.allQuestion.length; i++) {
        if (state.allQuestion[i]._id === payload) {
          state.selectedQuestion = state.allQuestion[i]
        }
      }
    }
  },
  actions: {
    register (context, payload) {
      return ax({
        method: 'post',
        url: '/user/register',
        data: payload
      })
    },
    login (context, payload) {
      return ax({
        method: 'post',
        url: '/user/login',
        data: payload
      })
    },
    GLogin (context, payload) {
      return ax({
        method: 'post',
        url: '/user/signingoogle',
        data: { token: payload }
      })
    },
    questionCreate (context, payload) {
      return ax({
        method: 'post',
        url: '/question/create',
        data: payload,
        headers: {
          access_token: this.state.user.access_token
        }
      })
    },
    getAllQuestion (context) {
      ax({
        method: 'get',
        url: '/question/list'
      })
        .then(({ data }) => {
          context.commit('ALL_QUESTION', data)
          context.commit('FILTER_NONE')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})
