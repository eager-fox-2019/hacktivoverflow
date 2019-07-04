<template>
  <b-container class="mt-3">
    <div class="clearfix mb-2">
      <b-button v-b-modal.answer-modal variant="warning" class="float-right" @click="checkLogin">Answer this Question</b-button>

      <AnswerForm></AnswerForm>
    </div>
    <b-row align-h="center">
      <b-col cols="2" class="text-center">
        <b-button variant="success" @click="upvote"><i class="far fa-hand-point-up"></i></b-button>
        <h4>{{ totalVotes }}</h4>
        <b-button variant="danger" @click="downvote"><i class="fas fa-hand-point-down"></i></b-button>
      </b-col>

      <b-col cols="10">
        <b-card :title="question.title">
          <b-card-text>{{ question.description }}</b-card-text>
          <b-card-text class="text-right">
            Asked By: <b>{{ question.userId.name }}</b>
            <b-button class="text-right ml-1" variant="danger" size="sm" v-if="owner" @click="remove">DELETE</b-button>
            <b-button v-b-modal.question-modal-edit class="text-right ml-1" variant="primary" size="sm" v-if="owner">EDIT</b-button>

            <QEditForm :qedit="question"></QEditForm>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
    <hr>
    <h1>Answers:</h1>

    <Answers v-for="answer in question.answers" :key="answer._id" :answer="answer" class="mt-6"></Answers>
  </b-container>
</template>

<script>
import Answers from '../answers/ADetailCard'
import AnswerForm from '../answers/AForm'
import QEditForm from './QEditForm'

export default {
  components: {
    Answers,
    AnswerForm,
    QEditForm
  },
  data () {
    return {
      question: {},
      owner: false
    }
  },
  created () {
    this.question = this.$store.getters.questionById(this.$route.params.qid)[0]

    if (this.question.userId.email === localStorage.getItem('email')) this.owner = true
  },
  computed: {
    totalVotes () {
      return this.question.upvotes.length - this.question.downvotes.length
    }
  },
  methods: {
    upvote () {
      this.$store.dispatch('questionUpVote', this.question._id)
    },
    downvote () {
      this.$store.dispatch('questionDownVote', this.question._id)
    },
    remove () {
      this.$store.dispatch('removeQuestion', this.$route.params.qid)
      this.$router.push({ path: '/' })
    },
    checkLogin () {
      if (!localStorage.getItem('token')) this.$router.push({ path: '/login' })
    }
  }
}
</script>
