<template>
	<div class="questionsContainer">
    <QuestionCard v-for="(item, i) in filteredList" :card="item" :key="i"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import QuestionCard from '@/components/QuestionCard.vue'

export default {
  name: 'QuestionList',
  props: ['filteredList'],
  components: {
  	QuestionCard,
  },
}
</script>

<style scoped>
.questionsContainer {
  height: 75vh;
  overflow-y: scroll;
  background-color: #DCC7AA;
  padding-bottom: 1em;
}
</style>
