<template>
  <v-content>
    <v-parallax dark src="https://images.unsplash.com/photo-1511376777868-611b54f68947?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80">
      <v-layout align-center column justify-center>
        <h1 class="display-2 font-weight-thin mb-3">Welcome to HacktivOverflow</h1>
        <h4 class="subheading">Be curious here! Start asking questions!</h4>
      </v-layout>
    </v-parallax>
    <v-layout class="landing-page-toolbar" row justify-center>
      <v-flex xs1 align-self-center>
        <LoginModal></LoginModal>
      </v-flex>
      <v-flex xs1 align-self-center>
        <SignUpModal></SignUpModal>
      </v-flex>
    </v-layout>
  </v-content>
</template>

<script>
import LoginModal from './LoginModal'
import SignUpModal from './SignUpModal'
  export default {
    components: {
      SignUpModal,
      LoginModal
    }
  }
</script>

<style scoped>
  .landing-page-toolbar {
    background-color: #092140;
    padding: 0px;
    width: 100%;
    height: 70px;
  }

  .landing-sign-icon {
    font-size: 3rem;  
  }
</style>
