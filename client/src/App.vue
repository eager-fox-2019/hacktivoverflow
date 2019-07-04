<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import axios from '@/api/server.js'
export default {
  created () {
    if(!localStorage.getItem('token')){
      this.$router.push('/login')
    }else {
      let token = localStorage.getItem('token')
      axios.get('/authenticate', { headers : { token }  })
      .then(() => {
        this.$router.push('/home')        
      })
      .catch(err => {
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style>
</style>
