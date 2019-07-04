import Vue from 'vue'
import Vuex from 'vuex'

import main from "./main"

Vue.use(Vuex)


export default function () {
  const Store = new Vuex.Store({
    modules: {
      main
    },

  })

  return Store
}
