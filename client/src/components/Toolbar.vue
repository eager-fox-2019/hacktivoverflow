<template>
  <v-toolbar fixed class="toolbar"> 
    <v-toolbar-title class="white--text">HacktivOverflow</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <LogoutModal></LogoutModal>
      <!-- <v-btn @click="logout" class="white--text" flat><v-icon>arrow_forward</v-icon>Log Out</v-btn> -->
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
