<template>
  <div class="home">
  	<div class="topbar">
    	<div><h3>Welcome to mini-overflow. Ask questions & give answers!</h3></div>
	    <div class="d-flex justify-content-around flex-wrap"><b-form-input class="searchbar" v-model="text" placeholder="Search Title or User..."></b-form-input>
	    <b-button variant="primary" class="ask" @click="toggleQuestionForm">Ask a Question</b-button></div>
	  </div>
  	<QuestionForm v-if="showQuestions==false" @hideQuestionFrom="toggleQuestionForm"/>
  	<QuestionList v-if="showQuestions" :filteredList="filteredList"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import QuestionList from '@/components/QuestionList.vue'
import QuestionForm from '@/components/QuestionForm.vue'

export default {
  name: 'home',
  components: {
    QuestionList,
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
  	...mapState(['questionList', 'isLoggedin'])
  },
  methods: {
  	toggleQuestionForm(){
      if (!this.isLoggedin){
        this.$router.push('/user/login')
      } else {
  		  this.showQuestions = !this.showQuestions
      }
  	}
  }
}
</script>

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
</style>