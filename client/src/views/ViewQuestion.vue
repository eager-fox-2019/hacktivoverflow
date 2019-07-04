<template>
  <v-container grid-list-xs>
    <h1 class="primary--text mt-4">Question</h1>    
    <Post  v-model="$store.state.question" tipe="Question">
      <v-card-title primary-title class="display-1 font-weight-black">{{ $store.state.question.title }}</v-card-title>
      <div>
      <v-chip @click="$store.dispatch('searchByTags',tag)" v-for="(tag,index) in $store.state.question.tags" color="primary" text-color="white" :key="index">{{ tag }}</v-chip>
      </div>
    </Post>
    <h1 class="success--text mt-4">Answer</h1>
    <Post v-for="answer in $store.state.question.answers" :value="answer" tipe="Answer" :key="answer._id"/>
    <v-card class="mt-5">
    <!-- v-show="$store.state.answered" -->
      <v-container v-show="!answered && loggedIn">
        <h1>Post Answer to this question</h1>
        <PostForm :tipe="'Answer'" @submitted="answerQuestion" :loading="loading"/>
      </v-container>
      <v-container v-show="!loggedIn">
      <h1>Please login to contribute and post answer</h1>
      <v-btn @click="$router.push('/auth')" large color="primary">Login</v-btn>
      </v-container>
    </v-card>
  <Progress :loading="loadingPage"/>
  </v-container>
</template>

<script>
// import { mapState } from 'vuex'
import Post from '@/components/Post'
import PostForm from '@/components/PostForm'

export default {
  components: {
    Post,
    PostForm,
  },
  data(){
    return {
      loadingPage: true,
      loading: false,
    }
  },
  computed: {
    loggedIn(){
      if(localStorage.getItem('token'))
        return true
      else
        return false
    },
    answered(){
      let found = this.$store.state.question.answers.findIndex(answer => answer.user._id == this.$store.state.me._id)
      
      if(found == -1)
        return false
      else
        return true
    }
  },
  created(){
    this.loadingPage = true
    Promise.all([this.$store.dispatch('getQuestion',this.$route.params.id),this.$store.dispatch('getQuestionAnswers',this.$route.params.id)])
    .then(results =>{
      this.loadingPage = false
    })
    .catch(err =>{
      this.loadingPage = false
      console.log(err);
    })
  },
  methods: {
    answerQuestion(title,description){
      this.loading = true
      this.$store.dispatch('answerQuestion',{
        questionId: this.$store.state.question._id,
        title,
        description
      })
      .then(results =>{
      this.loading = false
    })
    .catch(err =>{
      this.loading = false
      console.log(err);
    })
    },
  }
}
</script>
