<template>
  <v-app >
    <v-toolbar flat app height="45" style="background-color:#FB7E51; color:white;">
      <v-toolbar-title>
        
        <span id="mainTitle">Hackoverflow</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <span  v-if="this.$store.state.isLogin === false" class="buttonloginregister" @click="login">Signin</span>
      <span v-if="this.$store.state.isLogin === false" class="buttonloginregister" @click="register">Signup</span>
      <span v-if="this.$store.state.isLogin === true" class="buttonloginregister" @click="gotohome">Home</span>
      <span v-if="this.$store.state.isLogin === true" class="buttonloginregister" @click="askq">Ask Question</span>
      <span v-if="this.$store.state.isLogin === true" class="buttonloginregister" @click="myquestion">My Question</span>
      <span v-if="this.$store.state.isLogin === true" class="buttonloginregister" @click="logout">Signout</span>
      
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import AskAQuestion from "./components/formAddNewQuestion"

export default {
  name: 'App',
  components: {
    HelloWorld,
    AskAQuestion
  },
  data () {
    return {
    }
  },
  methods:{
    login(){
        this.$router.push('login')
    },
    register(){
        this.$router.push('register')
    },
    logout(){
       this.$store.commit('logout')
       this.$router.push('/')

    },
    gotohome(){
      this.$router.push('/post')
    },
    askq(){
        this.$router.push('newquestion')
    },
    myquestion(){
      this.$store.dispatch('fetchMyQuestion')
        this.$router.push('myprofile')
    }
  },
  created(){
    if (this.$route.params === "" && localStorage.getItem('token')   ){
            localStorage.clear()
             this.$store.commit('logout')
    }
    
   
    if(localStorage.getItem('token')){
      // console.log('masuk ada token');
      this.$store.dispatch('fetchAllQuestion')
      
      
    let data = {
      id : localStorage.getItem('id'),
      username : localStorage.getItem('username')

    }
        this.$store.commit('fetchUserProfile', data)
        // this.$router.push('/post')
     } 
    else {
      console.log('masuk g ada token');
        this.$store.commit('logout')
        this.$router.push('/')
    }
    
  }
}
</script>

<style>
  .buttonloginregister{
    font-weight: 550;
    margin-left: 10px;
    color: #393A3A;
    font-family: 'Russo One', sans-serif;

    
  }
  .buttonloginregister:hover{
    cursor: pointer;
    font-size: 16px;
  }
  #mainTitle{
    color: #393A3A;
    font-family: 'Russo One', sans-serif;
    font-weight: 700;
  }
</style>

