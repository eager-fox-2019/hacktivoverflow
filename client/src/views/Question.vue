<template>
  <div>
    <div style="display:flex" v-if="question.length != 0">
      <div class="col-6" v-if="islogin">
        <h2 style="text-align:center">{{ question.title }}</h2>
        <br />
        <div style="display:flex;justify-content:center;flex-direction:column">
          <div>
          <QuestionCard></QuestionCard>
          </div>
          <div>
          <AnswerPost v-if="islogin"></AnswerPost>
          </div>
        </div>
      </div>
      <div class="col-6">
        <h2 style="text-align:center">Answers</h2>
        <br />
        <div v-for="answer in answers" :key="answer._id">
          <Answer :answer="answer"></Answer>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Answer from '@/components/Answer.vue'
import AnswerPost from '@/components/AnswerPost.vue'
import QuestionCard from '@/components/QuestionCard.vue'
import { mapActions } from 'vuex'
export default {
  name: 'question-detail',
  props: ['islogin'],
  data () {
    return {}
  },
  components: {
    Answer,
    AnswerPost,
    QuestionCard
  },
  computed: {
    url () {
      return this.$store.state.url
    },
    question () {
      return this.$store.state.question
    },
    answers () {
      return this.$store.state.answers
    }
  },
  methods: {
    ...mapActions(['FETCHQUESTION'])
  },
  created () {
    this.FETCHQUESTION(this.$route.params.id)
    localStorage.setItem(
      'currentPage',
      JSON.stringify({
        name: 'questions',
        link: `questions/${this.$route.params.id}`
      })
    )
  }
}
</script>
