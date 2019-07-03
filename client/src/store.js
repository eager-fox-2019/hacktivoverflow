import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	baseURL: 'http://localhost:3000',
  	isLoggedin: false,
    token: '',
  	questionList: [],
  	currentQuestion: null,
  	answerList: [],
    user: null,
    token: null
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
      // console.log('di commit SAVEUSER')
      state.user = {name:payload.name, email:payload.email}
      // console.log('di commit SAVEUSER')
      state.token = payload.access_token
      // console.log('di commit SAVEUSER')
      state.isLoggedin = true
      // console.log('di commit SAVEUSER')
      localStorage.setItem('access_token', state.token)
      // console.log('di commit SAVEUSER')
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
      axios.patch(state.baseURL+'/question/'+qId+'/'+vote,
        {headers: {access_token: state.token}
        })
      .then(({data}) => {
        //data is question with updated upvotes and downvotes array
        console.log(data)
      })
      .catch(({response}) => {
        console.log(response.data);
      });
    },
    voteQuestion({state, commit, dispatch}, payload){
      let aId = payload.answerId
      let vote = payload.type
      axios.patch(state.baseURL+'/answer/'+aId+'/'+vote,
        {headers: {access_token: state.token}
        })
      .then(({data}) => {
        //data is answer with updated upvotes and downvotes array
        console.log(data)
      })
      .catch(({response}) => {
        console.log(response.data);
      });
    }
  }
})
