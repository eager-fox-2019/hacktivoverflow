<template>
  <div class="home columns">
    <div class="column is-1 sidebar"></div>
    <div class="column is-10" id="post-container">
      <div id="topbar">
        <div id="search">
          <b-input placeholder="Search..."
            type="search"
            v-model="searchInput"
            icon="magnify" rounded>
          </b-input>
        </div>
      </div>
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
    <div class="column is-1 sidebar"></div>
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
  #search {
    width: 50%;
    margin: 0 auto;
  }
  .home {
    height: 100%;
    padding: 12px;
  }
  .sidebar {
    height: 100%;
    background-color: #FAFAFB;
    border-right: 1px solid rgba(0, 0, 0, 0.404);
    border-left: 1px solid rgba(0, 0, 0, 0.404);
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
