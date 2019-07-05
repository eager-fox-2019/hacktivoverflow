import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

Vue.use(Vuex);
let baseUrl = `http://localhost:3000`

export default new Vuex.Store({
  state: {
    isLogin: false,
    questions: [],
    questionDetail: [],
  },
  mutations: {
    cekLogin(state) {
      // console.log(state.isLogin,'iniiii~~')
      if (state.isLogin === false) {
        this.state.isLogin = true;
      } else if (state.isLogin === true) {
        this.state.isLogin = false;
      }
    },
    appLogin(state) {
      this.state.isLogin = true
    },
    afterGetLogin(state, payload) {
      // console.log('disini')
      // console.log(payload, 'ini data token')
      this.state.isLogin = true
    },
    afterGetRegister(state, payload) {
      // console.log(payload)
    },
    initialFetch(state, payload) {
      // console.log(payload, 'ini data fetch')
      this.state.questions = payload
    },
    aQuestion(state, payload) {
      this.state.questionDetail = payload
    }
  },
  actions: {
    getLogin(context, payload) {
      // console.log('masuk login')
      // console.log(payload.username, payload.password)

      return new Promise((resolve, reject) => {
        axios.post(
            `${baseUrl}/users/login`, {
              username: payload.username,
              password: payload.password
            }
          )
          .then(({
            data
          }) => {
            // console.log(data)
            this.commit('afterGetLogin', data)
            localStorage.setItem('token', data.token);
            resolve(data)
          })
          .catch((err) => {
            // console.log(err)
            reject(err)
          })
      })
    },
    getRegister(context, payload) {
      // console.log('masuk register')
      // console.log(payload)

      axios.post(
          `${baseUrl}/users/register`, {
            username: payload.username,
            password: payload.password,
            email: payload.email
          }
        )
        .then((registered) => {
          // console.log(registered)
          this.dispatch('getLogin', {
            username: payload.username,
            password: payload.password
          })
        })
        .catch((err) => {
          // console.log(err)
        })
    },
    postNewQuestion(context, payload) {
      // console.log(payload, 'ini dinaaaa~~')
      return new Promise((resolve, reject) => {
        // console.log(localStorage.getItem('token'))
        axios
          .post(`${baseUrl}/questions/add`, {
            title: payload.title,
            description: payload.description,
          }, {
            headers: {
              'token': localStorage.getItem('token')
            }
          })
          .then(({
            data
          }) => {
            // console.log(data)
            resolve(data)
          })
          .catch((err) => [
            reject(err)
          ])
      })
    },
    fetchQuestion(context, payload) {
      // console.log('langusng')
      axios.get(`${baseUrl}/questions/all`)
        .then(({
          data
        }) => {
          // console.log(data)
          this.commit('initialFetch', data)
        })
        .catch((err) => {
          // console.log(err)
        })
    },
    getAQuestion(context, payload) {
      // console.log(payload, 'lahhh hini dineaaaa~~')
      return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/questions/one/${payload}`)
          .then(({
            data
          }) => {
            // console.log(data)
            context.commit('aQuestion', data)
            resolve(data)
          })
          .catch((err) => {
            // console.log(err)
            reject(err)
          })
      })
    },
    onMakeAnAnswer(context, payload) {
      // console.log(payload, ' ini di vues store')
      return new Promise((resolve, reject) => {
        // console.log(payload)
        axios
          .post(`${baseUrl}/answers/add/${payload.questionId}`, {
            title: payload.title,
            description: payload.description
          }, {
            headers: {
              'token': localStorage.getItem('token')
            }
          })
          .then((result) => {
            // console.log(result, 'kemudian di resolve')
            resolve(result)
          })
          .catch((err) => {
            // console.log(err)
            reject(err)
          })
      })

    },
    answerUpVote(context, payload) {
      // console.log(payload, 'ini payload userID di vuex')
      return new Promise((resolve, reject) => {
        console.log('kesini')
        axios
          .patch(`${baseUrl}/answers/upVote`, {
            answerId: payload
          }, {
            headers: {
              'token': localStorage.getItem('token')
            }
          })
          .then(({
            data
          }) => {
            // console.log(data, 'harusnya berhasil')
            resolve(data)
          })
          .catch((err) => {
            // console.log('error disnini')
            console.log(err)
            reject(err)
          })
      })
    },
    answerDownVote(context, payload) {
      // console.log(payload, 'hini idiaaaa==-=-=-=-=-=-')
      return new Promise((resolve, reject) => {
        axios
          .patch(`${baseUrl}/answers/downVote`, {
            answerId: payload
          }, {
            headers: {
              'token': localStorage.getItem('token')
            }
          })
          .then(({
            data
          }) => {
            // console.log(data, 'harusnya berhasil')
            resolve(data)
          })
          .catch((err) => {
            // console.log('error disnini')
            console.log(err)
            reject(err)
          })
      })
    },
    questionUpVote(context, payload) {
      // console.log(payload, 'ini payload question upvote')
      return new Promise ((resolve, reject)=> {
        // console.log('masuk promisee')
        axios
          .patch(`${baseUrl}/questions/upVote/${payload}`, {
            questionId: payload
          },{
            headers: {
              'token': localStorage.getItem('token')
            }
          })
          .then(({data})=> {
            // console.log(data,'upVote Berhasil')
            resolve (data)
          })
          .catch((err)=> {
            // console.log(err)
            reject(err)
          })
      })
    },
    questionDownVote(context, payload) {
      // console.log(payload, 'ini payload question downvote')
      return new Promise ((resolve, reject)=> {
        axios
          .patch(`${baseUrl}/questions/downVote/${payload}`,{
            questionId: payload
          },{
            headers: {
              'token': localStorage.getItem('token') 
            }
          })
          .then(({data})=> {
            // console.log(data,'ini upVOte question berhasil')
            resolve(data)
          })
          .catch((err)=> {
            // console.log(err)
            reject(err)
          })
      })
    },
    patchUpdateQuestion(context, payload) {
      console.log(payload)
      
      return new Promise ((resolve,reject)=> {
        axios
          .patch(`${baseUrl}/questions/update/${payload.questionId}`,{
            title: payload.title,
            description: payload.description,
          },{
            headers: {
              'token' : localStorage.getItem('token')
            }
          })
          .then(({ data })=> {
            console.log(data)
            resolve(data)
          })
          .catch((err)=> {
            console.log(err)
            reject(err)
          })
      })
    },
    deleteOnDelete(context, payload) {
      console.log('on dlet vuewx')
      return new Promise ((resolve, reject)=> {
        axios 
          .delete(`${baseUrl}/questions/delete/${payload.questionId}`,{
            headers: {
              'token': localStorage.getItem('token')
            }
          })
          .then(({data})=>{
            resolve(data)
          })
          .catch((err)=>{
            reject(err)
          })
      })
    }
  },
});
