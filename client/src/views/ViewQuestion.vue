<template>
  <div>
    <div class="card w-75" style="margin-left:12%;">
        <div class="card-body">
        <h5 class="card-title" style="text-align:center;">{{new Date(question.createdAt).toDateString()}} by <em>{{question.UserId.first_name + ' ' + question.UserId.last_name}}</em></h5>
        <h3 class="card-text" style="color:gray;text-align:center;">{{question.title}}?</h3>
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
        <AnswerDialog
                v-bind:QuestionId="this.$route.params.QuestionId"
                v-on:createAnswer="createAnswer"
        ></AnswerDialog>
        <div style="margin-left:42%">
          <v-btn flat icon color="blue lighten-2 mx3" v-on:click="upvote">
          <v-icon>thumb_up</v-icon>
          </v-btn>
          <v-btn flat icon color="red lighten-2 mx3" v-on:click="downvote">
         <v-icon>thumb_down</v-icon>
          </v-btn>
        </div>
        </div>
      </div>
      <div class="container">
        <AnswersCard
                  v-bind:answers="answers"
                  v-if="answers.length"
                  v-on:getUpdatedAnswers="getAnswers(question._id)"
        ></AnswersCard>
      </div>             
  </div>
</template>

<script>
import AnswersCard from "../components/AnswersCard";
import AnswerDialog from "../components/AnswerDialog";
import axios from '../api/axios'

export default {
  data() {
    return {
      question: "",
      answers: []
    };
  },
  created() {
    const { QuestionId } = this.$route.params;
    this.getQuestionDetails(QuestionId);
    this.getAnswers(QuestionId);
  },
  components: {
    AnswersCard,
    AnswerDialog
  },
  methods: {
    getQuestionDetails(QuestionId) {
      let token = localStorage.getItem("token");
      axios
        .get(`/questions/${QuestionId}`, { headers: { token } })
        .then(({ data }) => {
          this.question = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getAnswers(QuestionId) {
      let token = localStorage.getItem("token");
      axios
        .get(`/answers/${QuestionId}`, { headers: { token } })
        .then(({ data }) => {
          this.answers = data;
          this.$store.dispatch("getUserAnswers");
        })
        .catch(err => {
          console.log(err);
        });
    },
    createAnswer() {
      this.getAnswers(this.$route.params.QuestionId);
    },
    upvote() {
      let { QuestionId } = this.$route.params;
      let token = localStorage.getItem("token");
      axios
        .patch(`/questions/upvote/${QuestionId}`, {}, { headers: { token } })
        .then(({ data }) => {
          const { message } = data;
          this.getQuestionDetails(QuestionId);
          this.$store.dispatch("getQuestions");
          this.$store.dispatch("getUserQuestions");
        })
        .catch(err => {
          const { message } = err.response.data;
          this.$swal("Error!", message, "error");
        });
    },
    downvote() {
      let { QuestionId } = this.$route.params;
      let token = localStorage.getItem("token");
      axios
        .patch(`/questions/downvote/${QuestionId}`, {}, { headers: { token } })
        .then(({ data }) => {
          const { message } = data;
          this.getQuestionDetails(QuestionId);
          this.$store.dispatch("getQuestions");
          this.$store.dispatch("getUserQuestions");
        })
        .catch(err => {
          const { message } = err.response.data;
          this.$swal("Error!", message, "error");
        });
    }
  }
};
</script>

<style scoped>
#answerContainer {
  width: 90% !important;
}

#questionContainer {
  width: 90% !important;
}
</style>
