<template>
  <v-layout class="center-section">
    <QuestionContainer></QuestionContainer>
    <!-- <AddForm></AddForm> -->
  </v-layout>
</template>

<script>
  import QuestionContainer from './QuestionContainer'
  import AddForm from './AddForm'

  export default {
    components: {
      QuestionContainer,
      AddForm
    }
  }
</script>

<style scoped>
  .center-section {
    width: 100vh;
    height: 100vh;
  }
</style>
