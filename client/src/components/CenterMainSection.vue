<template>
  <v-layout class="center-section">
    <router-view></router-view>
  </v-layout>
</template>

<script>
  import LeftMainSection from './LeftMainSection'
  import RightMainSection from './LeftMainSection'
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
    width: 65%;
    min-height: 100vh;
  }
</style>
