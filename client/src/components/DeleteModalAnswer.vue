<template>
  <v-layout d-inline>
    <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on }">
        <v-btn color="error" v-on="on">
          Delete
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">Are you sure want to delete this?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="dialog = false">No</v-btn>
          <v-btn color="green darken-1" flat @click="deleteAnswer">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    props: ['answer'],
    data() {
      return {
        dialog: false
      }
    },
    methods: {
      deleteAnswer() {
        this.dialog = false;
        this.$store.dispatch('deleteAnswer', this.answer);
      }
    }
  }
</script>

<style>
</style>
