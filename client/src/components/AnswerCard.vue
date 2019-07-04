<template>
  <div class="answer d-flex flex-row justify-content-center">

  <VoteButtons :totalVotes="totalVotes" @upvote="upvote" @downvote="downvote"/>

  <b-card style="width: 80%;" :title="card.title" :sub-title="cardOwner">
    <b-card-text>
      {{card.description}}
    </b-card-text>
    <slot></slot>
    <!-- <b-link href="#" class="card-link">Edit</b-link> -->
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
    },
    cardOwner(){
      return 'by ' + this.card.owner.name
    }
  },
  methods: {
    upvote(){
      this.$store.dispatch('voteAnswer', {answer:this.card, type:'up'})
    },
    downvote(){
      this.$store.dispatch('voteAnswer', {answer:this.card, type:'down'})
    }
  }
}
</script>

<style scoped>
.answer {
  margin-bottom: 1em;
}
</style>
