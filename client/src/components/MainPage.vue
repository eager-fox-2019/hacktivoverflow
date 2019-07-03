<template>
  <div>
    <Toolbar></Toolbar>
    <v-layout class="main-page">
      <LeftMainSection></LeftMainSection>
      <CenterMainSection></CenterMainSection>
      <RightMainSection></RightMainSection>
    </v-layout>
  </div>
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
    }
  }
</script>

<style>
  .main-page {
    margin-top: 60px;
  }
</style>
