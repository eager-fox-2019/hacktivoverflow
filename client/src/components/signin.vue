<template>
  <v-container>
    <v-layout>
      <v-flex style="background-color: white; border: 1px solid #BEBEBE;" xs4 offset-xs4>
        <v-alert
          :value="error"
          type="error"
          transition="scale-transition"
        >
        <span class="font-weight-bold subheading">{{ errMessage }}</span>
        </v-alert>
        
        <div class="title pa-3" style="text-align:center; background-color: #F7C10A;"> Sign In</div>
        <form class="pa-3">
          <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            label="E-mail"
            required
            @input="$v.email.$touch()"
          ></v-text-field>

            <v-text-field
            v-model="password"
            :error-messages="passwordErrors"
            label="password"
            type="password"
            required
            @input="$v.password.$touch()"
          ></v-text-field>
          
          <v-layout align-center>
            <!-- <v-spacer></v-spacer> -->
            <div class="subheading">Don't have an account? <router-link tag="span" class="signupbtn ml-2" style="cursor:pointer; color: #4787FF;" to="/signup">Sign up </router-link></div>
            <v-spacer></v-spacer>
            <v-btn @click="clear">clear</v-btn>
            <v-btn @click="submit">Sign in</v-btn>
          </v-layout>
        </form> 
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'
import axios from 'axios'

export default {
  name: 'SignIn',
  mixins: [validationMixin],
    validations: {
      email: { required, email },
      password: { required }
    },

    data: () => ({
      email: '',
      password: '',
      errMessage: '',
      error: false
    }),

    computed: {
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.required && errors.push('Password is required.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      }
    },

    methods: {
      submit () {
        this.$v.$touch()
       
        axios({ 
          method: 'POST',
          url: `${this.$store.state.baseURL}/users/signin`,
          data: {
            email: this.email,
            password: this.password
          }
        })
          .then(({data}) => {
            localStorage.setItem('access_token', data.access_token)
            this.$store.dispatch('getPublicQuestions')
            this.$store.dispatch('decodeToken')
            this.$store.dispatch('getMyQuestions')
            this.$store.commit('SET_LOGIN', data)
            this.$router.push('/')
          })
          .catch(({response}) => {
              let msg = response.data.message
              // let err = msg.split(':').slice(2).join(' ')
              this.errMessage = msg
              this.error = true
          })
      },
      clear () {
        this.$v.$reset()
        this.email = ''
        this.password = ''
      }
    }
}
</script>

<style>
  .signupbtn:hover {
    text-decoration: underline;
  }
</style>
