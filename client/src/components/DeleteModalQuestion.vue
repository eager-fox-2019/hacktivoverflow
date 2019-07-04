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
          <v-btn color="green darken-1" flat @click="deleteQuestion">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    props: ['question'],
    data() {
      return {
        dialog: false
      }
    },
    methods: {
      deleteQuestion() {
        this.dialog = false;
        this.$store.dispatch('deleteQuestion', this.question);
        this.$store.dispatch('deleteManyAnswer', this.question.answers)
      }
    }
  }
</script>

<style>
</style>
