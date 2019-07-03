<template>
  <div>
    <h3>Welcome to mini-overflow. Ask questions & give answers!</h3>
    <QuestionCard v-for="(item, i) in questionList" :card="item" :key="i"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import QuestionCard from '@/components/QuestionCard.vue'

export default {
  name: 'QuestionList',
  components: {
  	QuestionCard
  },
  computed: mapState(['questionList'])
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
