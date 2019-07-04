<template>
  <v-content>
    <v-parallax dark src="https://images.unsplash.com/photo-1511376777868-611b54f68947?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80">
      <v-layout align-center column justify-center>
        <h1 class="display-2 font-weight-thin mb-3">Welcome to MadeOverflow</h1>
        <h4 class="subheading">do not worry, be curious!</h4>
      </v-layout>
    </v-parallax>
    <v-layout class="landing-page-toolbar" row justify-center>
      <v-flex xs2 align-self-center>
        <LoginModal></LoginModal>
      </v-flex>
      <v-flex xs2 align-self-center>
        <SignUpModal></SignUpModal>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-flex xs6 text-xs-center px-5 py-5>
        <img class="left-image" src="../assets/13675474231555931396.svg" alt="">
        <h3 class="landing-page-text">Goes beyond code, let's help each other</h3>
        <p> ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cursus turpis massa tincidunt dui ut ornare lectus sit amet. Nec dui nunc mattis enim. Nibh tortor id aliquet lectus proin nibh. Nullam non nisi est sit amet facilisis magna etiam. At auctor urna nunc id cursus metus aliquam eleifend mi. Ac orci phasellus egestas tellus rutrum tellus. Feugiat in fermentum posuere urna nec tincidunt praesent. Non diam phasellus vestibulum lorem sed risus ultricies. Semper auctor neque vitae tempus.</p>
      </v-flex>
      <v-flex xs6 text-xs-center px-5 py-5>
        <img class="right-image" src="../assets/8922396241555931405.svg" alt="">
        <h3 class="landing-page-text">New friends, new network</h3>
        <p> ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cursus turpis massa tincidunt dui ut ornare lectus sit amet. Nec dui nunc mattis enim. Nibh tortor id aliquet lectus proin nibh. Nullam non nisi est sit amet facilisis magna etiam. At auctor urna nunc id cursus metus aliquam eleifend mi. Ac orci phasellus egestas tellus rutrum tellus. Feugiat in fermentum posuere urna nec tincidunt praesent. Non diam phasellus vestibulum lorem sed risus ultricies. Semper auctor neque vitae tempus.</p>
      </v-flex>
    </v-layout>
    <v-layout class="section-3-container" row align-center text-xs-center>
      <v-flex class="section-3-text-container">
      <h3 class="display-1 white--text"> "He who asks a question is a fool for five minutes; <br/> who does not ask a question remains a fool forever."</h3>
      </v-flex>
    </v-layout>
    <v-layout class="footer-section" row align-center text-xs-center>
      <v-flex>
      <h6 class="footer-text"> Built by Made Aryadi </h6>
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

  .left-image {
    width: 50%;
  }
  .right-image {
    width: 50%;
  }
  .landing-page-text {
    font-weight: bold;
    font-size: 2rem;
  }
  .section-3-container {
    height: 500px;
    background-color: #092140;
  }

  .section-3-text-container {
    padding: 0px 250px;
  }

  .section-3-text-container h3 {
    font-weight: bold;
  }
  .footer-section {
    height: 50px;
    background-color: #111;
  }

  .footer-text {
    font-size: 1rem;
    color: #aaa;
  }
</style>
