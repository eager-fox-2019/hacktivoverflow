<template>
  <div class="container-fluid">
    <div style="height: 720px; width: auto; background-image: url('http://www.jakpost.travel/imgfiles/full/20/203398/question-wallpaper.jpg'); margin:-1%;">
      <br>
      <div class="">
        <h1 style="color: white; text-align:center; text-shadow:4px 4px 1px black; margin-top: 20%">WELCOME TO HACKTIVOVERFLOW</h1>
        <h3 class="pointer" style="color: white; text-align:center; text-shadow:4px 4px 1px black;" @click="goToPost">Browse Posts</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'landing',
  components: {
  },
  methods : {
    goToPost() {
      this.$router.push('/home')
    }
  }
}
</script>
<style scoped>
  .pointer {cursor: pointer;}
</style>

