import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseURL: 'http://localhost:3000',
    isLoggedIn: false,
    loggedUser: {}
  },
  getters: {
  
  },
  mutations: {
    SET_LOGIN(state, payload) {
      state.isLoggedIn = true
      state.loggedUser = {
        firstName: payload.firstName,
        lastName: payload.lastName
      }
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
    }
  }
})
