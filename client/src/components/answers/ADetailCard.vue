<template>
  <b-row align-h="center" class="mb-1">
    <b-col cols="2" class="text-center">
      <b-button variant="success" @click="upvote"><i class="fas fa-caret-square-up"></i></b-button>
      <h4>{{ totalVotes }}</h4>
      <b-button variant="danger" @click="downvote"><i class="fas fa-caret-square-down"></i></b-button>
    </b-col>

    <b-col cols="10">
      <b-card :title="answer.title">
        <b-card-text>{{ answer.description }}</b-card-text>
        <b-card-text class="text-right">
          Answered By: <b>{{ answer.userId.name }}</b>
          <b-button v-b-modal="'answer-modal-edit' + answer._id" class="text-right ml-1" variant="primary" size="sm" v-if="owner">EDIT</b-button>

          <AEditForm :aedit="answer"></AEditForm>
        </b-card-text>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import AEditForm from './AEditForm'

export default {
  props: ['answer'],
  components: {
    AEditForm
  },
  data () {
    return {
      owner: false
    }
  },
  created () {
    if (this.answer.userId.email === localStorage.getItem('email')) this.owner = true
  },
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
