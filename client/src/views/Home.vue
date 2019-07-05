<template>
  <div class="home">
    <div class="container">
      <div class="mt-5 row">
        <h2 class='mx-4'>Questions</h2>
      <b-form-input class='col-sm-8' v-model='search' placeholder="search"></b-form-input>
      </div>
        <b-row style='overflow:scroll; height:100vh'>
      <b-col cols='8'>
      <div v-for="(question, index) in filteredQuestions" :key="index">
        <EachQuestion :question="question" :index="index" class='py-2'/>
      </div>
      </b-col>
      <b-col cols='4' v-if='islogin'><watchedTags/></b-col>
    </b-row>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EachQuestion from "@/components/EachQuestion.vue";
import WatchedTags from "@/components/watchedTags.vue"
import api from "@/api/api.js";

export default {
  name: "home",
  data(){
    return {
      search : ''
    }
  },
  computed: {
    islogin(){
      return this.$store.state.islogin
    },
    tagSearch(){
      return this.$store.state.tagSearch
    }, 
    questions() {
      return this.$store.state.questions;
    },
    filteredQuestions() {
      if(this.tagSearch && this.search){
        let result = [];
        result = this.questions.filter(item=>{
          return item.title.toLowerCase().includes(this.search.toLowerCase())
        })
        result = result.filter(item=>{
          return item.tags.toLowerCase().includes(this.tagSearch.toLowerCase())
        })
        return result
      }else if (this.search) {
        let result = [];
        result = this.questions.filter(item => {
          return item.title.toLowerCase().includes(this.search.toLowerCase());
        });
      
          return result;
        
      } else if(this.tagSearch){
        console.log(this.tagSearch)
        let result = [];
        result = this.questions.filter(item=>{
          console.log(item)
          return item.tags.includes(this.tagSearch)
        })
        return result
      }else{
        return this.questions
      }
    }
  },
  components: {
    EachQuestion,
    WatchedTags
  },
  created() {
    this.$store.dispatch("getQuestions");
  }
};
</script>
