<template>
  <div class="answer d-flex flex-row justify-content-center">

  <VoteButtons :totalVotes="totalVotes" @upvote="upvote" @downvote="downvote"/>

  <b-card style="width: 80%;" :title="card.title" :sub-title="card.owner.name">
    <b-card-text>
      {{card.description}}
    </b-card-text>

    <b-link href="#" class="card-link">Edit</b-link>
  </b-card>

  </div>
</template>

<script>

import VoteButtons from '@/components/VoteButtons.vue'
export default {
  name: 'AnswerList',
  props: ['card'],
  components: {
    VoteButtons
  },
  computed: {
    totalVotes() {
      return this.card.upvotes.length - this.card.downvotes.length
    }
  },
  methods: {
    upvote(){
      this.$store.dispatch('voteAnswer', {questionId, type:'up'})
    },
    downvote(){
      this.$store.dispatch('voteAnswer', {questionId, type:'down'})
    }
  }
}
</script>

<style scoped>
.answer {
  margin-bottom: 1em;
}
</style>
