<template>
  <b-form @submit.prevent="postQuestion" style="color:black">
    <b-form-group label="Title" label-for="title">
      <b-form-input id="title" v-model="title"/>
    </b-form-group>
    <b-form @submit.prevent="updateTag" v-if='use === "question"' style="color:black">
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

    <vue-editor style="background-color:white" id="editor" v-model="description"></vue-editor>
    <b-button type="submit" variant="primary">Submit</b-button>
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
      tag: "",
      tags: [],
      //    content: '<h1>Some initial content</h1>'

      description: ""
    };
  },
  components: {
    VueEditor
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
      if (this.use === "question") {
        this.$store.dispatch("newQuestion", {
          title: this.title,
          description: this.description,
          tags: this.tags
        });
      } else if (this.use === "answer") {
        this.$store.dispatch(`newAnswer`, {
          questionId: this.$route.params.questionId,
          title: this.title,
          description: this.description
        });
      }
      this.title = "";
      this.description = "";
      this.tags = []
    }
  }
  //   created(){
  //       if(this.index){
  //           console.log(this.index)
  //           this.title = data.title
  //           this.description = data.description
  //       }
};
</script>
