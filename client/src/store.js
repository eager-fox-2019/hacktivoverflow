import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    url: 'http://localhost:3000',
    islogin: false,
    id: "",
    questions: []
  },
  mutations: {
    USERLOGIN(state, payload) {
      state.islogin = true;
    },
    USERLOGOUT(state, payload) {
      state.id = ""
      state.islogin = false;
    },
    ALLQUESTIONS(state, payload){
      state.questions = payload
      console.log(state.questions, 'store')
    }
  },
  actions: {}
});
