<template>
  <div>
    <div class="row d-flex justify-content-center" v-for="answer in answers" :key="answer._id">
      <div class="col-lg-8 comment border">
        <!-- {{answer}} -->
        <!-- <b-card bg-variant="outline-primary" :header="answer.user_id.username" class="text-left"> -->
        <small>{{new Date(answer.createdAt).toLocaleString()}}</small>
        <b-card-text>{{answer.description}}</b-card-text>
        <div>
          <small>by {{answer.user_id.username}}</small>
        </div>
        <b-button id="show-btn" v-if="checkAuth(answer)" @click="showModal(answer)">Edit</b-button>
        <div class="d-flex justify-content-end">
          <b-button variant="outline-primary" @click="upvote(answer)">upvote</b-button>
          <h4>{{answer.upvotes.length - answer.downvotes.length}}</h4>
          <b-button variant="outline-primary" @click="downvote(answer)">downvote</b-button>
        </div>
          <p>{{error}}</p>
        <!-- </b-card> -->
      </div>

    </div>
    <b-modal ref="myn-modal" hide-footer title="Edit Answer">
      <div class="d-block text-center">
        <form @submit.prevent="editAnswer(answer)">
          <b-form-textarea
            id="textarea"
            v-model="desc"
            placeholder="Enter your question"
            rows="3"
            max-rows="6"
            class="mt-3"
          ></b-form-textarea>
          <b-button class="mt-3" type="submit" variant="outline-danger">Save</b-button>
          <b-button class="mt-3" variant="outline-danger" @click="hideModal">Close Me</b-button>
        </form>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ax from "@/axiosApi";

export default {
  name: "answerList",
  computed: {
    ...mapState(["answers"])
  },
  data() {
    return {
      error: "",
      desc: "",
      tempAnswer:''
    };
  },
  mounted() {
    this.$store.dispatch("GETANSWER", this.$route.params.questionId);
  },
  methods: {
    checkAuth(data) {
      if (localStorage.getItem("user") == data.user_id._id) {
        return true;
      } else {
        return false;
      }
    },
    showModal(answer) {
      this.desc = answer.description;
      this.tempAnswer = answer
      this.$refs["myn-modal"].show();
    },
    hideModal() {
      this.$refs["myn-modal"].hide();
    },
    editAnswer(data) {
      console.log(this.tempAnswer);
      
      let dataQ = {
        id: this.tempAnswer._id,
        desc: this.desc
      };
      this.$store.dispatch("EDITANSWER", dataQ);
      this.$refs["myn-modal"].hide();
    },
    upvote(answer) {
      console.log(answer);

      ax.patch(
        `answers/upvote/${answer._id}`,
        {},
        {
          headers: {
            token: localStorage.getItem("token")
          }
        }
      )
        .then(({ data }) => {
          console.log(data);
          this.$store.dispatch("GETANSWER", this.$route.params.questionId);

        })
        .catch(err => {
          this.error = err;
          console.log(err);
        });
    },
    downvote(answer) {
      ax.patch(
        `answers/downvote/${answer._id}`,
        {},
        {
          headers: {
            token: localStorage.getItem("token")
          }
        }
      )
        .then(({ data }) => {
          this.$store.dispatch("GETANSWER", this.$route.params.questionId);
          console.log(data);
        })
        .catch(err => {
          this.error = err.message;
          console.log(err);
        });
    }
  }
};
</script>

<style>
.comment {
  text-align: left;
}
</style>
