<template>
  <div>
  <router-view></router-view>
  <div v-if="isLoggedin" class="user">
    <h1>This is your user page</h1>
    <h2><label>Name: </label></h2>
    <h2>{{$store.state.user.name}}</h2>
    <h2><label>Email: </label></h2>
    <h2>{{$store.state.user.email}}</h2>
    <h2><b-button variant="secondary" @click="editProfileForm">Edit Profile?</b-button></h2>
  </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'user',
  computed: mapState(['isLoggedin']),
  methods: {
  	editProfileForm(){
  		this.$router.push('/user/edit')
  	}
  }
}
</script>

<style scoped>
.user {
  color: #F7C331;
  background-color: #6B7A8F;
  margin: 1em;
  padding: 1em;
  border-radius: 1em;
  font-weight: bold;
  min-width: 30em;
  width: 100%;
  max-width: 90em;
}

label {
  color: black;
}

button {
  padding: 1em;
  margin-top: 1em;
  border: solid black 2px;
}
</style>
