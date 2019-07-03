<template>
  <div>
  	<div v-if="loaded" class="question d-flex flex-row justify-content-left">
  		<VoteButtons :totalVotes="totalVotes" @upvote="upvote" @downvote="downvote"/>
  	  <div class="questionDetailArea text-justify">
		    <h1>{{title}}</h1>
        <p>{{name}}</p>
		    <p>{{description}}</p>
  		</div>
    </div>

    <div class="question text-justify" v-if="isOwner">
      <label>You asked this question. You can: </label>
      <b-button @click="editForm" variant="secondary">Edit</b-button>
      <b-button @click="delForm" variant="danger">Delete</b-button>
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
    isOwner(){
      if (!this.currentQuestion) return false
        console.log(this.currentQuestion)
      return this.currentQuestion.owner.email == this.$store.state.user.email
    },
    loaded() {
      return (this.currentQuestion)
    },
    name(){
      if (!this.currentQuestion) return 'loading'
      return 'by ' + this.currentQuestion.owner.name
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
      this.$store.dispatch('voteQuestion', {questionId:this.questionId, type:'up'})
    },
    downvote(){
      this.$store.dispatch('voteQuestion', {questionId:this.questionId, type:'down'})
    },
    toggleAnswerForm(){
      this.showAnswerForm = !this.showAnswerForm
    },
    delForm(){
      let {state, commit, dispatch} = this.$store
      
      dispatch('deleteQuestion', this.questionId)
      .then(deleted => {
        let tempArray = state.questionList
        for (let i = 0; i < tempArray.length; i++){
          if (tempArray[i]._id == this.questionId){
            tempArray.splice(i,1)
          }
        }

        commit('UPDATEQUESTIONLIST', [])
        commit('UPDATEQUESTIONLIST', tempArray)
        
        this.$router.push('/')
      })
      .catch(({response}) => {
        console.log(response.data);
      });
    },
    editForm(){
      this.showEditForm = !this.showEditForm
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
.questionDetailArea {
  margin-left: 1em;
}
.question button {
  margin: 0.2em;
}
</style>