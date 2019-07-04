<template>
  <div class="question-nest">
  <Question v-for="question in $store.state.questions" :key="question._id" :question="question"></Question>
  </div>
</template>

<script>
import Question from './Question'
export default {
  components: {
    Question,
  }
}
</script>

<style scoped>
  .question-nest {
    padding: 0px 80px;

    width: 100%;
  }
</style>
