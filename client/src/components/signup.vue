<template>
  <v-container>
    <v-layout>
      <v-flex style="background-color: white;" xs4 offset-xs4>
        <v-alert
          :value="error"
          type="error"
          transition="scale-transition"
        >
          <span class="font-weight-bold subheading">{{ errMessage }}</span>
        </v-alert>
        <div style="border: 1px solid #BEBEBE;">
          <div class="title pa-3" style="text-align:center; background-color: #F7C10A;"> Sign Up</div>
          <form class="pa-3">
            <v-text-field
              v-model="firstName"
              :error-messages="firstNameErrors"
              label="First name"
              required
              @input="$v.firstName.$touch()"
            ></v-text-field>

            <v-text-field
              v-model="lastName"
              :error-messages="lastNameErrors"
              label="Last name"
              required
              @input="$v.lastName.$touch()"
            ></v-text-field>

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
              <div class="subheading">Already have an account? <router-link tag="span" class="signupbtn ml-2" style="cursor:pointer; color: #4787FF;" to="/signin">Sign in </router-link></div>
              <v-spacer></v-spacer>
              <v-btn @click="clear">clear</v-btn>
              <v-btn @click="submit">Sign Up</v-btn>
            </v-layout>
          </form> 
            <SignInSuccess :dialog="dialog" />
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'
import axios from 'axios'
import SignInSuccess from '@/components/signinsuccess'

export default {
  name: 'SignUp',
  mixins: [validationMixin],

    validations: {
      firstName: { required },
      lastName: { required },
      email: { required, email },
      password: { required },
    },


    components: {
      SignInSuccess
    },

    data: () => ({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      errMessage: '',
      error: false,
      success: false,
      dialog: false,
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
      },
      firstNameErrors () {
        const errors = []
        if (!this.$v.firstName.$dirty) return errors
        !this.$v.firstName.required && errors.push('First name is required.')
        return errors
      },
      lastNameErrors () {
        const errors = []
        if (!this.$v.lastName.$dirty) return errors
        !this.$v.lastName.required && errors.push('Last name is required.')
        return errors
      },
    },

    methods: {
      submit () {
        this.$v.$touch()
        axios({ 
          method: 'POST',
          url: `${this.$store.state.baseURL}/users/signup`,
          data: {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password
          }
        })
          .then(({data}) => {
            this.dialog = true
          })
          .catch(({response}) => {
            let msg = response.data.message
            
            if(msg.includes('required') === false) {
              let err = msg.split(':').slice(2).join(' ')
              this.errMessage = err
              this.error = true
            }
          })
      },
      clear () {
        this.$v.$reset()
        this.email = ''
        this.password = ''
        this.firstName = ''
        this.lastName = ''
      },
    }
}
</script>

<style>

</style>
