import Vue from 'vue'
import Vuex from 'vuex'
import ax from './api'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {
    register(context,data){
      console.log('masuk store',data);
      ax.post('/register',data)
      .then(({data})=>{
        console.log(data);
        
      })
      .catch(err =>{
        console.log(err);
        
      })
    }
  }
})
