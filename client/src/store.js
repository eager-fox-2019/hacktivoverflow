import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

Vue.use(Vuex);
let baseUrl = `http://localhost:3000`

export default new Vuex.Store({
  state: {
    isLogin: false,
    questions: []
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
    afterGetLogin(state, payload) {
      console.log('disini')
      console.log(payload, 'ini data token')
      this.state.isLogin = true
    },
    afterGetRegister(state, payload) {
      console.log(payload)
    },
    initialFetch(state, payload) {
      console.log(payload, 'ini data fetch')
      this.state.questions = payload
    }
  },
  actions: {
    getLogin(context, payload) {
      console.log('masuk login')
      console.log(payload.username,payload.password)
      
      return new Promise ((resolve, reject)=> {
        axios.post(
          `${baseUrl}/users/login`,{
            username: payload.username,
            password: payload.password
          }
        )
          .then(({ data })=> {
            console.log(data)
            this.commit('afterGetLogin',data)
            localStorage.setItem('token',data.token);
            resolve (data)
          })
          .catch((err)=> {
            console.log(err)
            reject (err)
          })
      })
    },
    getRegister(context, payload) {
      console.log('masuk register')
      console.log(payload)
      
      axios.post(
        `${baseUrl}/users/register`, {
          username: payload.username,
          password: payload.password,
          email: payload.email
        }
      )
        .then((registered)=>{
          console.log(registered)
          this.dispatch('getLogin',{username: payload.username,password: payload.password})
        })
        .catch((err)=> {
          console.log(err)
        })
    },
    fetchQuestion(context, payload) {
      console.log('langusng')
      axios.get(`${baseUrl}/questions/all`)
        .then(({ data })=> {
          console.log(data)
          this.commit('initialFetch', data)
        })
        .catch((err)=> {
          console.log(err)
        })
    }
  },
});
