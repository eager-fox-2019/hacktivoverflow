<template>
  <div class="d-flex flex-row justify-content-center">
    <div class="m-3">
      <b-button variant="light">Up</b-button><br/>
      <b-button variant="light">Down</b-button>
    </div>
    <div class="m-3">
      <router-link :to="{ name: 'questionDetail', params: {id: this._id }}">
        <h3>{{title}}</h3>
      </router-link>
    </div>
    <div class="m-3">
      <b-button variant="warning">Delete</b-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'description', 'upvotes', 'downvotes', '_id', 'user']
}
</script>

<style>

</style>
