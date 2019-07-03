import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    baseUrl: `http://localhost:3000`,
    questions: [],
    answers: [],
    questionShowed: {}
  },
  mutations: {
    SET_LOGIN (state, payload) {
      state.isLogin = payload
    },
    SET_QUESTION_LIST (state, payload) {
      state.questions = payload
    },
    SET_A_QUESTION (state, payload) {
      state.questionShowed = payload
    },
    SET_ANSWER_LIST (state, payload) {
      state.answer = payload
    },
    ADD_ANSWER_LIST (state, payload) {
      state.answer.push(payload)
    }
  },
  actions: {
    REGISTER ({ state }, payload) {
      return axios({
        method: 'post',
        url: `${state.baseUrl}/user/register`,
        data: payload
      })
    },
    LOGIN ({ state }, payload) {
      return axios({
        method: 'post',
        url: `${state.baseUrl}/user/login`,
        data: payload
      })
    },
    ADD_QUESTION ({ state }, payload) {
      return axios({
        method: 'post',
        url: `${state.baseUrl}/question`,
        data: payload,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    GET_QUESTION ({ state }) {
      axios({
        method: 'get',
        url: `${state.baseUrl}/question`
      })
        .then(({ data }) => {
          this.commit('SET_QUESTION_LIST', data)
        })
        .catch(e => {
          console.log(e)
        })
    },
    GET_A_QUESTION ({ state }, payload) {
      console.log('get a detailed question')
      axios({
        method: 'get',
        url: `${state.baseUrl}/question/${payload}`
      })
        .then(({ data }) => {
          this.commit('SET_A_QUESTION', data)
        })
        .catch(e => {
          console.log(e)
        })
    },
    UPDATE_DETAILED_QUESTION ({ state }, payload) {
      return axios({
        method: 'patch',
        url: `${state.baseUrl}/question/update-detail/${payload.id}`,
        data: payload,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    EDIT_QUESTION ({ state }, payload) {
      return axios({
        method: 'patch',
        url: `${state.baseUrl}/question/${payload._id}`,
        data: payload,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    DELETE_QUESTION ({ state }, payload) {
      return axios({
        method: 'delete',
        url: `${state.baseUrl}/question/${payload._id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    ADD_ANSWER ({ state }, payload) {
      return axios({
        method: 'post',
        url: `${state.baseUrl}/answer`,
        data: payload,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    GET_ANSWER ({ state }, payload) {
      axios({
        method: 'get',
        url: `${state.baseUrl}/answer/${payload.id}`
      })
        .then(({ data }) => {
          this.commit('ADD_ANSWER_LIST', data)
        })
    },
    UPDATE_DETAILED_ANSWER ({ state }, payload) {
      return axios({
        method: 'patch',
        url: `${state.baseUrl}/answer/update-detail/${payload._id}`,
        data: payload,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    EDIT_ANSWER ({ state }, payload) {
      return axios({
        method: 'patch',
        url: `${state.baseUrl}/answer/${payload._id}`,
        data: payload,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    DELETE_ANSWER ({ state }, payload) {
      return axios({
        method: 'delete',
        url: `${state.baseUrl}/answer/${payload._id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    }
  }
})
