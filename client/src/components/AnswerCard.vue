<template>
  <div class="answer d-flex flex-row justify-content-center">
    <VoteButtons :selected="userVoted" :totalVotes="totalVotes" @upvote="upvote" @downvote="downvote" />
    <b-card style="width: 80%;" :title="card.title" :sub-title="cardOwner">
      <b-card-text>
        {{card.description}}
      </b-card-text>
      <slot></slot>
    </b-card>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import VoteButtons from '@/components/VoteButtons.vue'
export default {
  name: 'AnswerList',
  props: ['card'],
  components: {
    VoteButtons
  },
  computed: {
    userVoted () {
      if (!this.user) return 'none'
      let userId = this.user.id
      if (this.card.upvotes.includes(userId)) {
        return 'up'
      } else if (this.card.downvotes.includes(userId)) {
        return 'down'
      } else {
        return 'none'
      }
    },
    totalVotes () {
      return this.card.upvotes.length - this.card.downvotes.length
    },
    cardOwner () {
      return 'by ' + this.card.owner.name
    },
    ...mapState(['user'])
  },
  methods: {
    upvote () {
      this.$store.dispatch('voteAnswer', { answer: this.card, type: 'up' })
    },
    downvote () {
      this.$store.dispatch('voteAnswer', { answer: this.card, type: 'down' })
    }
  }
}

</script>
<style scoped>
.answer {
  margin-bottom: 1em;
}

</style>
