<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on }">
        <v-btn flat dark v-on="on">
          <v-icon>arrow_forward</v-icon>Log Out
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">Are you sure want to log out?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="dialog = false">No</v-btn>
          <v-btn color="green darken-1" flat @click="logout">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    data() {
      return {
        dialog: false
      }
    },
    methods: {
      logout() {
        this.dialog = false;
        this.$store.dispatch('logout');
      }
    }
  }
</script>

<style>
</style>
