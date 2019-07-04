import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    url: `http://54.254.179.177:3000`,
    islogin: false,
    id: '',
    token: '',
    questions: [],
    tags: [],
    answers: [],
    question: {}
  },
  mutations: {
    USERLOGIN (state, payload) {
      state.id = payload.id
      state.token = payload.token
      state.islogin = true
    },
    USERLOGOUT (state) {
      state.id = ''
      state.islogin = false
    },
    ALLQUESTIONS (state, payload) {
      state.questions = payload
    },
    SET_TAGS (state, payload) {
      state.tags = payload
    },
    SET_QUESTION (state, payload) {
      state.question = payload
    },
    SET_ANSWERS (state, payload) {
      state.answers = payload
    }
  },
  actions: {
    FETCHQUESTIONS ({ commit, state }, payload) {
      axios({
        method: 'GET',
        url: `${state.url}/question`,
        headers: { token: state.token }
      })
        .then(({ data }) => {
          let arr = []
          data.forEach(question => {
            question.tags.forEach(tag => {
              if (!arr.includes(tag)) {
                arr.push(tag)
              }
            })
          })
          commit('SET_TAGS', arr)
          commit('ALLQUESTIONS', data)
        })
        .catch(console.log)
    },
    FETCHQUESTION ({ commit, state }, payload) {
      axios({
        method: 'GET',
        url: `${state.url}/question?search=${payload}`,
        headers: { token: state.token }
      })
        .then(({ data }) => {
          commit('SET_QUESTION', data[0])
          return axios({
            method: 'GET',
            url: `${state.url}/answer/${payload}`,
            headers: {
              token: state.token
            }
          })
        })
        .then(({ data }) => {
          commit('SET_ANSWERS', data)
        })
        .catch(console.log)
    }
  }
})
