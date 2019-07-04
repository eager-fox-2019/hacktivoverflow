<template>
  <div>
    <center>
      <h3 style="margin-top:5%">
        <i>Answer</i>
      </h3>
    </center>
    <div v-for="(answer, index) in answers" :key="index" style="padding: 15px;font-family: 'Fredoka One', cursive;">
      <div class="card w-75" style="margin-left:12%;">
        <div class="card-body">
        <h5>Answered by: {{answer.UserId.first_name + ' ' + answer.UserId.last_name}}</h5>
        <h6 class="headline mb-0" v-html="answer.answer"></h6>
         <h5 style="margin-left:48%;">
          <v-badge>
          <template v-slot:badge>
            <span>{{answer.upvotes.length - answer.downvotes.length}}</span>
          </template>
          <v-icon
            large
            color="grey lighten-1"
          >
          rate_review 
        </v-icon>
        </v-badge>
        </h5>
        <div style="margin-left:42%">
          <v-btn flat icon color="blue lighten-2 mx3" v-on:click="upvote(answer._id)">
          <v-icon>thumb_up</v-icon>
          </v-btn>
          <v-btn flat icon color="red lighten-2 mx3" v-on:click="downvote(answer._id)">
         <v-icon>thumb_down</v-icon>
          </v-btn>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../api/axios'

export default {
  props: ["answers"],
  methods: {
    upvote(AnswerId) {
      let token = localStorage.getItem("token");
      axios
        .patch(`/answers/upvote/${AnswerId}`, {}, { headers: { token } })
        .then(({ data }) => {
          const { message } = data;
          console.log(message);
          this.$emit("getUpdatedAnswers");
        })
        .catch(err => {
          const { message } = err.response.data;
          this.$swal("Error!", message, "error");
        });
    },
    downvote(AnswerId) {
      let token = localStorage.getItem("token");
      axios
        .patch(`/answers/downvote/${AnswerId}`, {}, { headers: { token } })
        .then(({ data }) => {
          const { message } = data;
          console.log(message);
          this.$emit("getUpdatedAnswers");
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
.v-card__title--primary {
  padding-top: 0px !important;
  padding-bottom: 0px !important;
}
</style>
