<template>
  <div>
    <nav class="navbar navbar-expand-sm navbar-dark justify-content-between" style="background-color: black;">
      <!-- Brand/logo -->
      <a class="navbar-brand pointer" @click="goToHome" style="font-size: 1.5rem; color:white;">HacktivOverflow</a>
      
      <!-- Links -->
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" style="color: white" data-toggle="modal" data-target="#signinModal" v-if="!$store.state.isLogin"><i class="fas fa-user fa-2x"></i></a>
          <a class="nav-link" style="color: white; font-weight: bold" v-if="$store.state.isLogin" @click="signout">Sign Out</a>
        </li>
      </ul>
    </nav>

    <!-- SIGNIN MODALS -->
    <div class="modal fade" id="signinModal">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title" style="margin-left: 1%">SignIn</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <!-- Modal body -->
                <div class="modal-body">
                    <form @submit.prevent="signin()">
                        <div class="form-group" style="margin-left:1%; margin-right: 1%;">
                            <label for="email">Email:</label>
                            <input type="text" class="form-control" v-model="user.email">
                        </div>
                        <div class="form-group" style="margin-left:1%; margin-right: 1%;">
                            <label for="password">Password:</label>
                            <input type="password" class="form-control" v-model="user.password">
                            <button class="btn btn-dark" type="submit" style="margin-top: 3%; width: 100%; background-color: black;">SignIn</button>
                        </div>
                    </form>
                    <div>
                        <a data-toggle="modal" data-target="#signupModal" data-dismiss="modal" class="pointer" style="float: right; margin-right: 1%; color: blue">SignUp</a>
                        <a class="default" style="float: right; margin-right: 1%;">Don't have any account?</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- SIGNUP MODALS -->
    <div class="modal fade" id="signupModal">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title" style="margin-left: 1%">SignUp</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <!-- Modal body -->
                <div class="modal-body">
                    <form @submit.prevent="signup">
                        <div class="form-group" style="margin-left:1%; margin-right: 1%;">
                            <label for="name">Name:</label>
                            <input type="text" class="form-control" v-model="newUser.name">
                        </div>
                        <div class="form-group" style="margin-left:1%; margin-right: 1%;">
                            <label for="email">Email:</label>
                            <input type="email" class="form-control" v-model="newUser.email">
                        </div>
                        <div class="form-group" style="margin-left:1%; margin-right: 1%;">
                            <label for="password">Password:</label>
                            <input type="password" class="form-control" v-model="newUser.password">
                            <button class="btn btn-dark" type="submit" style="margin-top: 3%; width: 100%; background-color: black;">SignUp</button>
                        </div>
                    </form>
                    <div>
                        <a data-toggle="modal" data-target="#signinModal" data-dismiss="modal" class="pointer" style="float: right; margin-right: 1%; color: blue">SignIn</a><a class="default" style="float: right; margin-right: 1%;">Have any account?</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <router-view/>

    <div class="footer">
      <h5 style="margin-top: 1.2%;">&copy;2019 - <strong>Elia Victor</strong></h5>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      user: {
        email: '',
        password: ''
      },
      newUser: {
        name: '',
        email: '',
        password: ''
      },
      userId: ''
    }
  },
  created () {
    this.$store.commit('checkLogin')
    this.$store.dispatch('retrievePosts')
    this.$store.dispatch('retrieveMyPosts')
  },
  methods: {
    goToHome () {
      this.$router.push('/home')
    },
    signin () {
      let obj = {
        email: this.user.email,
        password: this.user.password
      }
      this.$store.dispatch('signIn', obj)
      this.$store.dispatch('retrievePosts')
      this.$store.dispatch('retrieveMyPosts')
      this.user.email = ''
      this.user.password = ''
      this.$router.push('/home')
    },
    signup () {
      let obj = {
        name: this.newUser.name,
        email: this.newUser.email,
        password: this.newUser.password
      }
      this.$store.dispatch('signUp', obj)
      this.newUser.name = ''
      this.newUser.email = ''
      this.newUser.password = ''
      // console.log(obj,'ini obj register')
    },
    signout () {
      Swal.fire({
        title: 'Are you sure?',
        text: 'We will miss you!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#343A40',
        cancelButtonColor: '#C82333',
        confirmButtonText: 'Yes, signout!'
      })
        .then((result) => {
          if (result.value) {
            localStorage.clear()
            this.$router.push('/home')
            this.$store.commit('checkLogin')
            this.$store.dispatch('retrievePosts')
            this.$store.dispatch('retrieveMyPosts')
          }
        })
    }
  }
}
</script>

<style>
  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 50px;
    width: 100%;
    background-color: black;
    color: white;
    text-align: center;
  }
  .pointer {cursor: pointer;}
</style>
