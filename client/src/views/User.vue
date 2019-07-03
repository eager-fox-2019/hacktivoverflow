<template>
  <div class="d-flex justify-content-center">
    <div v-if="isLoggedin" class="user">
      <h2><label>Hello,</label> {{$store.state.user.name}}</h2>
      <h2><label>Your Email: </label> {{$store.state.user.email}}</h2>
      <h2><b-button v-if="showEditButton" variant="secondary" @click="editProfileForm">Edit Profile?</b-button></h2>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'user',
  computed: {
    showEditButton(){
      return this.$route.name == 'user'
    },
    ...mapState(['isLoggedin'])
  },
  methods: {
  	editProfileForm(){
      console.log(this.$router.history.current.fullPath)
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
  min-width: 15em;
  width: 100%;
  max-width: 30em;
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
