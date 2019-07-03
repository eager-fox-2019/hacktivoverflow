<template>
  <div>
    <div class="topbar">
    	<div><h3>Welcome to mini-overflow. Ask questions & give answers!</h3></div>
	    <div class="d-flex justify-content-around flex-wrap"><b-form-input class="searchbar" v-model="text" placeholder="Search..."></b-form-input>
	    <b-button variant="primary" class="ask" @click="toggleQuestionForm">Ask a Question</b-button></div>
	</div>
	<QuestionForm v-if="showQuestions==false" @hideQuestionFrom="toggleQuestionForm"/>
	<div class="questionsContainer">
    <QuestionCard v-if="showQuestions" v-for="(item, i) in filteredList" :card="item" :key="i"/>
	</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import QuestionCard from '@/components/QuestionCard.vue'
import QuestionForm from '@/components/QuestionForm.vue'

export default {
  name: 'QuestionList',
  components: {
  	QuestionCard,
  	QuestionForm
  },
  data() {
  	return {
  		text: '',
  		showQuestions: true,
  	}
  },
  computed: {
  	filteredList(){
  		let filteredList = []
  		this.questionList.forEach(entry => {
  			if (entry.title.includes(this.text) || entry.owner.name.includes(this.text)){
  				filteredList.push(entry)
  			}
  		})
  		return filteredList
  	},
  	...mapState(['questionList'])
  },
  methods: {
  	toggleQuestionForm(){
  		this.showQuestions = !this.showQuestions
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.topbar {
	color: #F7C331;
	padding: 1em;
	background-color: #6B7A8F;
	margin: 1em;
	border-radius: 1em;
}
.btn {
	border-color: #F7C331;
}

.ask, .searchbar {
	width: 30%;
	min-width: 14em;
}

.questionsContainer {
  height: 75vh;
  overflow-y: scroll;
}
</style>
