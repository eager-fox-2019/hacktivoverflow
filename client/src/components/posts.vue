<template>
  <v-container grid-list-md ml-5>
    <v-layout row wrap >
      <v-flex xs11 ma-2 style="margin: 0; padding: 0; background-color:#F7C10A;">
        <v-btn flat class="font-weight-bold" v-on:click="displayPublic = true">Public questions</v-btn>
        <v-btn flat class="font-weight-bold" v-on:click="displayPublic = false" v-if="$store.state.loggedUser.id">Your questions</v-btn>  
      </v-flex>
      <template v-if="$store.state.publicQuestions.length > 0 && displayPublic">
        <PostDetail v-for="(question, index) in $store.state.publicQuestions" :key="index" :question="question"/>
      </template>
      <template v-if="$store.state.myQuestions.length > 0 && $store.state.loggedUser.id && !displayPublic">
        <PostDetail v-for="(question, index) in $store.state.myQuestions" :key="index" :question="question"/>
      </template>
    </v-layout>
  </v-container>
</template>

<script>
import PostDetail from '@/components/postdetail.vue'

export default {
  name: 'Posts',
  data() {
    return {
      displayPublic: true,
      displayQuestions: []
    }
  },
  components: {
    PostDetail
  },
  methods: {

  }
}
</script>

<style>
  .post-title {
    cursor: pointer;
    color: #3E95DD;
  }

  .post-title:hover {
    color: #6BBCFF;
  }



</style>
