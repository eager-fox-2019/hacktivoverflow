import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { stat } from 'fs';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    registerState : {},
    loginState : {},
    isLogin : 'false',
    allQuestion : {},
    oneQuestion : {},
    createAquestion : {},
    thisTheAnswer : {},
    valueUp : 0,
    valueDown : 0,
    editing : {},
    deleting : {}
    // ini kalo mau kirim kemana2. kalo di state kan bisa diambil sama banyak tempat

  },
  mutations: {
    REGISTER(state, payload){
      state.registerState = payload
    },
    LOGIN(state, payload){
      state.loginState = payload
    },
    CEKLOGIN(state){
      state.isLogin = 'true'
    },
    QUESTIONDATA(state, payload){
      state.allQuestion = payload
    },
    GETONEDATA(state, payload){
      state.oneQuestion = payload
    },
    GOCREATEDATA(state, payload){
      state.createAquestion = payload
    },
    HERETHEANSWER(state, payload){
      state.thisTheAnswer = payload
    },
    UPVOTE(state, payload){
      state.valueUp = payload.final.upvotes.length
    },
    DOWNVOTE(state, payload){
      state.valueDown = payload.final.downvotes.length
    },
    EDIT(state, payload){
      state.editing = payload
    },
    DELETE(state, payload){
      state.deleting = payload
    }

  },
  actions: {
    goRegister(context, payload){
      axios.post('http://localhost:3000/user/signup', payload)
      .then(({data}) => {
        console.log('register success')
        context.commit('REGISTER', data)
        this.Srouter.push('/login')
      })
      .catch(err)
    },
    goLogin(context, payload){
      console.log('masuk ke login axios')
      return axios.post('http://localhost:3000/user/signin', payload)
      .then(({data}) => {
        context.commit('LOGIN', data.payload)
        console.log('success login', data)
        localStorage.setItem("token", `${data.token}`)
        return true
      })
    },
    getQuestion(context){
      let thisToken = localStorage.getItem("token")
      axios.get('http://localhost:3000/question/showAll', {headers : {token : thisToken}})
      .then(({data}) => {
        console.log(data, 'ini data')
        context.commit('QUESTIONDATA', data)
      })
    },
    getQuestionOne(context, payload){
      console.log(payload, 'ini apa?')
      axios.get(`http://localhost:3000/question/getOne/${payload}`, {headers : {token : localStorage.getItem("token")}})
      .then(({data}) => {
        console.log('ini data', data)
        context.commit('GETONEDATA', data)
      })
    },
    createQuestion(context, payload){
      return axios.post('http://localhost:3000/question/create', payload, {headers : { token : localStorage.getItem("token")}})
      .then(({data}) => {
        context.commit('GOCREATEDATA', data)
        return true
      })
    },
    createAnswer(context, payload){
      console.log('sampai sini', payload)
      return axios.post(`http://localhost:3000/question/answer/${payload.QidS}`, {title : payload.title, description : payload.description}, {headers : {token : localStorage.getItem("token")}})
      .then(({data}) => {
        context.commit('HERETHEANSWER', data)
        return true
      })
    },
    voteUp(context, payload){
      axios.patch(`http://localhost:3000/question/upvote/${payload}`, null, {headers : {token : localStorage.getItem("token")}})
      .then(({data}) => {
        context.commit('UPVOTE', data)
        console.log(data, 'data up')
      })
    },
    voteDown(context, payload){
      axios.patch(`http://localhost:3000/question/downvote/${payload}`,null, {headers : {token : localStorage.getItem("token")}})
      .then(({data}) => {
        context.commit('DOWNVOTE' ,data)
        console.log(data, 'data down')
      })
    },
    storeEdit(context, payload){
      console.log('ini apa?', payload, '==================================')
      axios.patch(`http://localhost:3000/question/editQuestion/${payload.Qid}/${payload.Uid}`, {title : payload.title, description : payload.description}, {headers : {token : localStorage.getItem("token")}})
      .then(({data}) => {
        context.commit('EDIT', data)
      })
    },
    storeDelete(context, payload){
      axios.delete(`http://localhost:3000/question/delete/${payload.questId}/${payload.UserId}`, {headers : {token : localStorage.getItem("token")}})
      .then(({data}) => {
        context.commit('DELETE', data)
      })
    }
  }
})

// ...mapState
