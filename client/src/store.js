import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseURL: 'http://localhost:3000',
    isLoggedIn: false,
    loggedUser: {},
    publicQuestions: [],
    myQuestions: []
  },
  getters: {
  
  },
  mutations: {
    SET_LOGIN(state, user) {
      state.isLoggedIn = true
      state.loggedUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName
      }
    },
    
    SET_LOGOUT(state, user) {
      state.isLoggedIn = false
      state.loggedUser = {}
    },

    SET_PUBLICQUESTIONS(state, questions) {
      state.publicQuestions = questions
    },

    SET_MYQUESTIONS(state, questions) {
      state.myQuestions = questions
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
    },

    getMyQuestions(context){
      axios({ 
        method: 'GET',
        url: `${this.state.baseURL}/questions`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({data}) => {
          context.commit('SET_MYQUESTIONS', data)
        })
        .catch(({response}) => {
          console.log(response)
        })
    },

    voteQuestion(context, question) {
      axios({
        method: 'PATCH',
        url: `${this.state.baseURL}/questions/vote/${question._id}`,
        data: {
          upvotes: question.upvotes,
          downvotes: question.downvotes
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          context.dispatch('getPublicQuestions')
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },

    voteAnswer(context, answer) {
      console.log('MASUK JURAGAN')
      axios({
        method: 'PATCH',
        url: `${this.state.baseURL}/answers/vote/${answer._id}`,
        data: {
          upvotes: answer.upvotes,
          downvotes: answer.downvotes
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          console.log(data)
          // context.dispatch('getPublicanswers')
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },


  }
})
