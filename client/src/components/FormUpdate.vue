<template>
  <div>
    <div v-if="use == 'questions' ">
      <b-form @submit.prevent="postQuestion" style="color:black">
        <b-form-group label="Title" label-for="title">
          <b-form-input id="title" v-model="question.title"/>
        </b-form-group>
        <b-form @submit.prevent="updateTag" style="color:black">
          <b-form-group label="Tags" label-for="title">
            <b-form-input id="tags" v-model="tag"/>
          </b-form-group>
        </b-form>
        <div>
          <div v-for="tag in tags" class="chip" :key="tag">
            {{tag}}
            <span class="closebtn p-1" @click.prevent="removeTag(tag)">&times;</span>
          </div>
        </div>
        <vue-editor style="background-color:white" id="editor" v-model="question.description"></vue-editor>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </div>
    <div v-else-if="use == 'answers' ">
      <b-form @submit.prevent="postQuestion" style="color:black">
        <b-form-group label="Title" label-for="title">
          <b-form-input id="title" v-model="answer.title"/>
        </b-form-group>
        <vue-editor style="background-color:white" id="editor" v-model="answer.description"></vue-editor>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </div>
  </div>
</template>
<script>
import { VueEditor } from "vue2-editor";
import api from "@/api/api.js";
api.defaults.headers.common["token"] = localStorage.getItem("token");

export default {
  name: "formUpdate",
  props: ["index", "use"],
  components: {
    VueEditor
  },
  data(){
    return{
      tag: "",
      tags: [],
      question:'',
      answer:''
    }
  },
  computed: {
    currentQuestion: {
      get() {
        return this.$store.state.question;
      }
    },
    currentAnswer: {
      get() {
        return this.$store.state.answers[this.index];
      }
    }
  },
  methods: {
    removeTag(tag){
      this.tags = this.tags.filter((item)=>{
        if(item != tag){
          return item
        }
      })
    },
    updateTag() {
      let flag = true; //no duplicate
      this.tags.forEach(item => {
        if (item === this.tag) {
          flag = false;
        }
      });
      if (flag) {
        this.tags.push(this.tag);
      }
      this.tag = "";
    },
    postQuestion() {
      if (this.use === "questions") {
        console.log(this.question.title);
        this.question.tags = this.tags
        let questionId = this.$route.params.questionId;
        console.log(this.$route.params);
        console.log(questionId);
       
        this.$store.dispatch("updateQuestion", {
          question: this.question,
          questionId
        });
        this.$emit("editOff");

      } else if (this.use === "answers") {
      
        console.log(this.answer);
        let answerId = this.answer._id;
        this.$store.dispatch("updateAnswer", {
          answerId,
          answer: this.answer,
          index: this.index
        });
        
        this.$emit("editOff");
       
      }
      
    }
  },
  created(){
    this.question = this.currentQuestion
    this.answer = this.currentAnswer
    this.tags = this.question.tags
  }
};
</script>