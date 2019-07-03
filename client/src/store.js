import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseURL: 'http://localhost:3000',
    isLoggedIn: false,
    loggedUser: {},
    publicQuestions: []
  },
  getters: {
  
  },
  mutations: {
    SET_LOGIN(state, user) {
      state.isLoggedIn = true
      state.loggedUser = {
        firstName: user.firstName,
        lastName: user.lastName
      }
    },

    SET_PUBLICQUESTIONS(state, questions) {
      state.publicQuestions = questions
    }
  },
  actions: {
    decodeToken(context) {
      axios({ 
        method: 'POST',
        url: `${this.state.baseURL}/users/decode`,
        data: {
          access_token: localStorage.access_token
        }
      })
        .then(({data}) => {
          context.commit('SET_LOGIN', data)
        })
        .catch(({response}) => {
          console.log(response)
        })
    },

    getPublicQuestions(context) {
      axios({ 
        method: 'GET',
        url: `${this.state.baseURL}/questions/all`,
      })
        .then(({data}) => {
          context.commit('SET_PUBLICQUESTIONS', data)
        })
        .catch(({response}) => {
          console.log(response)
        })
    }
  }
})
