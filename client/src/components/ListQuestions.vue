<template>
  <div>
    <h1>{{ title }}</h1>
    <div v-show="tags" class="my-3">
      <v-chip  @click="$store.dispatch('searchByTags',tag)" v-for="(tag,index) in tags" color="primary" text-color="white" :key="index">{{ tag }}</v-chip>
    </div>
    <v-layout row wrap>
      <v-list three-line>
        <Question v-for="question in value" :question="question" :title="title" :key="question._id"/>
        <!-- <v-divider inset></v-divider> -->
        
      </v-list>
    </v-layout>
  </div>
</template>
<script>
import Question from "@/components/Question.vue";
export default {
  name: 'listquestions',
  components: {
    Question
  },
  props: ["title",'value','tags'],
  created(){
    this.value
  }
};
</script>
