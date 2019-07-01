<template>
  <div class="home columns">
    <div class="column is-2" id="sidebar">sidebar</div>
    <div class="column" id="post-container">
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Post from '@/components/Post.vue'
export default {
  name: 'home',
  components: {
    Post
  }
}
</script>

<style lang="scss" scoped>
  $primary: #311B92;
  .home {
    height: 100%;
    padding: 12px;
  }
  #sidebar {
    height: 100%;
    background-color: #FAFAFB;
    border-right: 1px solid rgba(0, 0, 0, 0.404);
    z-index: -99999;
  }
  #post-container {
    height: 100%;
    overflow-y: auto;
  }
  #post-container::-webkit-scrollbar {
    width: 10px;
  }
  
  #post-container::-webkit-scrollbar-track {
    background: #f1f1f1
  }
  
  #post-container::-webkit-scrollbar-thumb {
    background: $primary  ; 
  }
</style>

