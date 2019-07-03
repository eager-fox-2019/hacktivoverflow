<template>
  <b-row align-h="center">
    <b-col cols="2" class="text-center">
      <b-button variant="success" @click="upvote"><i class="fas fa-caret-square-up"></i></b-button>
      <h4>{{ totalVotes }}</h4>
      <b-button variant="danger" @click="downvote"><i class="fas fa-caret-square-down"></i></b-button>
    </b-col>

    <b-col cols="10">
      <b-card :title="answer.title">
        <b-card-text>{{ answer.description }}</b-card-text>
        <b-card-text class="text-right">Answered By: <b>{{ answer.userId.name }}</b></b-card-text>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: ['answer'],
  computed: {
    totalVotes () {
      return this.answer.upvotes.length - this.answer.downvotes.length
    }
  },
  methods: {
    upvote () {
      this.$store.dispatch('answerUpVote', this.answer._id)
    },
    downvote () {
      this.$store.dispatch('answerDownVote', this.answer._id)
    }
  }
}
</script>
