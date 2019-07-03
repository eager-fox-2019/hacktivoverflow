<template>
  <v-form class="form-create mt-5">
    <v-text-field label="Title"></v-text-field>
    <v-textarea label="Description" hint="Write your question here"></v-textarea>
    <v-btn color="success">
      Submit
    </v-btn>
  </v-form>
</template>

<script>
  export default {

  }
</script>

<style scoped>
  .form-create {
    width: 80%;
    margin: 0 auto;
  }
</style>
