import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    name: '',
    posts: [],
    mypost: [],
    userId: '',
    commentsByPostId: [],
    upvotePost: [],
    downvotePost: []
  },
  mutations: {
    checkLogin (state) {
      if (localStorage.getItem('token')) {
        state.isLogin = true
        state.name = localStorage.getItem('name')
        state.userId = localStorage.getItem('userId')
      } else {
        state.isLogin = false
        state.name = 'Visitor'
        state.userId = false
      }
    },
    retrievePosts (state, data) {
      state.posts = data
    },
    retrieveMyPosts (state, data) {
      state.mypost = data
    },
    retrieveCommentByPostId (state, data) {
      // console.log(data)
      state.commentsByPostId = data
    },
    upvotePost(state, data) {
      state.upvotePost = data
    },
    downvotePost(state, data) {
      state.downvotePost = data
    }
  },
  actions: {
    signIn(context, payload) {
      axios({
          method: "POST",
          url: `http://localhost:3000/users/signin`,
          data: payload
      })      
      .then(({data}) => {
        // console.log(data)
        localStorage.setItem('token', data.token)
        localStorage.setItem('name', data.name)
        localStorage.setItem('userId', data.userId)
        context.commit('checkLogin')
        this.dispatch('retrievePosts')
        this.dispatch('retrieveMyPosts')
        Swal.fire({
          title: `Welcome back ${data.name}!`,
          type: 'success'
        })
      })
      .catch(err => {
        console.log(err)
        Swal.fire({
          title: 'Failed to signin!',
          text: `${err.message}`,
          type: 'error',
          confirmButtonText: 'Ok'
        })
      }) 
    },
    signUp(context, payload) {
      axios({
        method: "POST",
        url: `http://localhost:3000/users/signup`,
        data: payload,
      })   
      .then(({data}) => {
          Swal.fire({
            title: `Signup with username ${payload.name}!`,
            type: 'success'
          })   
      })
      .catch(err => {
          console.log(err)
          Swal.fire({
            title: 'Failed to signup!',
            text: `${err.message}`,
            type: 'error',
            confirmButtonText: 'Ok'
          })
      })
    },
    newPost(context, payload) {
      axios({
        method: "POST",
        url: `http://localhost:3000/posts`,
        data: payload,
        headers: {
          'token': localStorage.getItem('token')
        }
      })   
      .then(({data}) => {
        this.dispatch('retrievePosts')
        this.dispatch('retrieveMyPosts')
        Swal.fire({
          title: `Create a new post!`,
          type: 'success'
        })   
      })
      .catch(err => {
          console.log(err)
          Swal.fire({
            title: 'Failed to create a new post!',
            text: `${err.message}`,
            type: 'error',
            confirmButtonText: 'Ok'
          })
      })
    },
    retrievePosts({commit}) {
      axios({
        method: "GET",
        url: `http://localhost:3000/posts`,
      })   
      .then(({data}) => {
        commit('retrievePosts', data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    retrieveMyPosts({commit}) {
      axios({
        method: "GET",
        url: `http://localhost:3000/posts/userId`,
        headers: {
          'token': localStorage.getItem('token')
        }
      })   
      .then(({data}) => {
        commit('retrieveMyPosts', data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    editPost(context, payload) {
      Swal.fire({
        title: 'Are you sure edit product?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#343A40',
        cancelButtonColor: '#C82333',
        confirmButtonText: 'Yes, edit it!'
      })
      .then((result) => {
        if (result.value) {
          axios({
            method: "PUT",
            url: `http://localhost:3000/posts/${payload._id}`,
            data: payload,
            headers: {
              'token': localStorage.getItem('token')
            }
          })   
          .then(({data}) => {
            Swal.fire({
              title: 'Success edit post!',
              type: 'success'
            })
            // console.log(data, 'result')
            this.dispatch('retrievePosts')
            this.dispatch('retrieveMyPosts')
          })
          .catch(err => {
            Swal.fire({
              title: 'Failed to edit post!',
              text: `${err.message}`,
              type: 'error',
              confirmButtonText: 'Ok'
            })
            console.log(err)
          })
        }
      })
    },
    deletePost(context, payload) {
      Swal.fire({
        title: 'Are you sure to delete product?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#343A40',
        cancelButtonColor: '#C82333',
        confirmButtonText: 'Yes, delete it!'
      })
      .then((result) => {
        if (result.value) {
          axios({
            method: "DELETE",
            url: `http://localhost:3000/posts/${payload}`,
            headers: {
              'token': localStorage.getItem('token')
            }
          })   
          .then(({data}) => {
            console.log(data)
            Swal.fire(
              'Deleted!',
              'Your post has been deleted.',
              'success'
            )
            this.dispatch('retrievePosts')
            this.dispatch('retrieveMyPosts')
          })
          .catch(err => {
            Swal.fire({
              title: 'Failed to delete post!',
              text: `${err.message}`,
              type: 'error',
              confirmButtonText: 'Ok'
            })
            console.log(err)
          })
        }
      })
    },
    newComment(context, payload) {
      axios({
        method: "POST",
        url: `http://localhost:3000/comments`,
        data: payload,
        headers: {
          'token': localStorage.getItem('token')
        }
      })   
      .then(({data}) => {
        let idPost = localStorage.getItem('idPost')
        let obj = {
          idComment : data._id
        }
        axios({
          method: "PUT",
          url: `http://localhost:3000/posts/addcomment/${idPost}`,
          data: obj,
          headers: {
            'token': localStorage.getItem('token')
          }
        })
        .then(comment => {
          console.log(comment)
          Swal.fire({
            title: `Create a new comment!`,
            type: 'success'
          })  
        })
        .catch(err => {
          Swal.fire({
            title: 'Failed to create a new comment!',
            text: `${err.message}`,
            type: 'error',
            confirmButtonText: 'Ok'
          })
        })
      })
      .catch(err => {
        console.log(err)
      })
    },
    retrieveCommentByPostId(context, payload) {
      // console.log(payload)
      axios({
        method: "GET",
        url: `http://localhost:3000/comments/postId/${payload}`,
        headers: {
          'token': localStorage.getItem('token')
        }
      })   
      .then(({data}) => {
        context.commit('retrieveCommentByPostId', data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    upvotePost(context, payload) {
      axios({
        method: "PUT",
        url: `http://localhost:3000/posts/upvotes/${payload}`,
        headers: {
          'token': localStorage.getItem('token')
        }
      })   
      .then(({data}) => {
        console.log(data)
        this.dispatch('retrievePosts')
        this.dispatch('retrieveMyPosts')
      })
      .catch(err => {
        console.log(err)
      })
    },
    downvotePost(context, payload) {
      axios({
        method: "PUT",
        url: `http://localhost:3000/posts/downvotes/${payload}`,
        headers: {
          'token': localStorage.getItem('token')
        }
      })   
      .then(({data}) => {
        console.log(data)
        this.dispatch('retrievePosts')
        this.dispatch('retrieveMyPosts')
        // context.commit('retrieveCommentByPostId', data) 
      })
      .catch(err => {
        console.log(err)
      })
    },
    upvoteComment(context, payload) {
      axios({
        method: "PUT",
        url: `http://localhost:3000/comments/upvotes/${payload}`,
        headers: {
          'token': localStorage.getItem('token')
        }
      })   
      .then(({data}) => {
        console.log(data)
        this.dispatch('retrievePosts')
        this.dispatch('retrieveMyPosts')
        // context.commit('retrieveCommentByPostId', data) 
      })
      .catch(err => {
        console.log(err)
      })
    },
    downvoteComment(context, payload) {
      axios({
        method: "PUT",
        url: `http://localhost:3000/comments/downvotes/${payload}`,
        headers: {
          'token': localStorage.getItem('token')
        }
      })   
      .then(({data}) => {
        console.log(data)
        this.dispatch('retrievePosts')
        this.dispatch('retrieveMyPosts')
        // context.commit('retrieveCommentByPostId', data) 
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
})
