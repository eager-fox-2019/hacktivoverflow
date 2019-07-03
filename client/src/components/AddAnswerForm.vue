<template>
  <v-layout>
    <v-form class="form-add-answer mt-5">
      <v-textarea label="Answer" hint="Write your answer here"></v-textarea>
      <v-btn color="success">
        Submit
      </v-btn>
    </v-form>
  </v-layout>
</template>

<script>
  export default {

  }
</script>

<style scoped>
  .form-add-answer {
    width: 80%;
    margin: 0 auto;
    margin-bottom: 50px;
  }
</style>
