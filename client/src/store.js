import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/api/axios.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allquestion:[],
    myquestion:[],
  },
  mutations: {
    SetAllQuestion(state, payload){
      this.state.allquestion= payload
    },
    SetMyQuestion(state, payload){
      this.state.myquestion= payload
    }
  },
  actions: {
    getAllQuestion(context){
      axios({
        method: 'get',
        url: '/questions',
      })
      .then(({data}) =>{
        this.commit('SetAllQuestion', data)
      } )
      .catch(err =>{
        console.log('error get data questions');
        console.log(err);
      })
    },

    getMyQuestion(context){
      axios({
        method: 'get',
        url: '/questions/mypost',
        headers:{
          'token': localStorage.token
        }
      })
      .then(({data}) =>{
        this.commit('SetMyQuestion', data)
      } )
      .catch(err =>{
        console.log('error get data myquestions');
        console.log(err);
      })
    },

    
  }
})
