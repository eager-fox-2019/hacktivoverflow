<template>
  <div class="container">
    <div class="row d-flex justify-content-center">
      <div class="col-lg-9">
        <b-card bg-variant="light" :header="onequestion.title" class="text-left">
          <small>{{new Date(onequestion.createdAt).toLocaleString()}}</small>
          <b-card-text>{{onequestion.description}}</b-card-text>
          <div class="d-flex justify-content-end">
          <b-button variant="outline-primary" @click="upvote(onequestion)">upvote</b-button>
          <h4> {{upvotes - downvotes}} </h4>
          <b-button variant="outline-primary" @click="downvote(onequestion)">downvote</b-button>
          </div>
          <p>{{error}}</p>
          <b-button id="show-btn" v-if="checkAuth(onequestion)" @click="showModal(onequestion)">Edit</b-button>
        </b-card>
      </div>
    </div>
    <b-modal ref="my-modal" hide-footer title="Edit Question">
      <div class="d-block text-center">
        <form @submit.prevent="editQuestion(onequestion)">
          <div role="group">
            <b-form-input
              id="input-live"
              v-model="title"
              aria-describedby="input-live-help input-live-feedback"
              placeholder="Enter title of your Question"
              trim
            ></b-form-input>
          </div>
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
  name: "detailQ",
  data() {
    return {
      title: "",
      desc: "",
      error: ""
    };
  },
  computed: {
    ...mapState(["upvotes", "downvotes", "onequestion","isLogin"])
  },
  created() {
    this.$store.dispatch("GETONEQUESTION", this.$route.params.questionId);
  },
  methods: {
    checkAuth(data){
      if(localStorage.getItem('user') == data.user_id._id){
        return true
      }else{
        return false
      }
    },
    showModal(question) {
      this.title = question.title;
      this.desc = question.description;
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    upvote(data) {
      ax.patch(
        `questions/upvote/${data._id}`,
        {},
        {
          headers: {
            token: localStorage.getItem("token")
          }
        }
      )
        .then(({ data }) => {
          console.log(data);
          this.$store.dispatch("GETONEQUESTION", this.$route.params.questionId);
        })
        .catch(err => {
          this.error = err;
          console.log(err);
        });
    },
    downvote(data) {
      ax.patch(
        `questions/downvote/${data._id}`,
        {},
        {
          headers: {
            token: localStorage.getItem("token")
          }
        }
      )
        .then(({ data }) => {
          this.$store.dispatch("GETONEQUESTION", this.$route.params.questionId);
          console.log(data);
        })
        .catch(err => {
          this.error = err;
          console.log(err);
        });
    },
    editQuestion(data) {
      let dataQ = {
        id: data._id,
        title: this.title,
        desc: this.desc
      };
      this.$store.dispatch("EDITQUESTION", dataQ);
      this.$refs["my-modal"].hide();
    }
  }
};
</script>

<style>
h4{
  padding-left: 1rem;
  padding-right: 1rem;
}
</style>
