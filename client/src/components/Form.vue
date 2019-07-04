<template>
  <b-form @submit.prevent="postQuestion" style='margin-top: 10px'>
    <b-form-group class="text-muted" label="Title: " label-for="title">
      <b-form-input id="title" v-model="title"/>
    </b-form-group>
    <vue-editor class="text-muted" style='background-color:white' id="editor" v-model="description"></vue-editor>
    <b-button type="submit" variant="primary" style="margin-top: 16px; background: gainsboro; border-color: white">Submit</b-button>
  </b-form>
</template>

<script>
import api from "@/api/api.js";
api.defaults.headers.common["token"] = localStorage.getItem("token");
import { VueEditor } from "vue2-editor";

export default {
  name: "formPosting",
  props: ["use", "index"],
  data() {
    return {
      title: "",
      description: "Type something..."
    };
  },
  components: {
    VueEditor
  },
  methods: {
    postQuestion() {
      if (this.use === "question") {
          this.$store.dispatch('newQuestion',{
              title:this.title,
              description:this.description
              
          })
      } else if (this.use === "answer") {
        this.$store.dispatch(`newAnswer`, {
            questionId: this.$route.params.questionId,
            title:this.title,
            description:this.description})
      }
      this.title = "";
      this.description = "";
    }
  },
  
};
</script>
