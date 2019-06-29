<template>
  <div id='question-create'>
    <h2 class="text-center mb-3 mt-4">Question Form</h2>
    <QuestionForm style="width: 60%; margin: 0 auto"/>
  </div>
</template>

<script>
import QuestionForm from '@/components/QuestionForm'
export default {
  name: 'question-create',
  components: {
    QuestionForm
  }
}
</script>
