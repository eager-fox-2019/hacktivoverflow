<template>
  <div class="qgrid" v-if="question">
    <div>
    </div>
    <div id="qgcent" v-if="islogin">
      <QuestionDetail/>
      <AnswerForm v-if="islogin"/>
      <div class="qhead">Answers</div>
      <Answer v-for="answer of answers" :key="answer._id" :answer="answer"/>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
import QuestionDetail from '@/components/QuestionDetail.vue';
import AnswerForm from '@/components/AnswerForm.vue';
import Answer from '@/components/Answer.vue';
import { mapActions } from 'vuex';

export default {
  name: 'single-question-view',
  props: ['islogin'],
  components: {
    QuestionDetail, AnswerForm, Answer
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
  }
}
</script>

<style scoped>
.qgrid {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
}
@media only screen and (max-width: 1000px) {
  .qgrid {
    grid-template-columns: 1fr 8fr 1fr;
  }
}
@media only screen and (max-width: 580px) {
  .qgrid {
    grid-template-columns: 0fr 1fr 0fr;
  }
}
#qgcent {
  min-height: 90vh;
  padding: 1rem 1.25rem;
  border-left: 1px solid #bbb;
  border-right: 1px solid #bbb;
}
.qhead {
  font-size: 1.5rem;
  padding: 0.4rem 1rem 0.5rem 1rem;
}
</style>
