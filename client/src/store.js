import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    url: "http://localhost:3000",
    islogin: false,
    id: "",
    token: "",
    questions: []
  },
  mutations: {
    USERLOGIN(state, payload) {
      console.log(payload);
      state.id = payload.id;
      state.token = payload.token;
      state.islogin = true;
    },
    USERLOGOUT(state, payload) {
      state.id = "";
      state.islogin = false;
    },
    ALLQUESTIONS(state, payload) {
      state.questions = payload;
    }
  },
  actions: {
    FETCHQUESTIONS(context, payload) {
      return axios({
        method: "GET",
        url: `${this.state.url}/question`,
        headers: {
          token: this.state.token
        }
      });
    }
  }
});
