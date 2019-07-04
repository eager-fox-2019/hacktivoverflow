<template>
  <v-content>
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn flat dark v-on="on">
            <v-icon>person_add</v-icon> Sign Up
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Sign Up</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-form class="form-input" ref="form" v-model="valid" lazy-validation>
                  <v-flex xs12>
                    <v-text-field @keydown.enter.prevent="register" label="First Name" v-model="userObj.firstName" :rules="nameRules" required></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field @keydown.enter.prevent="register" label="Last Name" v-model="userObj.lastName" :rules="nameRules" required></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field @keydown.enter.prevent="register" label="Email" v-model="userObj.email" :rules="emailRules" required>
                    </v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field @keydown.enter.prevent="register" label="Password" v-model="userObj.password" type="password" :rules="passwordRules" required></v-text-field>
                  </v-flex>
                </v-form>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="reset">Reset Form</v-btn>
            <v-btn color="blue darken-1" flat @click="resetValidation">Reset Validation</v-btn>
            <v-btn color="blue darken-1" flat @click="register">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-content>
</template>

<script>
  export default {
    data: () => {
      return {
        valid: true,
        userObj: {
          firstName: '',
          lastName: '',
          email: '',
          password: ''
        },
        nameRules: [
        v => !!v || 'cannot be empty',
        ],
        passwordRules: [
        v => !!v || 'password is required',
        v => (v && v.length >= 5) || 'Password must be more than 4 characters'
        ],
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        dialog: false
      }
    },
    methods: {
      register() {
        if (this.$refs.form.validate()) {
          this.dialog = false;
          this.$store.dispatch('register', this.userObj);
        }
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      reset () {
        this.$refs.form.reset()
      }
    }
  }
</script>

<style scoped>
  .form-input {
    width: 100%;
  }
</style>
