<template>
  <div class="container-fluid">
    <div class="row" >
      <div class="col-md-6 col-sm-12 p-4" style='border-right: 1px solid gainsboro'>
          <div>
            <h2 class="text-muted" style="color: gainsboro">{{question.title}}</h2>
            <p class="text-muted" v-if="question.creator">Asker: {{question.creator.name}}</p>
            <p class="text-muted">
              Description:
              <span class="text-muted" style='font-size:medium' v-html="question.description"></span>
            </p>
            <vote :data="question" :type="'questions'" @updateData="updateData"/>

            <b-button v-if="question.creator._id == userId" class="bg-primary m-1" @click.prevent="edit" style="background: gainsboro !important; border-color: white !important">
              <span class="text-muted">Edit</span>
            </b-button>
            <b-button v-if="question.creator._id == userId" class="bg-danger" @click.prevent="deleteThis" style="border: none !important;">
              Delete
            </b-button>
            <b-card v-if="showEdit===true">
              <formUpdate :index="index" :use="'questions'" @editOff="edit"/>
              <b-button @click.prevent="edit" style="margin-top: 7px !important">Cancel</b-button>
            </b-card>
          </div>
          <div>
            <b-card v-if="islogin && !showEdit" class="text-muted" title="Answer">
              <formPosting :use="'answer'"/>
            </b-card>
          </div>
      </div>
      <div class="col-md-6 col-sm-12" style="height:100vh; overflow:scroll">
        <eachAnswer
          v-for="(answer, index) in answers"
          :key="index"
          :answer="answer"
          :index="index"
        />
        <div v-if="setAnswers" class="m-5 text-muted" style="text-align:center">
          There is no one have answered the question, be the first to answer
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/api.js";
api.defaults.headers.common["token"] = localStorage.getItem("token");
import vote from "@/components/Votes.vue";
import eachAnswer from "@/components/EachAnswer.vue";
import formPosting from "@/components/Form.vue";
import formUpdate from "@/components/FormUpdate.vue";
export default {
  name: "Question",
  data() {
    return {
      index: "",
      setAnswers: true,
      showEdit: false,
      userId: ""
    };
  },
  watch: {
    answers() {
      if (this.answers.length > 0) {
        this.setAnswers = false;
      } else {
        this.setAnswers = true;
      }
    }
  },
  components: {
    vote,
    eachAnswer,
    formPosting,
    formUpdate
  },
  computed: {
    answers() {
      return this.$store.state.answers;
    },
    question() {
      return this.$store.state.question;
    },
    islogin() {
      return this.$store.state.islogin;
    }
  },
  methods: {
    edit() {
      this.showEdit = !this.showEdit;
    },
    updateData(data) {
      this.$store.commit("setQuestion", data);
    },
    deleteThis(){
      let questionId = this.$route.params.questionId
      this.$store.dispatch('deleteQuestion', questionId)
      this.$router.push('/')
    }
  },
  created() {
    console.log(this.$route.params);
    this.$store.dispatch("getQuestion", this.$route.params.questionId);
    this.$store.dispatch("getAnswers", this.$route.params.questionId);
    this.userId = localStorage.getItem("id");
  }
};
</script>