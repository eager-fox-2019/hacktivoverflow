import Vue from 'vue'
import Vuex from 'vuex'
import server from './api/server'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin : localStorage.getItem('access_token') ? true : false,
    dataQuestions : [],
    dataDetails : '',
    problem : ''
  },
  mutations: {
    changeIsLogin(state, payload){
      state.isLogin = payload
    },
    allQuestions(state, payload){
      state.dataQuestions = payload
    },
    details(state, payload){
      state.dataDetails = payload
    },
    logout(state, payload){
      state.isLogin = false
    }
  },
  actions: {
    login(context, payload){
      return new Promise ((resolve, reject) => {
        server({
          url : '/login',
          method : 'POST',
          data : payload
        })
          .then(({data}) => {
            localStorage.setItem('access_token', data.access_token)
            localStorage.setItem('userId', data.userId)
            context.commit('changeIsLogin', true)
            resolve(true)
          })
          .catch(err => {
            console.log(err);
            reject(false)
          })
      })
    },
    register(context, payload){
      return new Promise ((resolve, reject) => {
        server({
          url : '/register',
          method : 'POST',
          data : payload
        })
          .then(({data}) => {
            context.commit('changeIsLogin', false)
            resolve(true)
          })
          .catch(err => {
            console.log(err);
            reject(false)
          })
      })
    },
    getAllQuestions(context, payload){
      return new Promise ((resolve, reject) => {
        server({
          url : '/questions'
        })
          .then(({data}) => {
            context.commit('allQuestions', data)
            resolve(true)
          })
          .catch(err => {
            console.log(err);
            reject(false)
          })
      })
    },
    upvote(context, payload){
      if(payload[0] === 'questions'){
        return new Promise ((resolve, reject) => {
          server({
            url : `/questions/upvote/${payload[1]}`,
            method : 'PATCH'
          })
            .then(({data}) => {
              context.dispatch('getAllQuestions')
              resolve(true)
            })
            .catch(err => {
              console.log(err);
              reject(err)
            })
        })
      } else {
        return new Promise ((resolve, reject) => {
          server({
            url : `/answers/upvote/${payload[1]}`,
            method : 'PATCH'
          })
            .then(({data}) => {
              context.dispatch('getDetail', payload[2])
              resolve(true)
            })
            .catch(err => {
              console.log(err);
              reject(err)
            })
        })
      }
    },
    downvote(context, payload){
      if(payload[0] === 'questions'){
        return new Promise ((resolve, reject) => {
          server({
            url : `/questions/downvote/${payload[1]}`,
            method : 'PATCH'
          })
            .then(({data}) => {
              context.dispatch('getAllQuestions')
              resolve(true)
            })
            .catch(err => {
              console.log(err);
              reject(err)
            })
        })
      } else {
        return new Promise ((resolve, reject) => {
          server({
            url : `/answers/downvote/${payload[1]}`,
            method : 'PATCH'
          })
            .then(({data}) => {
              context.dispatch('getDetail', payload[2])
              resolve(true)
            })
            .catch(err => {
              console.log(err);
              reject(err)
            })
        })
      }
    },
    delete(context, payload){
      return new Promise ((resolve, reject) => {
        server({
          url : `/questions/${payload}`,
          method : 'delete'
        })
          .then(({data}) => {
            context.dispatch('getAllQuestions')
            resolve(true)
          })
          .catch(err => {
            console.log(err);
            reject(err)
          })
      })
    },
    edit(context, payload){
      return new Promise ((resolve, reject) => {
        server({
          url : `/questions/${payload[0]}`,
          method : 'PUT',
          data : payload[1]
        })
          .then(({data}) => {
            context.dispatch('getAllQuestions')
            resolve(true)
          })
          .catch(err => {
            console.log(err);
            reject(err)
          })
      })
    },
    addQuestion(context, payload){
      return new Promise ((resolve, reject) => {
        server({
          url : `/questions`,
          method : 'POST',
          data : payload
        })
          .then(({data}) => {
            context.dispatch('getAllQuestions')
            resolve(true)
          })
          .catch(err => {
            console.log(err);
            reject(err)
          })
      })
    },
    getDetail(context, payload){
      return new Promise ((resolve, reject) => {
        server({
          url : `/questions/${payload}`
        })
          .then(({data}) => {
            data.answers = data.answers.sort(function(a, b){return a.createdAt - b.createdAt});
            context.commit('details', data)
            resolve(true)
          })
          .catch(err => {
            console.log(err);
            reject(err)
          })
      })
    },
    createAnswers(context, payload){
      return new Promise ((resolve, reject) => {
        server({
          url : `/questions/${payload[0]}`,
          method : 'POST',
          data : payload[1]
        })
          .then(({data}) => {
            console.log(data, '== ni data baru');
            // context.dispatch('getDetail', payload[0])
            // context.commit('problem', data)
            resolve(data)
          })
          .catch(err => {
            console.log('=================== ni eror', err);
            reject(err)
          })
      }) 
    },
    editAns(context, payload){
      return new Promise ((resolve, reject) => {
        server({
          url : `/answers/${payload[0]}`,
          method : 'PUT',
          data : payload[1]
        })
          .then(({data}) => {
            context.dispatch('getDetail', payload[2])
            resolve(true)
          })
          .catch(err => {
            console.log(err);
            reject(err)
          })
      })
    },
    logout(context, payload){
      localStorage.clear()
      context.commit('logout')
    }
  }
})
