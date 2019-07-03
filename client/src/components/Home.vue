<template>
  <b-container class="mt-3">
    <b-row align-h="center">
      <b-col>
        <QInfoCard v-for="question in questions" :key="question._id" :question="question"></QInfoCard>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import QInfoCard from './questions/QInfoCard'

export default {
  components: {
    QInfoCard
  },
  created () {
    this.$store.dispatch('getAllQuestions')
  },
  computed: {
    questions () {
      return this.$store.state.questions
    }
  }
}
</script>
