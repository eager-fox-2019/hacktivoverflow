import Vue from 'vue'
import Vuex from 'vuex'
import ax from '@/api/server.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    user: {
      id: '',
      name: '',
      email: '',
      access_token: ''
    },
    allQuestion: [],
    filterQuestion: [],
    selectedQuestion: {},
    selectedQuestionAnswer: [],
    selectedAnswer: {}
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
    FILTER_TITLE (state, payload) {
      let regex = new RegExp('(' + payload + ')', 'i')
      let filterQuestion = []
      for (let i = 0; i < state.allQuestion.length; i++) {
        if (regex.test(state.allQuestion[i].title)) {
          filterQuestion.push(state.allQuestion[i])
        }
      }
      state.filterQuestion = filterQuestion
    },
    SELECT_QUESTION (state, payload) {
      for (let i = 0; i < state.allQuestion.length; i++) {
        if (state.allQuestion[i]._id === payload) {
          state.selectedQuestion = state.allQuestion[i]
        }
      }
    },
    ALL_SELECTED_ANSWER (state, payload) {
      state.selectedQuestionAnswer = payload
    },
    SELECT_ANSWER (state, payload) {
      for (let i = 0; i < state.selectedQuestionAnswer.length; i++) {
        if (state.selectedQuestionAnswer[i]._id === payload) {
          state.selectedAnswer = state.selectedQuestionAnswer[i]
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
    answerCreate (context, payload) {
      return ax({
        method: 'post',
        url: '/answer/create',
        data: payload,
        headers: {
          access_token: this.state.user.access_token
        }
      })
    },
    getAllQuestion (context) {
      return ax({
        method: 'get',
        url: '/question/list'
      })
    },
    questionUpdateDetail (context, payload) {
      return ax({
        method: 'patch',
        url: `/question/update/detail/${this.state.selectedQuestion._id}`,
        data: payload,
        headers: {
          access_token: this.state.user.access_token
        }
      })
    },
    questionUpdateNonDetail (context, payload) {
      return ax({
        method: 'patch',
        url: `/question/update/non-detail/${this.state.selectedQuestion._id}`,
        data: payload,
        headers: {
          access_token: this.state.user.access_token
        }
      })
    },
    getAllAnswer (context) {
      let promise = []
      for (let i = 0; i < this.state.selectedQuestion.answer.length; i++) {
        promise.push(ax({
          method: 'get',
          url: `/answer/${this.state.selectedQuestion.answer[i]}`
        }))
      }
      return Promise.all(promise)
    },
    answerUpdateDetail (context, payload) {
      return ax({
        method: 'patch',
        url: `/answer/update/detail/${this.state.selectedAnswer._id}`,
        data: payload,
        headers: {
          access_token: this.state.user.access_token
        }
      })
    },
    answerUpdateNonDetail (context, payload) {
      return ax({
        method: 'patch',
        url: `/answer/update/non-detail/${this.state.selectedAnswer._id}`,
        data: payload,
        headers: {
          access_token: this.state.user.access_token
        }
      })
    },
    deleteQuestion (context, payload) {
      return ax({
        method: 'delete',
        url: `/question/delete/${payload}`,
        headers: {
          access_token: this.state.user.access_token
        }
      })
    },
    deleteAnswer (context, payload) {
      return ax({
        method: 'delete',
        url: `/answer/delete/${payload}`,
        headers: {
          access_token: this.state.user.access_token
        }
      })
    }
  }
})
