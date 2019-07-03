<template>

  <v-layout id="left-section" text-xs-center>
    <v-flex>
      <v-btn to="/" class="nav-button white--text" flat>
        <i class="material-icons mr-2">format_list_bulleted</i>Question List
      </v-btn>
      <v-btn to="/add_question" class="nav-button white--text" flat>
        <i class="material-icons mr-2">library_add</i>Add Question
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
    border-right: 1px solid #ddd;
    width: 15%;
    background-color: #5E4F73;
  }

  .nav-button {
    margin: 0;
    width: 100%;
    font-size: 1rem;
    color: #555;
  }
</style>
