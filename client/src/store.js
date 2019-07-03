import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	baseURL: 'http://localhost:3000',
  	isLoggedin: false,
  	questionList: [],
  	currentQuestion: null,
  	answerList: [],
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
  },
  actions: {
  	getQuestions({state, commit, dispatch}){
  		axios.get(state.baseURL+'/question')
		  .then(({data}) => {
		    console.log(data);
		    commit('UPDATEQUESTIONLIST', data)
		  })
		  .catch(({data}) => {
		    console.log(data);
		  });
  	},
  	getQuestionDetail({state, commit, dispatch}, payload){
  		axios.get(state.baseURL+'/question/'+payload)
  			.then(({data}) => {
  				console.log(data)
  				commit('UPDATECURRENTQUESTION', data)
          dispatch('getAnswers', data._id)
  			})
		  .catch(({data}) => {
		    console.log(data);
		  });
  	},
  	getAnswers({state, commit, dispatch}, payload){
  		axios.get(state.baseURL+'/answer/question/'+payload)
  			.then(({data}) => {
  				console.log(data)
  				commit('UPDATECURRENTANSWERLIST', data)
  			})
		  .catch(({data}) => {
		    console.log(data);
		  });
  	}
  }
})
