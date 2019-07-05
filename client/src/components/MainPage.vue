<template>
  <v-content>
    <Toolbar></Toolbar>
    <v-layout class="main-page">
      <LeftMainSection></LeftMainSection>
      <CenterMainSection></CenterMainSection>
    </v-layout>
  </v-content>
</template>

<script>
  import Toolbar from './Toolbar'
  import LeftMainSection from './LeftMainSection'
  import RightMainSection from './RightMainSection'
  import CenterMainSection from './CenterMainSection'

  export default {
    components: {
      Toolbar,
      LeftMainSection,
      RightMainSection,
      CenterMainSection
    },
    mounted() {
      this.$store.dispatch('readAllQuestions');
    }
  }
</script>

<style>
  .main-page {
    margin-top: 60px;
  }
</style>
