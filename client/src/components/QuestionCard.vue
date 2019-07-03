<template>
  <div class="question d-flex flex-row justify-content-center">

  <VoteButtons :totalVotes="totalVotes" @upvote="upvote" @downvote="downvote"/>

  <b-card style="width: 80%;" :title="updatedCard.title" :sub-title="cardOwner">
    <b-card-text>
      {{updatedCard.description}}
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
      return this.card.upvotes.length - this.card.downvotes.length
    },
    questionId() {
      return this.card._id
    },
    updatedCard() {
      return this.card
    },
    cardOwner() {
      return 'by '+this.card.owner.name
    }
  },
  methods: {
    questionDetail(){
      // this.$store.dispatch('getQuestionDetail', questionId)
      this.$router.push('/question/' + this.questionId)
    },
    upvote(){
      this.$store.dispatch('voteQuestion', {questionId:this.card._id, type:'up'})
    },
    downvote(){
      this.$store.dispatch('voteQuestion', {questionId:this.card._id, type:'down'})
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
