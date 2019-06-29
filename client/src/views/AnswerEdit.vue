<template>
  <div id='answer-edit'>
    <h2 class="text-center mb-3 mt-4">Answer Form</h2>
    <AnswerForm style="width: 60%; margin: 0 auto" :type="'edit'"/>
  </div>
</template>

<script>
import AnswerForm from '@/components/AnswerForm'
export default {
  name: 'answer-edit',
  components: {
    AnswerForm
  }
}
</script>
