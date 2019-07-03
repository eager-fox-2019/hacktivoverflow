<template>
  <div>
  	<div v-if="loaded" class="question d-flex flex-row justify-content-center">
  		<VoteButtons :totalVotes="totalVotes" @upvote="upvote" @downvote="downvote"/>
  	  	<div>
  		    <h1>{{title}}</h1>
  		    <p>{{description}}</p>
  		</div>
    </div>
    <!-- Add your own answer -->
    <b-button v-if="showAnswerForm==false" variant="success" @click="toggleAnswerForm">Add Answer</b-button>
    <AnswerForm v-if="showAnswerForm" :questionId="questionId" @hideForm="toggleAnswerForm" />
    
    <!-- answers to the question listed here -->
    <AnswerList v-if="loaded" />

    <h3 v-if="loaded==false">loading...</h3>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import VoteButtons from '@/components/VoteButtons.vue'
import AnswerList from '@/components/AnswerList.vue'
import AnswerForm from '@/components/AnswerForm.vue'

export default {
  name: 'Question',
  data () {
    return {
      showAnswerForm: false
    }
  },
  components: {
  	VoteButtons,
    AnswerList,
    AnswerForm
  },
  mounted(){
    this.$store.dispatch('getQuestionDetail', this.$route.params.id)
  },
  computed: {
    loaded() {
      return (this.currentQuestion)
    },
    totalVotes() {
      if (!this.currentQuestion) return 'loading'
      return this.currentQuestion.upvotes.length - this.currentQuestion.downvotes.length
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
  },
  methods: {
    upvote(){
      this.$store.dispatch('voteQuestion', {questionId:this.currentQuestion._id, type:'up'})
    },
    downvote(){
      this.$store.dispatch('voteQuestion', {questionId:this.currentQuestion._id, type:'down'})
    },
    toggleAnswerForm(){
      this.showAnswerForm = !this.showAnswerForm
    }
  }
}
</script>

<style scoped>
.question {
  padding: 1em;
  margin-bottom: 1em;
  border-bottom: dotted 1px;
}

</style>