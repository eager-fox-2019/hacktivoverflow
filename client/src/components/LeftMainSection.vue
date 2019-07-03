<template>

  <v-layout id="left-section" text-xs-center>
    <v-flex>
      <v-btn class="nav-button white--text" flat>
        Add Question
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {

  }
</script>

<style scoped>
  #left-section {
    padding: 50px 0px;
    min-height: 100vh;
    border-right: 1px solid #ddd;
    width: 20%;
    background-color: #5E4F73;
  }

  .nav-button {
    width: 70%;
    font-size: 1.6rem;
    color: #555;
  }
</style>
