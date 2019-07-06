<template>
  <div class="answer d-flex flex-row justify-content-center">
    <VoteButtons :selected="userVoted" :totalVotes="totalVotes" @upvote="upvote" @downvote="downvote" />
    <b-card style="width: 80%;" :title="card.title">
      <b-card-text>
        {{card.description}}
      </b-card-text>
      <small>{{cardOwner}} {{dateAdded}}</small>
      <!-- <pre>{{card}}</pre> -->
      <slot></slot>
    </b-card>
  </div>
</template>
<script>
import moment from 'moment'
import { mapState } from 'vuex'
import VoteButtons from '@/components/VoteButtons.vue'
export default {
  name: 'AnswerList',
  props: ['card'],
  components: {
    VoteButtons
  },
  computed: {
    dateAdded () {
      if (!this.card) return ''
      return 'posted on ' + moment(this.card.createdAt).format('ddd MMM Do YYYY hh:mm:ss a')
    },
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
      return this.card.owner.name
    },
    ...mapState(['user'])
  },
  methods: {
    moment () {
      return moment()
    },
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
