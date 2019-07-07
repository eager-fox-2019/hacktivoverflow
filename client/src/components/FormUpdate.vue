<template>
  <div >
    <div v-if="use == 'questions' " >
      <b-form @submit.prevent="postQuestion" style="color:black;  ">
        <b-form-group class="text-muted" label="Title:" label-for="title">
          <b-form-input id="title" v-model="question.title"/>
        </b-form-group>
        <vue-editor style="background-color:white; margin-bottom: 7px" class="text-muted" id="editor" v-model="question.description"></vue-editor>
        <b-button type="submit" variant="primary" style="margin-top: 10px !important; background: gainsboro !important; border: none !important">Submit</b-button>
      </b-form>
    </div>
    <div v-else-if="use == 'answers' " style="margin-top: 5px">
      <b-form @submit.prevent="postQuestion" style="color:black">
        <b-form-group class="text-muted" label="Title: " label-for="title">
          <b-form-input id="title" v-model="answer.title"/>
        </b-form-group>
        <vue-editor style="background-color:white; margin-bottom: 7px" class="text-muted" id="editor" v-model="answer.description" ></vue-editor>
        <b-button type="submit" variant="primary" style="margin-top: 10px !important; background: gainsboro !important; border: none !important">Submit</b-button>
      </b-form>
    </div>
  </div>
</template>
<script>
import { VueEditor } from "vue2-editor";
import api from "@/api/api.js"
api.defaults.headers.common['token'] = localStorage.getItem('token')

export default {
  name: "formUpdate",
  props: ["index", "use"],
  components: {
    VueEditor
  },
  data() {
    return {
      title: '',
      description: '',
    }
  },
  computed: {
    question: {
      get() {
        return this.$store.state.question;
      },
      set(value) {
        this.title = value.title
        this.description = value.description
      }
    },
    answer: {
      get() {
        return this.$store.state.answers[this.index];
      },
      set(value) {
        this.title = value.title
        this.description = value.description
      }
    }
  },
  methods: {
    postQuestion() {
      if (this.use === "questions") {
        console.log(this.question.title)
        let questionId = this.$route.params.id
        this.$store.commit("setQuestion", {
          title: this.title,
          description: this.description
        });
        this.$store.dispatch('updateQuestion', {question:this.question, questionId})
        this.$emit("editOff");
      } else if (this.use === "answers") {
        console.log(this.answer)
        let answerId = this.answer._id
        this.$store.commit("updateAnswer", {
          index: this.index,
          data: {
            title: this.title,
            description: this.description
          }
        });
        this.$store.dispatch('updateAnswer', {answerId, answer:this.answer, index:this.index})
        this.$emit("editOff");
      }
    }
  }
};
</script>