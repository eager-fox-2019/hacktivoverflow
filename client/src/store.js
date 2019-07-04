import Vue from 'vue'
import Vuex from 'vuex'

const errorHandler = require('./helpers/errorHandler')
const toastifyHelper = require('./helpers/toastify')

Vue.use(Vuex)
const BASE_URL = process.env.VUE_APP_BASE_URL
const axios = require('axios')
const jsonwebtoken = require('jsonwebtoken')

function axiosConfig({multiPart} = {}) {
  return {
    headers: {
      token: localStorage.getItem('token'),
    },
    'Content-Type': (multiPart) ? 'multipart/form-data' : 'application/json'
  }
}


export default new Vuex.Store({
  state: {
    loggedUser: {
      fullName: '',
      email: '',
      user: '',
      isAdmin: false
    },
    questions: [],
    questionDetail: {},
    answerDetail: {},
  },
  mutations: {
    SET_LOGIN(state, payload) {
      state.loggedUser = payload
    },
    INIT_APP(state, payload) {
      state.loggedUser = payload
    },
    LOGOUT(state) {
      toastifyHelper('Logged Out!')
      state.loggedUser.fullName = ''
      state.loggedUser.email = ''
      state.loggedUser.user = ''
      state.loggedUser.isAdmin = false
    },
    FETCH_QUESTION(state, payload) {
      state.questions = payload
    },
    FETCH_QUESTION_DETAIL (state, payload) {
      state.questionDetail = payload
    },
    FETCH_ANSWER_DETAIL (state, payload) {
      state.answerDetail = payload
    }
  },
  actions: {
    initApp(context) {
      let token = localStorage.getItem('token')
      if (token) {
        let decodedPayload = jsonwebtoken.decode(token)
        if (Date.now() >= decodedPayload.exp * 1000) {
          localStorage.clear()
          return
        }
        let { email, fullName, isAdmin, user } = decodedPayload
        context.commit('INIT_APP', { email, fullName, isAdmin, user })
        return true
      } else {
        return false
      }
    },
    async login(context, payload) {
      let { email, password } = payload
      try {
        let res = await axios.post(`${BASE_URL}/user/login`, { email, password })
        let token = res.data.access_token
        if (token) {
          localStorage.setItem('token', token)
          let decodedPayload = jsonwebtoken.decode(token)
          let { email, fullName, isAdmin, user } = decodedPayload
          context.commit('SET_LOGIN', { email, fullName, isAdmin, user })
          toastifyHelper('Login Success!')
          return res
        } else {
          toastifyHelper('Login Failed! <No Token Provided>')
          console.error('No token provided from the API', res)
          return false
        }
      } catch (err) {
        toastifyHelper('Login Failed!')
        errorHandler(err)
        return false
      }
    },
    async register (context, payload) {
      let { email, password, fullName } = payload
      try {
        let res = await axios.post(`${BASE_URL}/user/register`, { email, password, fullName })
        toastifyHelper('Register Succesful!')
        return res
      } catch (err) {
        errorHandler(err)
        return false
      }
    },
    async postQuestion (context, payload) {
      let { title, description } = payload
      try {
        let res = await axios.post(`${BASE_URL}/question`, {title, description}, axiosConfig())
        toastifyHelper('Question posted!')
        return res
      } catch (err) {
        errorHandler(err)
        return false
      }
    },
    async postAnswer (context, payload) {
      let { title, description, question } = payload
      try {
        let res = await axios.post(`${BASE_URL}/answer`, { title, description, question }, axiosConfig())
        toastifyHelper('Answer posted!')
        return res
      } catch (err) {
        errorHandler(err)
        return false
      }
    },
    async fetchQuestion (context, payload) {
      try {
        let res = await axios.get(`${BASE_URL}/question`)
        context.commit('FETCH_QUESTION', res.data)
      } catch (err) {
        errorHandler(err)
        return false
      }
    },
    async fetchQuestionDetail (context, payload) {
      let { id } = payload
      try {
        let res = await axios.get(`${BASE_URL}/question/${id}`)
        context.commit('FETCH_QUESTION_DETAIL', res.data)
      } catch (err) {
        errorHandler(err)
        return false
      }
    },
    async fetchAnswerDetail (context, payload) {
      let { id } = payload
      try {
        let res = await axios.get(`${BASE_URL}/answer/${id}`)
        context.commit('FETCH_ANSWER_DETAIL', res.data)
      } catch (err) {
        errorHandler(err)
        return false
      }
    },
    async voteQuestion (context, payload) {
      let { id, action } = payload
      try {
        let res = await axios.patch(`${BASE_URL}/question/${id}/${action}`, {}, axiosConfig())
        toastifyHelper(`Action ${action} success!`)
        return res
      } catch (err) {
        errorHandler(err)
        return false
      }
    },
    async updateQuestion (context, payload) {
      let { id, title, description } = payload
      try {
        let res = await axios.patch(`${BASE_URL}/question/${id}`, { title, description }, axiosConfig())
        toastifyHelper('Edit success')
        return res
      } catch (err) {
        errorHandler(err)
        return false
      }
    },
    async deleteQuestion (context, payload) {
      let { id } = payload
      try {
        let res = await axios.delete(`${BASE_URL}/question/${id}`, axiosConfig())
        toastifyHelper('A question just got deleted')
        return res
      } catch (err) {
        errorHandler(err)
        return false
      }
    }
  }
})
