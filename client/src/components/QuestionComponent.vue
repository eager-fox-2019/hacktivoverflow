<template>
  <div class="d-flex flex-row m-5">
    <div class="m-3">
       <h4>Rating: {{ rating }}</h4>
    </div>
    <div class="m-3">
      <router-link :to="{ name: 'questionDetail', params: {id: this._id }}">
        <h3>{{title}}</h3>
      </router-link>
      <p> Question by: {{ user.fullName }} </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'description', 'upvotes', 'downvotes', '_id', 'user'],
  computed: {
    rating() {
      return this.upvotes.length - this.downvotes.length
    }
  }
}
</script>

<style>

</style>
