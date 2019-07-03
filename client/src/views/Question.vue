<template>
  <div>

	<div class="question d-flex flex-row justify-content-center">
		<VoteButtons :totalVotes="totalVotes" />
	  	<div>
		    <h1>{{title}}</h1>
		    <p>{{description}}</p>
		</div>
    </div>
    
    <!-- answers to the question listed here -->
    <AnswerList />

  </div>
</template>

<script>
import { mapState } from 'vuex'
import VoteButtons from '@/components/VoteButtons.vue'
import AnswerList from '@/components/AnswerList.vue'

export default {
  name: 'Question',
  components: {
  	VoteButtons,
    AnswerList
  },
  created(){
    this.$store.dispatch('getQuestionDetail', this.$route.params.id)
  },
  computed: {
    totalVotes() {
      if (!this.currentQuestion) return 'loading'
      return this.currentQuestion.upvotes.length + this.currentQuestion.downvotes.length
    },
    title() {
    	if (!this.currentQuestion) return 'loading'
    	return this.currentQuestion.title
    },
    description(){
    	if (!this.currentQuestion) return 'loading'
    	return this.currentQuestion.description
    },
    questionId(){
    	if (!this.currentQuestion) return 'loading'
    	return this.currentQuestion._id
    },
  	...mapState(['currentQuestion'])
  }
}
</script>

<style scoped>
.question {
  padding: 1em;
  margin-bottom: 1em;
}

</style>