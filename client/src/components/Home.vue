<template>
  <b-container class="mt-3">
    <b-row align-h="center">
      <b-col>
        <div class="clearfix mb-2">
          <b-button class="float-right" v-b-modal.question-modal variant="success" @click="checkLogin">Ask a new Question</b-button>

          <QuestionForm></QuestionForm>
        </div>
        <QInfoCard v-for="question in questions" :key="question._id" :question="question"></QInfoCard>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import QInfoCard from './questions/QInfoCard'
import QuestionForm from './questions/QForm'

export default {
  components: {
    QInfoCard,
    QuestionForm
  },
  created () {
    this.$store.dispatch('getAllQuestions')
  },
  computed: {
    questions () {
      return this.$store.state.questions
    }
  },
  methods: {
    checkLogin () {
      if (!localStorage.getItem('token')) this.$router.push({ path: '/login' })
    }
  }
}
</script>
