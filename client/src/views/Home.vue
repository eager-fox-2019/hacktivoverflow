<template>
  <div class="home" style="padding: 0">
    <div style="overflow-y: scroll; height: 92vh">
      <QuestionCard v-for="question in $store.state.filterQuestion" :key="question._id" :question="question"/>
    </div>
  </div>
</template>

<script>
import QuestionCard from '@/components/QuestionCard'
export default {
  name: 'home',
  components: {
    QuestionCard
  }
}
</script>
