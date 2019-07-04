import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: "",
    username: "",
    isLogin: false,
    msg: "",
    singleQuestion : null,
    allQuestion: [],
    MyQuestion : []

  },
  mutations: {
    fetchMyQuestion(state, MyQuestion){
        state.MyQuestion = MyQuestion
    },
    fetchSingleQuestion(state, singleQuestion){
  
        state.singleQuestion = singleQuestion
    },
    fetchUserProfile(state, gotData) {
      state.username = gotData.username
      state.userId = gotData.id
      state.isLogin = true

    },
    logout(state) {
      localStorage.clear()
      state.username = ""
      state.userId = ""
      state.isLogin = false
    },
    errMsg(state, msg) {
      state.errMsg = msg
    },
    fetchAllQuestion(state, data){
        state.allQuestion = data
    } 
  },
  actions: {

    register(context, payload) {
      return new Promise((resolve, reject) => {
        console.log("Masuk register actions");
        console.log(payload);
        axios({
            method: 'post',
            url: 'http://3.19.14.51:80/user/register',
            responseType: 'json',
            data: {
              first_name: payload.first_name,
              last_name: payload.last_name,
              username: payload.username,
              email: payload.email,
              password: payload.password,
            }

          })
          .then(({
            data
          }) => {
            localStorage.setItem('token', data.token)
            localStorage.setItem('id', data.id)
            localStorage.setItem('username', data.username)
            context.commit('fetchUserProfile', data)
            context.commit('fetchAllQuestion', data)
            resolve()
          })
          .catch(err => {
            context.commit('errMsg', err)
            reject(err)
          })
      })

    },
    login(context, payload) {
      return new Promise((resolve, reject) => {
        console.log("Masuk login actions");
        console.log(payload);
        axios({
            method: 'post',
            url: 'http://3.19.14.51:80/user/login',
            responseType: 'json',
            data: {
              username: payload.username,
              password: payload.password
            }

          })
          .then(({data}) => {

            localStorage.setItem('token', data.token)
            localStorage.setItem('id', data.id)
            localStorage.setItem('username', data.username)
            context.commit('fetchUserProfile', data)
            context.dispatch('fetchAllQuestion')
            resolve()
          })
          .catch(err => {
            reject(err)
            console.log(err.response.data.message, "ini error nya");
            context.commit('errMsg', err)
          })
      })

    },
    fetchAllQuestion(context){
      axios({
        method: 'get',
        url: 'http://3.19.14.51:80/question',
        responseType: 'json',
        headers : {
          token : localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        // console.log(data);
        
          context.commit('fetchAllQuestion', data)
        
      })
      .catch(err => {
        console.log(err.message, "ini error nya");
        context.commit('errMsg', err)
      })
    },

    fetchMyQuestion(context){
      console.log("Masuk action my question");
      axios({
        method: 'get',
        url: 'http://3.19.14.51:80/question/mypost',
        responseType: 'json',
        headers : {
          token : localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        context.commit('fetchMyQuestion', data)
        
      })
      .catch(err => {
        console.log(err.message, "ini error nya");
        context.commit('errMsg', err)
      })
    },

    addNewPost(context,payload){
      return new Promise((resolve,reject)=>{
        axios({
          method: 'post',
          url: 'http://3.19.14.51:80/question/create',
          responseType: 'json',
          data : {
            title: payload.title,
            content: payload.content,
            category : payload.category
          },
          headers : {
            token : localStorage.getItem('token')
          }
        })
        .then(({data}) => {
            context.dispatch('fetchAllQuestion')
            resolve()
          
        })
        .catch(err => {
          console.log(err.message, "ini error nya");
          context.commit('errMsg', err)
          reject(err)
        })
      })
      
    },
    findOneQuestion(context,payload){

      axios({
        method: 'get',
        url: `http://3.19.14.51:80/question/${payload}`,
        responseType: 'json',
        headers : {
          token : localStorage.getItem('token')
        }
      })
      .then(({data}) => {
          context.commit('fetchSingleQuestion', data)
          
        
      })
      .catch(err => {
        // console.log(err.message, "ini error nya");
        context.commit('errMsg', err)
      })
    },

    createNewAnswer(context, payload){
      console.log(payload, "Masuk Payload");
      
      axios({
        method: 'post',
        url: `http://3.19.14.51:80/answer/create`,
        responseType: 'json',
        data : {
          content : payload.content,
          questionId : payload.questionId
        },
        headers : {
          token : localStorage.getItem('token')
        }
      })
      .then(({data}) => {
          context.commit('fetchSingleQuestion', data)
          
        
      })
      .catch(err => {
        // console.log(err.message, "ini error nya");
        // context.commit('errMsg', err)
      })
    },

    upVoteQuestion(context, payload){
      axios({
        method: 'patch',
        url: `http://3.19.14.51:80/question/like/${payload.questionId}`,
        responseType: 'json',
        data : {
          QuestionId : payload.questionId,
        },
        headers : {
          token : localStorage.getItem('token')

        }
      })
      .then(({data}) => {
        context.commit('fetchSingleQuestion', data)
      })
      .catch(err => {
        console.log(err.message, "ini error nya");
        // context.commit('errMsg', err)
      })
    },

    downVoteQuestion(context, payload){
      axios({
        method: 'patch',
        url: `http://3.19.14.51:80/question/dislike/${payload.questionId}`,
        responseType: 'json',
        data : {
          QuestionId : payload.questionId,
        },
        headers : {
          token : localStorage.getItem('token')

        }
      })
      .then(({data}) => {
        context.commit('fetchSingleQuestion', data)
      })
      .catch(err => {
        console.log(err.message, "ini error nya");
        // context.commit('errMsg', err)
      })
    }



  }

})
