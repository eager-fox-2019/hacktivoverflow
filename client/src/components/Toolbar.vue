<template>
  <v-toolbar fixed class="toolbar"> 
    <v-toolbar-title class="white--text">MadeOverflow</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <LogoutModal></LogoutModal>
      <h6></h6>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  import LogoutModal from './LogoutModal'
  export default {
    components: {
      LogoutModal
    }

  }
</script>

<style scoped>
  .toolbar {
    background-color: #092140;
  }
</style>
