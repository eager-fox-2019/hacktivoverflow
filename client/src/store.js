import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    islogin: false,
    id: "",
  },
  mutations: {
    USERLOGIN(state, payload) {
      state.islogin = true;
    },
    USERLOGOUT(state, payload) {
      state.id = ""
      state.islogin = false;
    }
  },
  actions: {}
});
