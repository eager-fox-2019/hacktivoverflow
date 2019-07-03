<template>
  <div>
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

<style>

</style>
