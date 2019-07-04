import Vue from 'vue'
import Vuex from 'vuex'
import Swal from 'sweetalert2'
import myServer from './api/myServer.js'
import { stat } from 'fs';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    username: localStorage.getItem('name'),
    id: localStorage.getItem('id'),
    allQuestions: [],
    myQuestions: []
  },
  mutations: {
    USER_LOGIN_MUTATION (state, payload) {
      state.isLogin = true
      state.username = payload.name
    },
    USER_LOGIN_VERIFY (state) {
      console.log('verify trueeeeeeee')
      state.isLogin = true
    },
    USER_LOGOUT_MUTATION (state) {
      state.isLogin = false
      localStorage.removeItem('token')
      localStorage.removeItem('name')
      localStorage.removeItem('id')
      localStorage.removeItem('email')
    },
    INSERT_NEW_QUESTION (state, payload) {
      console.log('INSERT_NEW_QUESTION')
      state.allQuestions.unshift(payload)
      state.myQuestions.unshift(payload)
    },
    INSERT_FETCH_QUESTION (state, payload) {
      console.log('INSERT_FETCH_QUESTION')
      state.allQuestions = payload
      // console.log(payload, "payload")
      console.log(state.id," id nyaaaaaaa")
      state.myQuestions = payload.filter(el => (el.author._id == state.id))
      // console.log(state.myQuestions)
    },
    UPDATE_AFTER_DELETE (state, payload) {
      console.log(payload._id)
      state.allQuestions = state.allQuestions.filter(el => (el._id !== payload._id ))
      state.myQuestions = state.myQuestions.filter(el => (el._id !== payload._id ))
    },
    UPDATE_AFTER_UPDATE (state, payload) {
      console.log('masuk after update')
      console.log(payload, ' ini payload')
      state.allQuestions = state.allQuestions.map(el=>{
          if(el._id === payload._id){
              el.title = payload.title
              el.description = payload.content
              el.tags = payload.tags
          }
          return el
      })
    }
  },
  actions: {
    LOGIN_ACTION ({ state, commit }, payload) {
      myServer
      .post('/login', {
        email: payload.email,
        password: payload.password
      })
      .then(({ data }) => {
        console.log(data)
        localStorage.setItem('token', data.token)
        localStorage.setItem('name', data.name)
        localStorage.setItem('id', data.id)
        commit('USER_LOGIN_MUTATION', data)
        Swal.fire({
          position: 'center',
          type: 'success',
          title: `welcome ${ data.name }`,
          showConfirmButton: false,
          timer: 1500
        })
      })
      .catch((err) => {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: `${ err.response.data.message }`,
        })
      })
    },
    POST_QUESTION_ACTION ({ state, commit }, payload) {
      console.log('POST_QUESTION_ACTION')
      myServer
      .post('/questions', {
        title: payload.title,
        description: payload.description,
        tags: payload.tags
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        console.log(data)
        commit('INSERT_NEW_QUESTION', data)
      })
      .catch((err) => {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: `${ err.response.data.message }`,
        })
      })
    },
    FETCH_DATA_QUESTION ({ state, commit }) {
      console.log('FETCH_DATA_QUESTION')
      myServer
      .get('/questions')
      .then(({ data }) => {
        console.log(data)
        commit('INSERT_FETCH_QUESTION', data)
        // commit("USER_LOGIN_MUTATION");
      })
      .catch((err) => {
        console.log(err)
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: `${ err.response.data.message }`,
        })
      })
    },
    LOGIN_VERIFY ({commit}) {
      console.log('masuk verify')
      console.log(localStorage.getItem('token'))
      myServer.get("/verify", {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          // console.log('masuk then verify')
          // console.log(data)
          // console.log('panggil USER_LOGIN_VERIFY')
          commit('USER_LOGIN_VERIFY')
      })
        .catch(err => {
          console.log('masuk err', err)
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: `${err.response}`
          });
        });
    },
    DELETE_QUESTION ({ state, commit }, payload) {
      console.log('DELETE_QUESTION')
      myServer
      .delete(`/questions/${payload}`, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        console.log(data)
        console.log('deleted sukses')
        commit('UPDATE_AFTER_DELETE', data)
        // commit("USER_LOGIN_MUTATION");
      })
      .catch((err) => {
        console.log(err)
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: `${ err.response.data.message }`,
        })
      })
    },
  }
})
