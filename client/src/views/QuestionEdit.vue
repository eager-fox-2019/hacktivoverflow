<template>
    <QuestionForm>
        <h3 
            :name="form-title"
            class="mb-3 text-center"
        >Edit Question</h3>        
    </QuestionForm>
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