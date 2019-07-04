import Vue from 'vue'
import Vuex from 'vuex'
import ax from './api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    page: 'login',
    isLogin: false,
    allQ: [],
    currentQ: {
      userId:{
        userName: ''
      },
      answers: [],
      upvotes: [],
      downvotes: []
    },
    user: {},
    userposts: []
  },
  mutations: {
    isLogin(state){
      state.isLogin = true
    },
    logout(state){
      localStorage.clear()
      state.isLogin = false
      state.user = {}
    },
    changePage(state, data){
      state.page = data
    },
    userdata(state, data) {
      state.user = data
    },
    allQ(state, data){
      state.allQ = data
    },
    currentQ(state, data){
      state.currentQ = data
    },
    userposts(state, data){
      state.userposts = data
    }
  },
  actions: {
    REGISTER(context, data) {
      ax
        .post("/users/signup", data)
        .then(({
          data
        }) => {
          console.log(data)
        })
        .catch((err) => {
          Swal.fire({
            title: 'test'
          })
        })
    },
    LOGIN(context, data) {
      ax
        .post("/users/signin", data)
        .then(({
          data
        }) => {
          localStorage.token = data.token
          context.dispatch('USERDATA')
          context.dispatch("USERQUESTION")
        })
        .catch((err) => {
          Swal.fire({
            title: 'test'
          })
        })
    },
    USERDATA(context, data) {
      ax.get("/users/userdata", {
          headers: {
            token: localStorage.token
          }
        })
        .then(({
          data
        }) => {
          context.commit('userdata', data)
          context.commit('isLogin')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    ALLQUESTION(context, data) {
      ax
        .get("/questions")
        .then(({
          data
        }) => {
          context.commit('allQ', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    TAGQUESTION(context, data) {
      ax
        .get("/questions/search/tags/" + data)
        .then(({
          data
        }) => {
          context.commit('allQ', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    SEARCHQUESTION(context, data) {
      ax
        .get("/questions/search/" + data)
        .then(({
          data
        }) => {
          context.commit('allQ', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    USERQUESTION(context, data) {
      ax
        .get("/questions/user/posts", {
          headers: {
            token: localStorage.token
          }
        })
        .then(({
          data
        }) => {
          context.commit('userposts', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    ONEQUESTION(context, data) {
      ax
        .get("/questions/" + data)
        .then(({
          data
        }) => {
          context.commit('currentQ', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    NEWQUESTION(context, data) {
      ax
        .post("/questions", data, {
          headers: {
            token: localStorage.token
          }
        })
        .then(({
          data
        }) => {
          context.dispatch('ONEQUESTION', data._id)
          context.dispatch('ALLQUESTION')
          context.dispatch("USERQUESTION")
        })
        .catch((err) => {
          console.log(err)
        })
    },
    UPDATEQUESTION(context, data) {
      ax
        .patch("/questions/" + context.state.currentQ._id, data, {
          headers: {
            token: localStorage.token
          }
        })
        .then(({
          data
        }) => {
          context.dispatch('ONEQUESTION', data._id)
          context.dispatch("ALLQUESTION")
          context.dispatch("USERQUESTION")
        })
        .catch((err) => {
          console.log(err)
        })
    },
    DELETEQUESTION(context, data) {
      ax
        .delete("/questions/" + data, {
          headers: {
            token: localStorage.token
          }
        })
        .then(({
          data
        }) => {
          context.dispatch("ALLQUESTION")
          context.dispatch("USERQUESTION")
        })
        .catch((err) => {
          console.log(err)
        })
    },
    UPVOTEQUESTION(context, data) {
      ax
        .patch("/questions/upvotes/" + data, data,{
          headers: {
            token: localStorage.token
          }
        })
        .then(({
          data
        }) => {
          context.dispatch('ONEQUESTION', context.state.currentQ._id)
          context.dispatch("ALLQUESTION")
          context.dispatch("USERQUESTION")
        })
        .catch((err) => {
          console.log(err)
        })
    },
    DOWNVOTEQUESTION(context, data) {
      ax
        .patch("/questions/downvotes/" + data, data,{
          headers: {
            token: localStorage.token
          }
        })
        .then(({
          data
        }) => {
          context.dispatch('ONEQUESTION', context.state.currentQ._id)
          context.dispatch("ALLQUESTION")
          context.dispatch("USERQUESTION")
        })
        .catch((err) => {
          console.log(err)
        })
    },
    NEWANSWER(context, data) {
      data.questionId = context.state.currentQ._id
      ax
        .post("/answers", data, {
          headers: {
            token: localStorage.token
          }
        })
        .then(({
          data
        }) => {
          context.dispatch('ONEQUESTION', context.state.currentQ._id)
          context.dispatch("ALLQUESTION")
        })
        .catch((err) => {
          console.log(err)
        })
    },
    UPDATEANSWER(context, data) {
      ax
        .patch("/answers/" + data.answerId, data.data, {
          headers: {
            token: localStorage.token
          }
        })
        .then(({
          data
        }) => {
          context.dispatch('ONEQUESTION', context.state.currentQ._id)
          context.dispatch("ALLQUESTION")
        })
        .catch((err) => {
          console.log(err)
        })
    },
    UPVOTEANSWER(context, data) {
      ax
        .patch("/answers/upvotes/" + data, data, {
          headers: {
            token: localStorage.token
          }
        })
        .then(({
          data
        }) => {
          context.dispatch('ONEQUESTION', context.state.currentQ._id)
          context.dispatch("ALLQUESTION")
        })
        .catch((err) => {
          console.log(err)
        })
    },
    DOWNVOTEANSWER(context, data) {
      ax
        .patch("/answers/downvotes/" + data, data, {
          headers: {
            token: localStorage.token
          }
        })
        .then(({
          data
        }) => {
          context.dispatch('ONEQUESTION', context.state.currentQ._id)
          context.dispatch("ALLQUESTION")
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
})
