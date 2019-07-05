import Vue from 'vue';
import Vuex from 'vuex';
import axios from '@/axios'
import Swal from 'sweetalert2'
import router from '@/router';

Vue.use(Vuex);

// function showError({response}) {
//   Swal.fire('Error!', response.data.message, 'error');
//   reject(response.data.message)
// }

export default new Vuex.Store({
  state: {
    loggedIn: false,
    questions: [],
    me: {},
    user: {},
    query: {
      tags: []
    },
    queryResults: [],
    question: {
      answers: []
    },
    existingTags: [],
    sortBy: '',
    logText: 'Login',
    editingPost: false
  },
  mutations: {
    editingPost(state, payload){
      state.editingPost = !state.editingPost
    },
    sortQuestions(state, payload) {
      switch (payload) {
        case 'Newest':
          state.questions.sort((a, b) => {
            if (a.createdAt > b.createdAt) return -1
            if (a.createdAt < b.createdAt) return 1
            return 0
          })
          break;
        case 'Updated Recently':
          state.questions.sort((a, b) => {
            if (a.updatedAt > b.updatedAt) return -1
            if (a.updatedAt < b.updatedAt) return 1
            return 0
          })
          break;
        case 'Most Voted':
          state.questions.sort((a, b) => {
            if ((a.upvotes.length - a.downvotes.length) > (b.upvotes.length - b.downvotes.length)) return -1
            if ((a.upvotes.length - a.downvotes.length) < (b.upvotes.length - b.downvotes.length)) return 1
            return 0
          })
          break;
        case 'Most Answers':
          state.questions.sort((a, b) => {
            if (a.answers.length > b.answers.length) return -1
            if (a.answers.length < b.answers.length) return 1
            return 0
          })
          break;
        default:
          // sort = ''
          break;
      }
    },
    login(state, payload) {
      state.loggedIn = true;
      state.logText = 'Logout'
      router.push('/');
    },
    logout(state) {
      localStorage.removeItem('token');
      state.loggedIn = false;
      state.logText = 'Login'
    },
    getAllQuestions(state, payload) {

      state.questions = [...payload]
      let tags = []
      payload.forEach(question =>{
        question.tags.forEach(tag =>{
          if(!tags.includes(tag))
            tags.push(tag)
        })
      })

      state.existingTags = [...tags];
    },
    getUserQuestions(state, payload) {
      state.user = {...payload[0].user}
      state.user.questions = [...payload]
    },
    searchQuestions(state, payload) {
      state.queryResults = [...payload]
      router.push('/search')
    },
    getQuestion(state, payload) {
      console.log(payload);
      
      for(let key in payload)
        state.question[key] = payload[key]
      console.log(state.question)
    },
    createQuestion(state, _id) {
      router.push(`/question/${_id}`)
    },
    getUserInfo(state, payload) {
      state.me = { ...payload }
    },
    getQuestionAnswers(state, payload){      
      state.question.answers = [...payload]
    },
    changeQuery(state,payload){
      console.log(payload);
      
      if(payload.tags){
        state.query.tags = payload.tags
      }
      if(payload.tag){
        state.query.tags = state.query.tags.filter(tag => tag !== payload.tag)
        state.query.tags.push(payload.tag)
      }
    },
    clearQuery(state, payload){
      state.query = {
        tags: []
      }
    }
  },
  actions: {
    changeProfile(context, payload){
      return new Promise((resolve, reject) => {
        axios({
          method: "PATCH",
          url: "/users/me",
          data: payload,
          headers: {
            token: localStorage.getItem("token")
          }
        })
          .then(({ data }) => {
            console.log(data);
            context.commit('getUserInfo', data)
            resolve(data)
          })
          .catch(({ response }) => {
            Swal.fire('Error!', response.data.message, 'error');
            reject(response.data.message)
          });
      })
    },
    getUserInfo(context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: "GET",
          url: "/users/me",
          headers: {
            token: localStorage.getItem("token")
          }
        })
          .then(({ data }) => {
            console.log(data);
            
            context.commit('getUserInfo', data)
            resolve(data)
          })
          .catch(({ response }) => {
            Swal.fire('Error!', response.data.message, 'error');
            reject(response.data.message)
          });
      })
    },
    createQuestion(context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: "POST",
          url: '/questions',
          data: payload,
          headers: {
            token: localStorage.getItem('token'),
          }
        })
          .then(({ data }) => {
            context.commit('createQuestion', data._id)
            resolve(data)
          })
          .catch(({ response }) => {
            Swal.fire('Error!', response.data.message, 'error');
            reject(response.data.message)
          });
      })
    },
    getQuestion(context, questionId) {
      return new Promise((resolve, reject) => {
        axios({
          method: "GET",
          url: `/questions/${questionId}`,
          headers: {
            token: localStorage.getItem('token'),
          }
        })
          .then(({ data }) => {
            context.commit('getQuestion', data)
            resolve(data)
          })
          .catch(({ response }) => {
            Swal.fire('Error!', response.data.message, 'error');
            reject(response.data.message)
          });
      })
    },
    getQuestionAnswers(context, questionId) {
      return new Promise((resolve, reject) => {
        axios({
          method: "GET",
          url: `/answers/question/${questionId}`,
          headers: {
            token: localStorage.getItem('token'),
          }
        })
          .then(({ data }) => {
            context.commit('getQuestionAnswers', data)
            resolve(data)
          })
          .catch(({ response }) => {
            Swal.fire('Error!', response.data.message, 'error');
            reject(response.data.message)
          });
      })
    },
    answerQuestion(context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: "POST",
          url: `/answers/${payload.questionId}`,
          data: payload,
          headers: {
            token: localStorage.getItem('token'),
          }
        })
          .then(({ data }) => {
            return Promise.all([context.dispatch('getQuestion', payload.questionId), context.dispatch('getQuestionAnswers', payload.questionId)])
          })
          .then(results =>{
            resolve(results)
          })
          .catch(({ response }) => {
            Swal.fire('Error!', response.data.message, 'error');
            reject(response.data.message)
          });
      })
    },
    updateQuestion(context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: "PATCH",
          url: `/questions/${payload.questionId}`,
          data: {
            title: payload.title,
            description: payload.description,
          },
          headers: {
            token: localStorage.getItem('token'),
          }
        })
        .then(({ data }) => {
          return Promise.all([context.dispatch('getQuestion', payload.questionId), context.dispatch('getQuestionAnswers', payload.questionId)])
        })
        .then(results =>{
          resolve(results)
        })
          .catch(({ response }) => {
            Swal.fire('Error!', response.data.message, 'error');
            reject(response.data.message)
          });
      })
    },
    updateAnswer(context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: "PATCH",
          url: `/answers/${payload.answerId}`,
          data: {
            // title: payload.title,
            description: payload.description,
          },
          headers: {
            token: localStorage.getItem('token'),
          }
        })
        .then(({ data }) => {
          
          return Promise.all([context.dispatch('getQuestion', payload.questionId), context.dispatch('getQuestionAnswers', payload.questionId)])
        })
        .then(results =>{
          resolve(results)
        })
          .catch(({ response }) => {
            Swal.fire('Error!', response.data.message, 'error');
            reject(response.data.message)
          });
      })
    },
    deleteQuestion(context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: "DELETE",
          url: `/questions/${payload.questionId}`,
          headers: {
            token: localStorage.getItem('token'),
          }
        })
        .then(({ data }) => {
          
          return Promise.all([context.dispatch('getQuestion', payload.questionId), context.dispatch('getQuestionAnswers', payload.questionId)])
        })
        .then(results =>{
          resolve(results)
        })
          .catch(({ response }) => {
            Swal.fire('Error!', response.data.message, 'error');
            reject(response.data.message)
          });
      })
    },
    deleteAnswer(context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: "DELETE",
          url: `/answers/${payload.answerId}`,
          headers: {
            token: localStorage.getItem('token'),
          }
        })
        .then(({ data }) => {
          
          return Promise.all([context.dispatch('getQuestion', payload.questionId), context.dispatch('getQuestionAnswers', payload.questionId)])
        })
        .then(results =>{
          resolve(results)
        })
          .catch(({ response }) => {
            Swal.fire('Error!', response.data.message, 'error');
            reject(response.data.message)
          });
      })
    },
    voteQuestion(context, payload) {
      return new Promise((resolve, reject) => {
        console.log(payload);
        
        axios({
          method: "PATCH",
          url: `/questions/${payload.questionId}`,
          data: {
            voteType: payload.voteType
          },
          headers: {
            token: localStorage.getItem('token'),
          }
        })
        .then(({ data }) => {
          return Promise.all([context.dispatch('getQuestion', payload.questionId), context.dispatch('getQuestionAnswers', payload.questionId),
          context.dispatch('getAllQuestions', payload.sortBy),
          context.dispatch('getUserQuestions', context.state.user._id)])
        })
        .then(results =>{
          resolve(results)
        })
          .catch(({ response }) => {
            Swal.fire('Error!', response.data.message, 'error');
            reject(response.data.message)
          });
      })
    },
    voteAnswer(context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: "PATCH",
          url: `/answers/${payload.answerId}`,
          data: {
            voteType: payload.voteType
          },
          headers: {
            token: localStorage.getItem('token'),
          }
        })
        .then(({ data }) => {
          return Promise.all([context.dispatch('getQuestion', payload.questionId), context.dispatch('getQuestionAnswers', payload.questionId),
          context.dispatch('getAllQuestions'),
          context.dispatch('getUserQuestions', context.state.user._id)])
        })
        .then(results =>{
          resolve(results)
        })
          .catch(({ response }) => {
            Swal.fire('Error!', response.data.message, 'error');
            reject(response.data.message)
          });
      })
    },
    getAllQuestions(context, sortBy) {
      return new Promise((resolve, reject) => {
        axios({
          method: "GET",
          url: '/questions',
        })
          .then(({ data }) => {
            context.commit('getAllQuestions', data)
            console.log('-----------------' + sortBy)
            if (sortBy)
              context.commit('sortQuestions', sortBy)
            resolve(data)
          })
          .catch(({ response }) => {
            Swal.fire('Error!', response.data.message, 'error');
            reject(response.data.message)
          });
      })
    },
    getUserQuestions(context, id) {
      return new Promise((resolve, reject) => {        
        let sId
        if (!id) sId = context.state.me._id
        else sId = id

        axios({
          method: "GET",
          url: `/questions/user/${sId}`,
        })
          .then(({ data }) => {
            console.log(data);
            
            context.commit('getUserQuestions', data)
            resolve(data)
          })
          .catch(({ response }) => {
            Swal.fire('Error!', response.data.message, 'error');
            reject(response.data.message)
          });
      })
    },
    searchQuestions(context, searchText) {
      return new Promise((resolve, reject) => {
        let query = `?title=${searchText}`
        axios({
          method: 'GET',
          url: `/questions${query}`,
        })
          .then(({ data }) => {
            context.commit('searchQuestions', data);
            resolve(data)
          })
          .catch(({ response }) => {
            Swal.fire('Error!', response.data.message, 'error');
            reject(response.data.message)
          });
      })
    },
    searchByTags(context, payload) {
      return new Promise((resolve, reject) => {
        context.commit('changeQuery',payload)
        let arr = []
        for(let tag of context.state.query.tags)
          arr.push('tags='+tag)
        let query = `?`+ arr.join('&')
        axios({
          method: 'GET',
          url: `/questions${query}`,
        })
          .then(({ data }) => {
            context.commit('searchQuestions', data);
            resolve(data)
          })
          .catch(({ response }) => {
            Swal.fire('Error!', response.data.message, 'error');
            reject(response.data.message)
          });
      })
    },
    register(context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: '/users/register',
          data: payload,
        })
          .then(({ data }) => {
            Swal.fire(
              'Registered!',
              'User Registered!',
              'success',
            );
            resolve(data)
          })
          .catch(({ response }) => {
            Swal.fire('Error!', response.data.message, 'error');
            reject(response.data.message)
          });
      })
    },
    login(context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: '/users/login',
          data: payload,
        })
          .then(({ data }) => {
            Swal.fire(
              'Logged In!',
              'Successfully logged in!',
              'success',
            );
            localStorage.setItem('token', data.token);
            context.commit('login', data);
            context.dispatch('getUserInfo')
            resolve(data)
          })
          .catch(({ response }) => {
            Swal.fire('Error!', response.data.message, 'error');
            reject(response.data.message)
          });
      })
    },
    login(context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: "POST",
          url: `/users/signingoogle`,
          data: {
            id_token
          }
        })
          .then(({ data }) => {
            if (data.newPass) {
              Swal.fire(
                "Signed In via Google!",
                `You Have Been Logged In Successfully. Hurry up change your password now, your password is ${
                  data.newPass
                }`,
                "info"
              );
            }
            else {
              Swal.fire(
                "Signed In via Google!",
                `You Have Been Logged In Successfully`,
                "success"
              );
            }
            // localStorage.setItem("signedInVia", true);
            localStorage.setItem("token", data["token"]);
            resolve(data)
          })
          .catch(({ response }) => {
            Swal.fire('Error!', response.data.message, 'error');
            reject(response.data.message)
          });
      })
    },
    
  },
  // getters: {
  //   getQuestion(state) {
  //     return state.question
  //   }
  // }
});
