import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
// import axios from './main';
import VueSwal from 'vue-swal'
// import axios from './main';
import axios from './api/axios'

Vue.use(Vuex)
Vue.use(VueSwal)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    allQuestions: [],
    myQuestions: [],
    myAnswers: [],
    tags:[],
    mytags:[]
  },
  mutations: {
    verify(state, payload) {
      state.isLoggedIn = true
    },
    login(state, payload) {
      state.isLoggedIn = true
    },
    logout(state, payload) {
      state.isLoggedIn = false
    },
    getQuestions(state, payload) {
      state.allQuestions = payload
    },
    getUserQuestions(state, payload) {
      state.myQuestions = payload
    },
    getUserAnswers(state, payload) {
      state.myAnswers = payload
    },
    getQuestionTags(state,payload){
      state.tags = payload
    },
    getMyTags(state,payload){
      state.mytags = payload
    }
  },
  actions: {
    verify({ commit }) {
      commit('verify')
    },
    login({ commit, dispatch }, payload) {
      const { email, password } = payload
      axios
        .post(`/users/signIn`, {
          email,
          password
        })
        .then(({ data }) => {
          const { token, details } = data;
          const { email, id } = details;
          localStorage.setItem("token", token);
          localStorage.setItem("email", email);
          localStorage.setItem("UserId", id);
          commit("login");
          dispatch('getQuestions')
          dispatch('getUserQuestions')
          dispatch('getUserAnswers')
          swal(data.message, "Welcome back!", "success");
          router.replace("/dashboard");
        })
        .catch(err => {
          console.log(err)
          const { message } = err.response.data;
          swal("Error!", message, "error");
        });
    },
    getQuestions({ commit , dispatch},payload) {
      let token = localStorage.getItem('token')
      if(payload){
        axios
          .get(`/questions?tags=${payload}`, { headers: { token } })
          .then(({ data }) => {
            commit('getQuestions', data)
          })
          .catch((err) => {
            console.log(err)
          })
      }
      else{
        axios
          .get('/questions', { headers: { token } })
          .then(({ data }) => {
            commit('getQuestions', data)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    getTags({ commit }){
      let token = localStorage.getItem('token')
      axios
        .get('/questions/tags', { headers: { token } })
        .then(({data}) => {
            commit('getQuestionTags',data)
         })
        .catch((err) => {
          console.log(err)
        })
    },
    createQuestion({ commit, dispatch }) {
      dispatch('getQuestions')
      dispatch('getUserQuestions')
    },
    getUserQuestions({ commit }) {
      let token = localStorage.getItem('token')
      axios
        .get('/questions/myQuestions', { headers: { token } })
        .then(({ data }) => {
          commit('getUserQuestions', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getUserAnswers({ commit }) {
      let token = localStorage.getItem('token')
      axios
        .get('/answers/myAnswers', { headers: { token } })
        .then(({ data }) => {
          commit('getUserAnswers', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    addTag({ commit, dispatch } , payload){
      let token = localStorage.getItem('token')
      let input = {
        tags:payload
      }
      console.log('hasilll',input)
      axios
        .put('/users/tag', input ,{ headers: { token } })
        .then(({data}) => {
          dispatch('getUserTag')
          console.log(data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getUserTag({ commit }, payload){
      let token = localStorage.getItem('token')
      axios
        .get('/users/mytag', { headers: { token } })
        .then(({ data }) => {
          commit('getMyTags', data.tags)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
})
