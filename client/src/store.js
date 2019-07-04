import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	baseURL: 'http://localhost:3000',
  	isLoggedin: false,
    access_token: null,
  	questionList: [],
  	currentQuestion: null,
    selectedAnswer: null,
  	answerList: [],
    user: null,
    alertMsg: '',
    alertType: ''
  },
  mutations: {
    SHOWMSG (state, payload) {
      state.alertMsg = payload.message
      state.alertType = payload.type
    },
    CLEARMSG (state) {
      state.alertMsg = ''
      state.alertType = ''
    },
  	UPDATEQUESTIONLIST (state, payload) {
  		state.questionList = payload
  	},
  	UPDATECURRENTQUESTION (state, payload) {
  		state.currentQuestion = payload
  	},
  	UPDATECURRENTANSWERLIST (state, payload) {
  		state.answerList = payload
  	},
    LOGOUT (state) {
      state.baseURL = 'http://localhost:3000'
      state.isLoggedin = false
      state.access_token = null
      state.currentQuestion = null
      state.selectedAnswer = null
      state.answerList = []
      state.user = null
      state.alertMsg = ''
      state.alertType = ''

      localStorage.clear()
    },
    SAVEUSER (state, payload) {
      // console.log({ saveuser: payload })
      let userId = payload.id || payload._id
      state.user = { id: userId, name: payload.name, email: payload.email }
      state.access_token = payload.access_token
      state.isLoggedin = true
      localStorage.setItem('access_token', state.access_token)
      localStorage.setItem('name', payload.name)
      localStorage.setItem('email', payload.email)
      localStorage.setItem('id', userId)
    },
    SELECTANSWER (state, payload) {
      state.selectedAnswer = payload
    }
  },
  actions: {
  	getQuestions ({ state, commit, dispatch }) {
  		axios.get(state.baseURL + '/question')
		  .then(({ data }) => {
		    // console.log(data)
		    commit('UPDATEQUESTIONLIST', data)
		  })
		  .catch(({ response }) => {
		    // console.log(response.data)
        commit('SHOWMSG', {
          message: response.data,
          type: 'warning'
        })
		  })
  	},
  	getQuestionDetail ({ state, commit, dispatch }, payload) {
  		axios.get(state.baseURL + '/question/' + payload)
  			.then(({ data }) => {
  				// console.log(data)
  				commit('UPDATECURRENTQUESTION', data)
          dispatch('getAnswers', data._id)
  			})
		  .catch(({ response }) => {
		    // console.log(response.data)
        commit('SHOWMSG', {
          message: response.data,
          type: 'warning'
        })
		  })
  	},
    getQuestion ({ state, commit, dispatch }, payload) {
      axios.get(state.baseURL + '/question/' + payload)
        .then(({ data }) => {
          // console.log(data)
          commit('UPDATECURRENTQUESTION', data)
        })
        .catch(({ response }) => {
          // console.log(response.data)
          commit('SHOWMSG', {
            message: response.data,
            type: 'warning'
          })
        })
    },
  	getAnswers ({ state, commit, dispatch }, payload) {
  		axios.get(state.baseURL + '/answer/question/' + payload)
  			.then(({ data }) => {
  				console.log(data)
  				commit('UPDATECURRENTANSWERLIST', data)
  			})
		  .catch(({ response }) => {
		    // console.log(response.data)
        commit('SHOWMSG', {
          message: response.data,
          type: 'warning'
        })
		  })
  	},
    voteQuestion ({ state, commit, dispatch }, payload) {
      commit('UPDATECURRENTQUESTION', payload.question)
      let qId = payload.question._id
      let vote = payload.type

      axios({
        method: 'patch',
        url: state.baseURL + '/question/' + qId + '/' + vote,
        headers: { access_token: state.access_token }
      })
        .then(({ data }) => {
          // console.log({ data })
          // console.log(state.currentQuestion)
          data.owner = state.currentQuestion.owner
          // data is the updated question, update our arrays using it.
          commit('UPDATECURRENTQUESTION', null)
          commit('UPDATECURRENTQUESTION', data)

          // console.log('commit currentQuestion')

          let tempArray = state.questionList
          for (let i = 0; i < tempArray.length; i++) {
            if (tempArray[i]._id == data._id) {
              tempArray[i] = data
              console.log({ updated: data })
              i = tempArray.length
            }
          }

          commit('UPDATEQUESTIONLIST', [])
          commit('UPDATEQUESTIONLIST', tempArray)
          // console.log('updated question list')

          console.log(data)
        })
        .catch(({ response }) => {
          // console.log(response.data)
          commit('SHOWMSG', {
            message: response.data,
            type: 'warning'
          })
        })
    },
    voteAnswer ({ state, commit, dispatch }, payload) {
      commit('SELECTANSWER', payload.answer)
      let aId = payload.answer._id
      let vote = payload.type

      axios({
        method: 'patch',
        url: state.baseURL + '/answer/' + aId + '/' + vote,
        headers: { access_token: state.access_token }
      })
        .then(({ data }) => {
          data.owner = state.selectedAnswer.owner

          let tempArray = state.answerList
          for (let i = 0; i < tempArray.length; i++) {
            if (tempArray[i]._id == data._id) {
              tempArray[i] = data
              // console.log({ updated: data })
              i = tempArray.length
            }
          }
          commit('SELECTANSWER', data)
          commit('UPDATECURRENTANSWERLIST', [])
          commit('UPDATECURRENTANSWERLIST', tempArray)
          // data is answer with updated upvotes and downvotes array
          // console.log(data)
        })
        .catch(({ response }) => {
          // console.log(response.data)
          commit('SHOWMSG', {
            message: response.data,
            type: 'warning'
          })
        })
    },
    postQuestion ({ state, commit, dispatch }, form) {
      return axios({
        method: 'post',
        url: state.baseURL + '/question/',
        headers: { access_token: state.access_token },
        data: form
      })
    },
    postAnswer ({ state, commit, dispatch }, form) {
      return axios({
        method: 'post',
        url: state.baseURL + '/answer/',
        headers: { access_token: state.access_token },
        data: form
      })
    },
    deleteQuestion ({ state, commit, dispatch }, questionId) {
      return axios({
        method: 'delete',
        url: state.baseURL + '/question/' + questionId,
        headers: { access_token: state.access_token }
      })
    },
    updateQuestion ({ state, commit, dispatch }, payload) {
      let questionId = payload.id
      let questionForm = payload.form
      return axios({
        method: 'patch',
        url: state.baseURL + '/question/' + questionId,
        headers: { access_token: state.access_token },
        data: questionForm
      })
    },
    deleteAnswer ({ state, commit, dispatch }, answerId) {
      return axios({
        method: 'delete',
        url: state.baseURL + '/answer/' + answerId,
        headers: { access_token: state.access_token }
      })
    },
    updateAnswer ({ state, commit, dispatch }, payload) {
      let id = payload.id
      let form = payload.form
      return axios({
        method: 'patch',
        url: state.baseURL + '/answer/' + id,
        headers: { access_token: state.access_token },
        data: form
      })
    }
  }
})
