import Vue from 'vue'
import Vuex from 'vuex'
import myaxios from '@/api/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    loginUser: {},
    questions: [],
    myQuestions: []
  },
  getters: {
    loginUserId: state => {
      return state.loginUser._id
    },
    isLogin: state => {
      return state.isLogin
    },
    loginUser: state => {
      return state.loginUser
    },
    myQuestions: state => {
      return state.myQuestions
    }
  },
  // this.$store.commit
  mutations: {
    SET_IS_LOGIN_STATUS (state, payload) {
      state.isLogin = payload
    },
    SET_USER (state, payload) {
      state.loginUser = payload
    },
    setQuestions(state,payload){
      state.questions = payload
    },
    addNewQuestion(state, payload){
      state.questions.push(payload);
    },
    deleteQuestion(state, payload) {
      state.questions = state.questions.filter(
        e => {
          if(e._id !== payload._id) {
              return e;
          }
        }
      )
    },
    SET_MY_QUESTIONS(state, payload) {
      state.myQuestions = payload
    }
  },
  // this.$store.dispatch
  actions: {
    getQuestion(context){
      myaxios
      .get('/questions')
      .then(({ data }) => {
        context.commit('setQuestions', data)
      })
      .catch(error => {
        console.log(error);
      })
    },
    // buat state baca userlogged tiap refresh
    setLoggedInUser(context) {
      myaxios.defaults.headers.common['token'] = localStorage.token

      myaxios
      .get('/users/userLoggedIn')
      .then(({ data }) => {
        context.commit('SET_IS_LOGIN_STATUS', true)
        context.commit('SET_USER', data)
      })
      .catch(error => {
        console.log(error);
      })
    },
    addNewQuestion(context,payload) {
      myaxios.defaults.headers.common['token'] = localStorage.token

      myaxios
      .post('/questions/ask', payload)
      .then(({ data }) => {
        context.commit('addNewQuestion', data)
      })
      .catch(error => {
        console.log(error);
      })
    },
    deleteQuestion(context, id) {
      myaxios.defaults.headers.common['token'] = localStorage.token

      myaxios
      .delete(`/questions/${id}`)
      .then(({ data }) => {
        context.commit('deleteQuestion', data)
      })
      .catch(error => {
        console.log(error);
      })
    },
    fetchMyQuestions(context) {
      myaxios.defaults.headers.common['token'] = localStorage.token

      myaxios
      .get('/questions/user')
      .then(({data}) => {
          context.commit('SET_MY_QUESTIONS', data)
      })
      .catch(err => {
          console.log(err);
      })
    }
  }
})
