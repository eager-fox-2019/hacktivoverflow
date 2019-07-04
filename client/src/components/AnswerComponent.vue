<template>
  <div>
    <hr/>
    <div class="d-flex flex-row m-5">
      <div class="m-3">
        <b-button @click="vote('upvote')" variant="light">Up</b-button>
        <br />
        <b-button @click="vote('downvote')" variant="light">Down</b-button>
        <h4>Rating: {{ rating }}</h4>
      </div>
      <b-container fluid class="m-3 w-100">
        <b-row align-v="start" class="w-100">
          <b-col sm="12" class="w-100">
            <h3>{{ title }}</h3>
            <p>Answer by: {{ user.fullName }}</p>
            <p>{{ description }}</p>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  created() {
  },
  methods: {
    async vote (action) {
      // let res = await this.$store.dispatch('vote', )
    }
  },
  props: ["title", "description", "upvotes", "downvotes", "_id", "user"],
  data() {
    return {}
  },
  computed: {
    rating() {
      this.test
      return this.upvotes.length - this.downvotes.length
    },
    ...mapState(["questionDetail", "loggedUser"])
  },
};
</script>

<style>
</style>
