<template>
<v-content>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on"><v-icon>person</v-icon> Login</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Sign In</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="userObj.email" label="Email" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="userObj.password" label="Password" type="password" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="dialog = false">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</v-content>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      userObj: {
        email: '',
        password: ''
      }
    }),
    methods: {
      login() {

      }
    }
  }
</script>

<style>

</style>
