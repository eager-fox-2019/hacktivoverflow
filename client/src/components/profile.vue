<template>
   <v-layout column >
      <v-flex xs12 class="mt-4" style="background-color: white; border: 1px solid #BEBEBE">
          <div class="mt-4 ml-3" style="height: 400px;">
            <!-- <div class="title">Welcome, <span style="color:#929292;">{{ $store.state.loggedUser.firstName[0].toUpperCase() + $store.state.loggedUser.firstName.slice(1)}} {{ $store.state.loggedUser.lastName[0].toUpperCase() + $store.state.loggedUser.lastName.slice(1)}}</span></div> -->
          </div>
      </v-flex>
    </v-layout>
</template>

<script>
export default {
  name: 'Profile',
  data () {
    return {
      fullName: ''
    }
  }
}
</script>

<style>

</style>
