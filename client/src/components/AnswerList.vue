<template>
  <div>
    <h3 v-if="answerList.length > 0">Answers:</h3>
    <AnswerCard v-for="(item, i) in answerList" :card="item" :key="i"/>
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
  // props: ['questionId'],
  // created(){
  // 	this.$store.dispatch('getAnswerList', this.questionId)
  // },
  computed: mapState(['answerList'])
}
</script>

<style scoped>
</style>
