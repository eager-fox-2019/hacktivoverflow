// import state from './state'
// import * as getters from './getters'
// import * as mutations from './mutations'
// import * as actions from './actions'

// const mutations = {
//   CHECK_LOGIN (state) {
//     state.isLogin = true
//   }
// }

import jwt from "jsonwebtoken"
import axios from "axios"
import { date } from "quasar";


export default {
  // namespaced: true,
  // getters,
  // mutations,
  // actions,
  // state,
  state: {
    baseUrl: "http://18.136.102.102/api",
    isLogin: false,
    username: "",
    userId: "",
    posts: [],
    myPosts: [],
    comments: []
  },
  mutations: {
    CHECK_LOGIN (state) {
      const token = sessionStorage.getItem("jwt")
      if(token) {
        const decoded = jwt.decode(token)
        state.username = decoded.username
        state.userId = decoded._id
        state.isLogin = true
      }else{
        state.username = "",
        state.userId = "",
        state.isLogin = false
      }
    },
    SET_POSTS (state, payload) {
      state.posts = payload
    },
    SET_MY_POSTS (state, payload) {
      state.myPosts = payload
    },
    SET_COMMENTS (state, payload) {
      state.comments = payload
    }
  },
  actions: {
    GET_POSTS (context) {
      return new Promise((resolve, reject) =>{
        axios.request({
          method: "GET",
          url: `${this.state.main.baseUrl}/posts/all`,
        })
        .then(posts =>{
          var sorted = posts.data.sort(function(a, b) {
            var dateA = new Date(a.createdAt)
            var dateB = new Date(b.createdAt)
            return dateB - dateA
          })
          console.log(sorted)
          context.commit("SET_POSTS", sorted)
          resolve(posts.data)
        })
        .catch(err =>{
          console.log(err.response)
          reject(err.response)
        })
      })
    },
    GET_MY_POSTS (context, payload) {
      axios.request({
        method: "GET",
        url: `${this.state.main.baseUrl}/posts/myposts?userid=${payload}`,
        headers: {
          token: sessionStorage.getItem("jwt")
        }
      })
      .then(posts =>{
        context.commit("SET_MY_POSTS", posts.data)
      })
      .catch(err =>{
        console.log(err.response)
      })
    },
    GET_COMMENTS (context, payload) {
      return new Promise((resolve, reject) =>{
        axios.request({
          method: "GET",
          url: `${this.state.main.baseUrl}/comments/all?postid=${payload}`,
          headers: {
            token: sessionStorage.getItem("jwt")
          }
        })
        .then(comments =>{
          context.commit("SET_COMMENTS", comments.data)
          resolve(comments.data)
        })
        .catch(err =>{
          console.log(err.response)
          reject(err.response)
        })
      })
    }
  },
  getters: {
    GET_LOGIN_STATUS: state => state.isLogin,
    GET_UPVOTES: (state) => (type, id) =>{
     if(type === "post"){
       var found = state.posts.findIndex(post => post._id === id)
       if(found !== -1){
         return state.posts[found].upvotes.length - state.posts[found].downvotes.length
       }
     }else if(type === "comment"){
       var found2 = state.posts.findIndex(post => post._id === id)
       if(found2 !== -1) {
         return state.comments[found].upvotes.length - state.comments[found].downvotes.length
       }
     }
    }
  }
}
