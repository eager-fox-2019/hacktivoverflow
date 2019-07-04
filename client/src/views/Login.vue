<template>
    <div>
        <headerPage />
        <div class="row" style="background-color: #062454; height:  625px;">
            <div class="col-sm-6">
                <img src="https://image.flaticon.com/icons/png/512/1874/1874683.png" alt="Icon">
                <h1 style="color: white; margin-left: -10%; font-size:32px; text-align: center; font-family: 'DM Sans', sans-serif; margin-top: 20px;">Solve Your Problem</h1>
                <h1 style="color: white; margin-left: -10%; font-size:32px; text-align: center; font-family: 'DM Sans', sans-serif;">by Asking in Hacktivoverflow</h1>
            </div>
            <div class="col-sm-4" id="formlogin">
            <h3>Login</h3>
            <p>{{errorMessage}}</p>
            <form @submit.prevent="login">
                <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fas fa-envelope"></i> </span>
                </div>
                <input type="email" class="form-control" placeholder="Email" required v-model="user.email">
                </div><br>
                <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fas fa-lock"></i> </span>
                </div>
                <input type="password" class="form-control" placeholder="Password" required v-model="user.password">
                </div><br>
                <button type="submit" class="btn btn-success">Login</button>
            </form> 
            </div>    
        </div>
    </div>
</template>

<script>
import axios from '@/api/axios.js'
import headerPage from '@/components/header.vue'

export default {
    name:'login',
    components:{
        headerPage
    },
      data(){
    return{
      user:{
        email:'',
        password:''
      },
      errorMessage:''
    }
  },
  methods:{
    login(){
        axios({
          method: 'post',
          url: '/users/login',
          data:{
            name: this.user.name,
            email: this.user.email,
            password: this.user.password
          }
        })
        .then(({data})=>{
            localStorage.setItem('token', data.token)
            localStorage.setItem('name', data.name)
            localStorage.setItem('userId', data.userId)
            this.$router.push('/home')
        })
        .catch(err=>{
          console.log('error register')
          console.log(err)
          this.errorMessage= err.message
        })
    }
  }
}
</script>

<style scoped>
    img {
        margin-top: 20%;
        margin-left: 20%;
        height: 250px
    }
    #formlogin{
      margin-top: 12%
    }
    #formlogin h3{
      color: white;
      text-align: center;
      font-weight: bold;
    }
</style>
