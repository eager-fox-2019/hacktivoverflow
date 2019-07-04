<template>
  <div id='question-edit'>
    <h2 class="text-center mb-3 mt-4">Edit Question Form</h2>
    <QuestionForm style="width: 60%; margin: 0 auto" :type="'edit'"/>
  </div>
</template>

<script>
import QuestionForm from '@/components/QuestionForm'
export default {
  name: 'question-edit',
  components: {
    QuestionForm
  }
}
</script>
