<template>
  <div>
    <div v-for="(answer, index) in myAnswers" :key="index" style="padding: 15px">
      <!-- ANSWERS -->
      <div class="card w-75" style="margin-left:12%;">
        <div class="card-body">
        <h5 class="card-title" style="text-align:center;">{{new Date(answer.createdAt).toDateString()}}</h5>
        <h6 class="headline mb-0" style="font-family:'Fredoka One',cursive !important; color:gray;" v-html="answer.answer"></h6>
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
        <EditAnswerDialog v-bind:answerDetails="answer"/>
        <a href="#" class="btn btn-danger ml-3" v-on:click="deleteAnswer(answer._id)">Delete</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import EditAnswerDialog from "./EditAnswerDialog";
import axios from '../api/axios'

export default {
  computed: mapState(["myAnswers"]),
  components: {
    EditAnswerDialog
  },
  methods: {
    deleteAnswer(AnswerId) {
      this.$swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this reply!",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          let token = localStorage.getItem("token");
          axios
            .delete(`/answers/${AnswerId}`, {
              headers: { token }
            })
            .then(({ data }) => {
              this.$swal("Poof! Your reply has been deleted!", {
                icon: "success"
              });
              this.$store.dispatch("getUserAnswers");
              //   this.$store.dispatch("getUserQuestions");
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          swal("Your imaginary file is safe!");
        }
      });
    }
  }
};
</script>

<style>
</style>
