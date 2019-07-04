import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin : false,
    questions: [],
    questionsByTags: [],
    tags: [],
    jobs: []
  },
  mutations: {
    haveLoged (state) {
      state.isLogin = true
    },
    getQuestion(state, payload) {
      state.questions = payload
    },
    getQuestionByTag(state, payload) {
      state.questionsByTags = payload
    },
    getTag(state,payload) {
      state.tags = payload
    },
    tagChange(state,payload) {
      state.tags = payload
    },
    getJobs(state, payload) {
      state.jobs = payload
    }
  },
  actions: {
    
  }
})
