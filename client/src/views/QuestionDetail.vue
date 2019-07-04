<template>
  <div>
    <div class="d-flex flex-row m-5">
      <div class="m-3">
        <b-button variant="light">Up</b-button>
        <br />
        <b-button variant="light">Down</b-button>
        <h4>Rating: {{ rating }}</h4>
      </div>
      <b-container fluid class="m-3 w-100">
        <b-row align-v="start" class="w-100">
          <b-col sm="12" class="w-100">
            <h3>{{ questionDetail.title }}</h3>
            <p>Question by: {{ fullName }}</p>
            <p>{{ questionDetail.description }}</p>
          </b-col>
          <b-col sm="12" class="w-100">
            <hr/>
            <h5>Answer This Question</h5>
            <input class="m-2 w-100" placeholder="Title" type="text" v-model="form.title" /> <br/>
            <textarea class="m-2 w-100" style="height:150px;" placeholder="Description" type="text" v-model="form.description"> </textarea> <br/>
            <b-button class="m-2" variant="light">Answer</b-button> 
          </b-col>
        </b-row>
      </b-container>
    </div>
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  created() {
    this.$store.dispatch("fetchQuestionDetail", { id: this.$route.params.id });
  },
  props: ["title", "description", "upvotes", "downvotes", "_id", "user"],
  data() {
    return {
      rating: 0,
      form: {
        title: '',
        description: '',
      }
    };
  },
  computed: {
    fullName() {
      return this.questionDetail.user && this.questionDetail.user.fullName
    },
    ...mapState(["questionDetail", "loggedUser"])
  },
  watch: {
    questionDetail(val) {
      this.rating =
        val.upvotes.length - val.downvotes.length;
    }
  }
};
</script>

<style>
</style>
