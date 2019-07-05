<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-7 questionDiv col-sm-12 p-4" >
        <div v-if="!showEdit">
          <!-- {{question.creator}} -->
          <b-row>
            <b-col cols="1">
              <vote :data="question" :type="'questions'" @updateData="updateData"/>
            </b-col>
            <b-col cols="8">
              <h1>{{question.title}}</h1>
            </b-col>
          </b-row>

          <b-row align-h="between">
            <b-col cols="4">
              <b-button
                v-if="question.creator._id == userId"
                class="bg-primary m-1"
                @click.prevent="edit"
              >edit</b-button>
              <b-button
                v-if="question.creator._id == userId"
                class="bg-danger"
                @click.prevent="deleteThis"
              >delete</b-button>
            </b-col>
          <p class="text-muted" v-if="question.creator">Asked by: {{question.creator.name}}</p>
          </b-row>
          <hr role="separator" aria-orientation="horizontal" class="my-4 dropdown-divider">

          <p>
            <vue-editor
              :disabled="disabled"
              :editor-toolbar="customToolbar"
              style="background-color:rgb(233, 233, 233)"
              id="editor"
              v-model="question.description"
            ></vue-editor>
            <!-- <span style="font-size:large" v-html="question.description"></span> -->
          </p>
          <div>
            <div v-for="tag in question.tags" class="chip blunt button mx-1" :key="tag">{{tag}}</div>
          </div>
          <!-- @updateAnswer="updateAnswer" inside eachAnswer-->
          <!-- @delete="afterDeleteAnswer" inside eachAnswer -->
        </div>
        <b-card v-if="showEdit">
          <formUpdate :index="index" :use="'questions'" @editOff="edit"/>
          <b-button @click.prevent="edit">Cancel</b-button>
        </b-card>
      </div>
      <div class="answer col-md-5 col-sm-12" >
        <div class="p-3 row justify-content-between">
          <h3 class="col col-4"></h3>
          <div class="col col-3">
            <b-button @click="createAnswer = !createAnswer">Answer</b-button>
          </div>
        </div>
        <div v-if="islogin && !showEdit && createAnswer">
          <b-card title="Answer">
            <formPosting :use="'answer'"/>
          </b-card>
          <hr role="separator" aria-orientation="horizontal" class="my-4 dropdown-divider">
        </div>

        <eachAnswer
          style='box-shadow: 2px 1px 5px 1px rgb(190, 190, 190);'
          v-for="(answer, index) in answers"
          :key="index"
          :answer="answer"
          :index="index"
          class='mb-5'
        />
        <div
          v-if="zeroAnswer"
          class="m-5 text-muted"
          style="text-align:center"
        >No answer yet! Be the first to answer</div>
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
import { VueEditor } from "vue2-editor";

export default {
  name: "Question",
  data() {
    return {
      //   question: "",
      index: "",
      //   answers: [],
      zeroAnswer: true,
      showEdit: false,
      userId: "",
      createAnswer: false,
      customToolbar: [],
      disabled:true
    };
  },
  watch: {
    answers() {
      if (this.answers.length > 0) {
        this.zeroAnswer = false;
      } else {
        this.zeroAnswer = true;
      }
    }
  },
  components: {
    vote,
    eachAnswer,
    formPosting,
    formUpdate,
    VueEditor
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
    // newAnswer(data) {
    // //   this.answers.push(data);
    // this.$store.commit('newAnswer', data)
    // },
    updateData(data) {
      console.log(data, "data");
      //   this.question = data;
      this.$store.commit("setQuestion", data);
    },
    // updateAnswer(data) {
    //   console.log("answerupdated");
    //   this.$store.commit('updateAnswer', data)
    // //   this.$set(this.answers, data.index, data.data);
    // },
    // afterDeleteAnswer(data) {
    //     //cannot auto update after deletion of an element within an array
    //   this.fetchAnswers();
    // }
    deleteThis() {
      let questionId = this.$route.params.questionId;
      this.$store.dispatch("deleteQuestion", questionId);
      this.$router.push("/");
    }
  },
  created() {
    console.log(this.$route.params);
    this.$store.dispatch("getQuestion", this.$route.params.questionId);
    this.$store.dispatch("getAnswers", this.$route.params.questionId);
    // this.vote = this.question.upvotes.length - this.question.downvotes.length
    this.userId = localStorage.getItem("id");
  }
};
</script>
<style scoped>
.answer{
  background-color:rgb(255, 255, 255);
    /* box-shadow: -1px -1px 1px 5px grey; */
    height:100vh; 
    overflow:scroll; 

}
.questionDiv{
  height:100vh;
  overflow:scroll
}
</style>