<template>
  <div>
    <AnswerCard v-for="(item, i) in answerList" :card="item" :key="i">
    	<div v-if="item.owner._id==$store.state.user.id">
    		<b-link @click.prevent="editAnswerForm" href="#" class="card-link text-primary">Edit</b-link>
    		<b-link @click.prevent="deleteAnswer(item._id)" href="#" class="card-link text-danger">Delete</b-link>
    	</div>
    </AnswerCard>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AnswerCard from '@/components/AnswerCard.vue'

export default {
  name: 'AnswerList',
  components: {
  	AnswerCard
  },
  computed: mapState(['answerList']),
  methods: {
  	editAnswerForm(){

  	},
  	deleteAnswer(itemId){
  	  let {state, commit, dispatch} = this.$store
  	  dispatch('deleteAnswer', itemId)
  	  .then(({data}) => {

  	  	let newList = []
  	  	this.answerList.forEach(answer => {
  	  		if(answer._id != data._id){
  	  			newList.push(answer)
  	  		}
  	  	})
  	  	
  	  	commit('UPDATECURRENTANSWERLIST', [])
  	  	commit('UPDATECURRENTANSWERLIST', newList)
  	  })
  	  .catch(({response}) => {
  	  	console.log({errAtDelAns:response})
  	  })
  	}
  }
}
</script>

<style scoped>
div {
  margin-top: 1em;
}
</style>
