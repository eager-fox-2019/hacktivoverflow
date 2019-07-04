<template>
    <div>
        <headerPage />
        <div class="row" style="background-color: #062454; height:  625px;">
            <div class="col-sm-6">
                <img src="https://image.flaticon.com/icons/png/512/1874/1874683.png" alt="Icon">
                <h1 style="color: white; margin-left: -10%; font-size:32px; text-align: center; font-family: 'DM Sans', sans-serif; margin-top: 20px;">Solve Your Problem</h1>
                <h1 style="color: white; margin-left: -10%; font-size:32px; text-align: center; font-family: 'DM Sans', sans-serif;">by Asking in Hacktivoverflow</h1>
            </div>
            <div class="col-sm-4" id="formregister">
                <h3>Register New Account</h3><hr>
                <h6>{{message}}</h6>
            <form @submit.prevent="register">
                <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fas fa-user"></i> </span>
                </div>
                <input type="text" class="form-control" placeholder="Full Name" required v-model="user.name">
                </div><br>
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
                <div class="form-group form-check">
                <label class="form-check-label">
                        <input type="checkbox" class="filled-in" checked="checked" required="">
                        <span style="color: white"> by registering you agree to <a href="">the terms and conditions</a></span>
                </label>
                </div>
                <button type="submit" class="btn btn-success" style="margin-left: 40%">Submit</button>
            </form> 
            </div>
        </div>
    </div>
</template>

<script>
import axios from '@/api/axios.js'
import headerPage from '@/components/header.vue'

export default {
    name:'register',
    components:{
        headerPage
    },
    data(){
        return {
        user:{
            name: '',
            email: '',
            password: ''
            },
        message:''
        }
    },
    methods:{
    register(){
      axios({
          method: 'post',
          url: '/users/register',
          data:{
            name: this.user.name,
            email: this.user.email,
            password: this.user.password
          }
        })
        .then(({data})=>{
            this.message= `Akun ${data.name} berhasil didaftarkan. Silahkan Login!`
        })
        .catch(err=>{
          console.log('error register')
          console.log(err)
            this.message= err.message
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
#formregister{
    margin-top: 10%
}
#formregister h3{
      color: white;
      text-align: center;
      font-weight: bold;
    }
</style>
