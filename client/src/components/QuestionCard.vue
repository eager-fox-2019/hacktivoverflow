<template>
  <div class="question d-flex flex-row justify-content-center">

  <VoteButtons :totalVotes="totalVotes" @upvote="upvote" @downvote="downvote"/>

  <b-card style="width: 80%;" :title="card.title" :sub-title="card.owner.name">
    <b-card-text>
      {{card.description}}
    </b-card-text>

    <b-link href="#" class="card-link" @click.prevent="questionDetail">See Detail</b-link>
  </b-card>
  </div>
</template>

<script>

import VoteButtons from '@/components/VoteButtons.vue'
export default {
  name: 'QuestionList',
  props: ['card'],
  components: {
    VoteButtons
  },
  computed: {
    totalVotes() {
      return this.card.upvotes.length + this.card.downvotes.length
    }
  },
  methods: {
    questionDetail(){
      let questionId = this.card._id
      // this.$store.dispatch('getQuestionDetail', questionId)
      this.$router.push('/question/' + questionId)
    },
    upvote(){
      this.$store.dispatch('voteQuestion', {questionId, type:'up'})
    },
    downvote(){
      this.$store.dispatch('voteQuestion', {questionId, type:'down'})
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
