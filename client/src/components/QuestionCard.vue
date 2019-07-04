<template>
  <div class="question d-flex flex-row justify-content-center">
    <VoteButtons :selected="userVoted" :totalVotes="totalVotes" @upvote="upvote" @downvote="downvote" />
    <b-card style="width: 80%;" :title="updatedCard.title">
      <b-card-text>
        {{updatedCard.description}}
      </b-card-text>
      <small>{{cardOwner}} {{dateAdded}}</small><br>
      <b-link href="#" class="card-link" @click.prevent="questionDetail">See Detail</b-link>
      <!-- <pre>{{updatedCard}}</pre> -->
    </b-card>
  </div>
</template>
<script>
import moment from 'moment'
import { mapState } from 'vuex'
import VoteButtons from '@/components/VoteButtons.vue'
export default {
  name: 'QuestionList',
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
      if (this.updatedCard.upvotes.includes(userId)) {
        return 'up'
      } else if (this.updatedCard.downvotes.includes(userId)) {
        return 'down'
      } else {
        return 'none'
      }
    },
    totalVotes () {
      return this.card.upvotes.length - this.card.downvotes.length
    },
    questionId () {
      return this.card._id
    },
    updatedCard () {
      return this.card
    },
    cardOwner () {
      return this.card.owner.name
    },
    ...mapState(['isLoggedin', 'user'])
  },
  methods: {
    questionDetail () {
      if (!this.isLoggedin) {
        this.$router.push('/user/login')
      } else {
        this.$router.push('/question/' + this.questionId)
      }
    },
    upvote () {
      this.$store.dispatch('voteQuestion', { question: this.card, type: 'up' })
    },
    downvote () {
      this.$store.dispatch('voteQuestion', { question: this.card, type: 'down' })
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.question {
  margin-bottom: 1em;
}

</style>
