<template>
  <b-container class="mt-3">
    <b-row align-h="center">
      <b-col cols="2" class="text-center">
        <b-button variant="success" @click="upvote"><i class="far fa-hand-point-up"></i></b-button>
        <h4>{{ totalVotes }}</h4>
        <b-button variant="danger" @click="downvote"><i class="fas fa-hand-point-down"></i></b-button>
      </b-col>

      <b-col cols="10">
        <b-card :title="question.title">
          <b-card-text>{{ question.description }}</b-card-text>
          <b-card-text class="text-right">Asked By: <b>{{ question.userId.name }}</b></b-card-text>
        </b-card>
      </b-col>
    </b-row>
    <hr>
    <h1>Answers:</h1>

    <Answers v-for="answer in question.answers" :key="answer._id" :answer="answer" class="mt-6"></Answers>
  </b-container>
</template>

<script>
import Answers from '../answers/ADetailCard'

export default {
  components: {
    Answers
  },
  data () {
    return {
      question: {}
    }
  },
  created () {
    this.question = this.$store.getters.questionById(this.$route.params.qid)[0]
  },
  computed: {
    totalVotes () {
      return this.question.upvotes.length - this.question.downvotes.length
    }
  },
  methods: {
    upvote () {
      this.$store.dispatch('questionUpVote', this.question._id)
    },
    downvote () {
      this.$store.dispatch('questionDownVote', this.question._id)
    }
  }
}
</script>
