<template>
  <v-dialog
    v-model="dialog"
    max-width="300"
  >
    <v-card>
      <v-card-title class="headline">Successfully registered</v-card-title>

      <v-card-text class="text-xs-center">
        You can now sign in and use HacktivOverflow's features!
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          color="red darken-1"
          flat="flat"
          @click="dialog = false"
        >
          Close
        </v-btn>

        <v-btn
          color="green darken-1"
          flat="flat"
          @click="toSignIn"
        >
          Procceed to sign in
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'SignInSuccess',
  props: ['dialog'],
  data() {
    return{
    
    }
  },

  methods: {
    toSignIn() {
      this.$router.push('/signin')
    }
  }
}
</script>

<style>

</style>
