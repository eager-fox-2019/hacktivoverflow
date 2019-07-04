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
  	answerList: [],
    user: null
  },
  mutations: {
  	UPDATEQUESTIONLIST(state, payload){
  		state.questionList = payload
  	},
  	UPDATECURRENTQUESTION(state, payload){
  		state.currentQuestion = payload
  	},
  	UPDATECURRENTANSWERLIST(state, payload){
  		state.answerList = payload
  	},
    LOGOUT(state){
      state.isLoggedin = false
      localStorage.clear()
    },
    SAVEUSER(state, payload){
      console.log({saveuser:payload})
      state.user = {id:payload.id, name:payload.name, email:payload.email}
      state.access_token = payload.access_token
      state.isLoggedin = true
      localStorage.setItem('access_token', state.access_token)
      localStorage.setItem('name', payload.name)
      localStorage.setItem('email', payload.email)
      localStorage.setItem('id', payload.id)
    }
  },
  actions: {
  	getQuestions({state, commit, dispatch}){
  		axios.get(state.baseURL+'/question')
		  .then(({data}) => {
		    console.log(data);
		    commit('UPDATEQUESTIONLIST', data)
		  })
		  .catch(({response}) => {
		    console.log(response.data);
		  });
  	},
  	getQuestionDetail({state, commit, dispatch}, payload){
  		axios.get(state.baseURL+'/question/'+payload)
  			.then(({data}) => {
  				console.log(data)
  				commit('UPDATECURRENTQUESTION', data)
          dispatch('getAnswers', data._id)
  			})
		  .catch(({response}) => {
		    console.log(response.data);
		  });
  	},
    getQuestion({state, commit, dispatch}, payload){
      axios.get(state.baseURL+'/question/'+payload)
        .then(({data}) => {
          console.log(data)
          commit('UPDATECURRENTQUESTION', data)
        })
      .catch(({response}) => {
        console.log(response.data);
      });
    },
  	getAnswers({state, commit, dispatch}, payload){
  		axios.get(state.baseURL+'/answer/question/'+payload)
  			.then(({data}) => {
  				console.log(data)
  				commit('UPDATECURRENTANSWERLIST', data)
  			})
		  .catch(({response}) => {
		    console.log(response.data);
		  });
  	},
    voteQuestion({state, commit, dispatch}, payload){
      let qId = payload.questionId
      let vote = payload.type

      axios({
        method: 'patch',
        url: state.baseURL+'/question/'+qId+'/'+vote,
        headers: {access_token: state.access_token}
      })
      .then(({data}) => {
        data.owner = state.currentQuestion.owner
        //data is the updated question, update our arrays using it.
        commit('UPDATECURRENTQUESTION', null)
        commit('UPDATECURRENTQUESTION', data)

        let tempArray = state.questionList
        for (let i =0; i < tempArray.length; i++){
          if (tempArray[i]._id == data._id){
            tempArray[i] = data
            console.log({updated:data})
            i = tempArray.length
          }
        }

        commit('UPDATEQUESTIONLIST', [])
        commit('UPDATEQUESTIONLIST', tempArray)
        console.log('updated question list')

        // dispatch('getQuestions') //update questions
        // dispatch('getQuestion', qId)
        //data is question with updated upvotes and downvotes array
        console.log(data)
      })
      .catch(({response}) => {
        console.log(response.data);
      });
    },
    voteAnswer({state, commit, dispatch}, payload){
      let aId = payload.answerId
      let vote = payload.type
      console.log({access_token:state.access_token})
      axios({
        method: 'patch',
        url: state.baseURL+'/answer/'+aId+'/'+vote,
        headers: {access_token: state.access_token}
      })
      .then(({data}) => {

        let tempArray = state.answerList
        for (let i =0; i < tempArray.length; i++){
          if (tempArray[i]._id == data._id){
            tempArray[i] = data
            console.log({updated:data})
            i = tempArray.length
          }
        }
        commit('UPDATECURRENTANSWERLIST', [])
        commit('UPDATECURRENTANSWERLIST', tempArray)
        //data is answer with updated upvotes and downvotes array
        console.log(data)
      })
      .catch(({response}) => {
        console.log(response.data);
      });
    },
    postQuestion({state, commit, dispatch}, form){
      return axios({
        method: 'post',
        url: state.baseURL+'/question/',
        headers: {access_token: state.access_token},
        data: form
      })
    },
    postAnswer({state, commit, dispatch}, form){
      return axios({
        method: 'post',
        url: state.baseURL+'/answer/',
        headers: {access_token: state.access_token},
        data: form
      })
    },
    deleteQuestion({state, commit, dispatch}, questionId){
      return axios({
        method: 'delete',
        url: state.baseURL+'/question/'+ questionId,
        headers: {access_token: state.access_token}
      })
    },
    updateQuestion({state, commit, dispatch}, payload){
      let questionId = payload.id
      let questionForm = payload.form
      return axios({
        method: 'patch',
        url: state.baseURL+'/question/'+ questionId,
        headers: {access_token: state.access_token},
        data: questionForm
      })
    },
    deleteAnswer({state, commit, dispatch}, answerId){
      return axios({
        method: 'delete',
        url: state.baseURL+'/answer/'+ answerId,
        headers: {access_token: state.access_token}
      })
    }
  }
})
