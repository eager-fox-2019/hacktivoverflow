<template>
    <div id="login-page">
        <div class="d-flex justify-content-center" style="width:800px; margin:10px auto;">
            <img src="http://chittagongit.com/download/412748" alt="logo Todoz" style="width:100px">
        </div>
      <hr>
      <div class="d-flex justify-content-center mb-5" style="width:500px; margin:10px auto;">
          <form @submit.prevent="login" style="width: 100%">
            <p v-if="loginForm" style="font-weight: bold; text-align: center;">To continue, log in to StackOverflow.</p>
            <p v-if="!loginForm" style="font-weight: bold; text-align: center;">Sign up with your email</p> 
            <p v-for="(errorMessage, index) in errorMessages" :key="index" class="error">{{ errorMessage }}</p>
            <div v-if="!loginForm" class="form-group">
              <input v-model="user.username" type="name" class="form-control rounded-0"  aria-describedby="emailHelp" placeholder="Username">
            </div>
            <div class="form-group">
              <input v-model="user.email" type="email" class="form-control rounded-0"  aria-describedby="emailHelp" placeholder="Email address">
            </div>
            <div class="form-group">
              <input v-model="user.password" type="password" class="form-control rounded-0"  placeholder="Password">
            </div>
            <div v-if="!loginForm" class="form-group tag">
            <label for="exampleInputEmail1">Technology tags that interest you</label>
            <template>
              <div>
                <vue-tags-input
                  v-model="tag"
                  :tags="tags"
                  @tags-changed="newTags => tags = newTags"
                />
              </div>
            </template>
            </div>
            <button v-if="loginForm" type="submit" class="btn btn-info rounded-pill" style="width:100%; height: 50px; font-weight:bold;">LOG IN</button>
            <button v-if="!loginForm" type="submit" class="btn btn-info rounded-pill" style="width:100%; height: 50px; font-weight:bold;">SIGN UP</button>              
          </form>
        </div>
        <hr style="border: 1px solid rgb(153, 150, 150); width:500px">
        <div class="d-flex justify-content-center" style="width:500px; margin:50px auto;">
          <form style="width: 100%">
            <h5 v-if="loginForm" style="text-align: center; font-weight:bold; "> 
              Don't have an account?
            </h5>
            <h5 v-if="!loginForm" style="text-align: center; font-weight:bold; "> 
              Already have an account?
            </h5>
            <div class="form-group mt-4">
              <button v-if="loginForm" @click.prevent="loginForm = false, errorMessages = [], user = {}" type="submit" class="btn btn btn-outline-secondary rounded-pill" style="width:100%; height: 50px; font-weight:bold;">SIGN UP FOR STACKOVERFLOW</button>
            </div>
            <div class="form-group mt-4">
              <button v-if="!loginForm" @click.prevent="loginForm = true, errorMessages = [], user = {}" type="submit" class="btn btn btn-outline-secondary rounded-pill" style="width:100%; height: 50px; font-weight:bold;">LOGIN FOR STACKOVERFLOW</button>
            </div>

          </form>  
        </div>
    </div>
</template>

<script>
import axios from '@/api/server.js'
import VueTagsInput from '@johmun/vue-tags-input';

export default {
  components: {
    VueTagsInput,
  },
  data () {
    return {
      loginForm: true,
      user: {
        username: null,
        email: null,
        password: null,
      },
      tag: '',
      tags: [],
      errorMessages : []
    }
  },
  methods : {
    login () {
      this.errorMessages = []
      if(!this.loginForm) {
        let input = {
          username : this.user.username,
          email: this.user.email,
          password: this.user.password,
          tags: this.tags
        }
        axios.post('/users/register', input )
          .then(({ data }) => {
            localStorage.setItem('token', data.token)
            localStorage.setItem('username', data.username)
            localStorage.setItem('userId', data.userId)
            this.$store.commit('haveLoged')
            this.$router.push('/home')
          })
          .catch(err => {
            err.response.data.forEach(el => {
              this.errorMessages.push(el)
            })
          })
      }else {
        axios.post('/users/login', this.user )
          .then(({ data }) => {
            localStorage.setItem('token', data.token)
            localStorage.setItem('username', data.username)
            localStorage.setItem('userId', data.userId)
            this.$store.commit('haveLoged')
            this.$router.push('/home')
          })
          .catch(err => {
            err.response.data.forEach(el => {
              this.errorMessages.push(el)
            })
          })
      }
    }
  },
  mounted () {
    this.errorMessages = []
  }
}
</script>

<style>
.error {
  color: red
}
label {
  padding: 7px;
  /* background-color: rgb(135, 161, 177); */
  font-weight: bold;
  /* vertical-align: middle */
}
.tag {
  text-align: center;
}
</style>
