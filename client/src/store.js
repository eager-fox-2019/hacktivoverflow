import Vue from 'vue'
import Vuex from 'vuex'
import ax from './axiosApi'
import { stat } from 'fs';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    questions: [],
    answers: [],
    myquestions: [],
    onequestion: '',
    upvotes: '',
    downvotes: '',
    isLogin: false

  },
  mutations: {
    ISLOGIN(state, data) {
      state.isLogin = data
    },
    QUESTIONLIST(state, payload) {
      state.questions = payload
    },
    MYQUESTIONLIST(state, payload) {
      state.myquestions = payload
    },
    ANSWERLIST(state, payload) {
      state.answers = payload
    },
    NEWANSWER(state, payload) {
      state.answers.push(payload)
    },
    NEWQUESTION(state, payload) {
      state.questions.push(payload)
    },
    UPVOTES(state, payload) {
      state.upvotes = payload
    },
    DOWNVOTES(state, payload){
      state.downvotes = payload
    },
    ONEQUESTION(state, payload){
      state.onequestion = payload
    }
  },
  actions: {
    GETQUESTION(context) {
      ax.get('/questions').then(({ data }) => {
        context.commit('QUESTIONLIST', data)
      })
        .catch(err => {
          console.log(err)
        })
    },
    GETANSWER(context, id) {
      ax.get(`/answers/${id}`).then(({ data }) => {
        context.commit('ANSWERLIST', data)
      })
        .catch(err => {
          console.log(err)
        })
    },
    GETMYQUESTION(context) {
      ax.get('/questions/myquestion', {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        console.log(data);
        context.commit('MYQUESTIONLIST', data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    GETONEQUESTION(context, id) {
      ax.get(`/questions/detail/${id}`, {
        headers: {
          token: localStorage.getItem('token')
        }
      }).then(({ data }) => {
        context.commit('UPVOTES', data.upvotes.length)
        context.commit('DOWNVOTES', data.downvotes.length)
        context.commit('ONEQUESTION',data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    CREATEQUESTION(context, payload) {
      ax.post('/questions', payload, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          context.commit('NEWQUESTION', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    CREATEANSWER(context, payload) {
      ax.post('/answers', payload, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          context.commit('NEWANSWER', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    DELETEQUESTION(context,id){
      ax.delete(`/questions/${id}`,{
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data})=>{
        context.dispatch('GETQUESTION')
        context.dispatch('GETMYQUESTION')
      })
      .catch(err=>{
        console.log(err);
        
      })
    },
    EDITQUESTION(context,payload){
      ax.put(`/questions/${payload.id}`,{
        title: payload.title,
        description: payload.desc  
      },{
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data})=>{
        console.log('berhasil editq');
        context.dispatch('GETQUESTION')
        context.dispatch('GETONEQUESTION',payload.id)
      })
      .catch(err=>{
        console.log(err);
        
      })
    },
    EDITANSWER(context,payload){
      ax.put(`/answers/${payload.id}`,{
        description: payload.desc  
      },{
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data})=>{
        console.log('berhasil edita');
        context.dispatch('GETANSWER')
        // context.dispatch('GETONEQUESTION',payload.id)
      })
      .catch(err=>{
        console.log(err);
        
      })
    }
  }
})
