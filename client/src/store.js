import Vue from 'vue'
import Vuex from 'vuex'
import myaxios from '@/api/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    loginUser: {},
    questions: [],
    myQuestions: [],
    answers: [],
    questionsByTag: [],
    watchedTagsQuestions: []
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
    },
    answers: state => {
      return state.answers
    },
    questionsByTag: state => {
      return state.questionsByTag
    },
    watchedTags: state => {
      return state.loginUser.watchedTags
    },
    watchedTagsQuestions: state => {
      return state.watchedTagsQuestions
    },
  },
  // this.$store.commit
  mutations: {
    SET_IS_LOGIN_STATUS (state, payload) {
      state.isLogin = payload
    },
    SET_USER (state, payload) {
      state.loginUser = payload
    },
    SET_QUESTIONS(state,payload){
      state.questions = payload
    },
    ADD_QUESTIONS(state, payload){
      state.questions.push(payload);
    },
    EDIT_QUESTIONS(state, payload) {
      state.questions = state.questions.map(question=> {
        if(question._id === payload._id) {
          question = payload
        }

        return question
      })
    },
    DELETE_QUESTIONS(state, payload) {
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
    },
    ADD_MY_QUESTIONS(state, payload){
      state.myQuestions.push(payload);
    },
    EDIT_MY_QUESTIONS(state, payload) {
      state.myQuestions = state.myQuestions.map(question=> {
        if(question._id === payload._id) {
          question = payload
        }

        return question
      })
    },
    DELETE_MY_QUESTIONS(state, payload) {
      state.myQuestions = state.myQuestions.filter(
        e => {
          if(e._id !== payload._id) {
              return e;
          }
        }
      )
    },
    SET_ANSWERS(state, payload) {
      state.answers = payload
    },
    ADD_ANSWERS(state, payload) {
      state.answers.push(payload);
    },
    EDIT_ANSWERS(state, payload) {
      state.answers = state.answers.map(answer => {
        if(answer._id === payload._id) {
          answer = payload
        }

        return answer
      })
    },
    DELETE_ANSWERS(state, payload) {
      state.answers = state.answers.filter(
        e => {
          if(e._id !== payload._id) {
              return e;
          }
        }
      )
    },
    SET_QUESTIONS_BY_TAG(state, payload) {
      state.questionsByTag = payload
    },
    SET_WATCHED_TAGS(state, payload) {
      state.watchedTags = payload
    },
    SET_WATCHED_TAGS_QUESTION(state, payload) {
      state.watchedTagsQuestions = payload
    }
  },
  // this.$store.dispatch
  actions: {
    getQuestion(context){
      myaxios
      .get('/questions')
      .then(({ data }) => {
        context.commit('SET_QUESTIONS', data)
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
        console.log(error.response);
      })
    },
    addNewQuestion(context,payload) {
      myaxios.defaults.headers.common['token'] = localStorage.token

      myaxios
      .post('/questions/ask', payload)
      .then(({ data }) => {
        context.commit('ADD_QUESTIONS', data)
        context.commit('ADD_MY_QUESTIONS', data)
      })
      .catch(error => {
        console.log(error.response);
      })
    },
    deleteQuestion(context, id) {
      myaxios.defaults.headers.common['token'] = localStorage.token

      myaxios
      .delete(`/questions/${id}`)
      .then(({ data }) => {
        context.commit('DELETE_QUESTIONS', data)
        context.commit('DELETE_MY_QUESTIONS', data)
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
    },
    getQuestionByTags(context, tags) {
      myaxios
      .post('/tags', {
          tags
      })
      .then(({data}) => {
        context.commit('SET_QUESTIONS_BY_TAG', data)
      })
      .catch(err => {
          console.log(err);
      })
    },
    addWatchedTags(context, tags) {
      myaxios.defaults.headers.common['token'] = localStorage.token

      myaxios
      .patch(`/users/tags/push`, {tags: tags})
      .then(({data}) => {
        context.commit('SET_WATCHED_TAGS', data.watchedTags)
        context.commit('SET_USER', data)
      })
      .catch(err => {
        console.log(err.response);
      })
    },
    removeWatchedTags(context, tags) {
      myaxios.defaults.headers.common['token'] = localStorage.token

      myaxios
      .patch(`/users/tags/pull`, {tags: tags})
      .then(({data}) => {
        context.commit('SET_WATCHED_TAGS', data.watchedTags)
        context.commit('SET_USER', data)
      })
      .catch(err => {
        console.log(err.response);
      })
    },
    getWatchedTagsQuestions({commit, getters},) {
      myaxios.defaults.headers.common['token'] = localStorage.token 

      setTimeout(() => {
        myaxios
        .post('/tags/watchedtags', {tags:getters.watchedTags})
        .then(({data}) => {
            commit('SET_WATCHED_TAGS_QUESTION', data)
        })
        .catch(err => {
            console.log(err.response);
        })
      }, 400);
    }
  }
})
