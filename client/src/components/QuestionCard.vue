<template>
  <div>
    <div v-for="(question, index) in filterQuestions" :key="index" style="padding: 15px">
      <div class="card w-75" style="margin-left:12%;">
        <div class="card-body">
        <p class="card-title">{{new Date(question.createdAt).toDateString()}} by <em>{{question.UserId.first_name + ' ' + question.UserId.last_name}}</em></p>
        <h3 class="card-text" style="color:gray;">{{question.title}}?</h3>
        <p class="card-text" v-html="question.description" style="color:gray;"></p>
        <h5 style="margin-left:48%;">
          <v-badge>
          <template v-slot:badge>
            <span>{{question.upvotes.length - question.downvotes.length}}</span>
          </template>
          <v-icon
            large
            color="grey lighten-1"
          >
          rate_review 
        </v-icon>
        </v-badge>
        </h5>
        <div style="margin-left:46.5%;">
           <span class="badge badge-secondary mx-1" v-for="tag in question.tags" :key="tag"> 
            {{tag}} 
          </span>
        </div>
        <br>
        <router-link :to="`/dashboard/view/${question._id}`" style="textDecoration: none; margin-left:47%;">
        <a href="#" class="btn btn-primary">View</a>
        </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ['search'],
  created() {
    this.questions = this.allQuestions
  },
  data() {
    return {
      questions: []
    };
  },
  computed: {
    filterQuestions() {
      return this.questions.filter(question => {
        return question.title.toLowerCase().match(this.search);
      });
    },
    ...mapState(["allQuestions"])
  },
  watch:{
    allQuestions(newQuestion , oldQuestion){
      this.questions = newQuestion
      console.log(`We have ${newQuestion}`)
    }
  },
};
</script>

<style>
</style>
