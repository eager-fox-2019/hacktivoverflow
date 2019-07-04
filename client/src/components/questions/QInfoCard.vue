<template>
  <div>
    <b-row>
      <b-col cols="2">
        <b-row class="text-center">
          <b-col>
            <h4>{{ totalVote  }}</h4>
            <p class="vote">Votes</p>
          </b-col>
        </b-row>
        <b-row class="text-center">
          <b-col class="bg-secondary">
            <h4>{{ totalAnswers }}</h4>
            <p class="vote">Answers</p>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="10">
        <b-card class="container">
          <b-card-body>
            <h4><b-link href="#" @click="questionDetail()">{{ question.title }}</b-link></h4>
            <b-card-text>{{ question.description }}</b-card-text>
            <b-card-text class="text-right">
              Asked By: <b>{{ question.userId.name }}</b>
              <b-button class="text-right ml-1" variant="danger" size="sm" v-if="owner" @click="remove">DELETE</b-button>
            </b-card-text>
         </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>

</template>

<script>
export default {
  props: ['question'],
  data () {
    return {
      owner: false
    }
  },
  methods: {
    questionDetail () {
      this.$router.push({ path: `/question/${this.question._id}` })
    },
    remove () {
      this.$store.dispatch('removeQuestion', this.question._id)
    }
  },
  created () {
    if (this.question.userId.email === localStorage.getItem('email')) this.owner = true
  },
  computed: {
    totalVote () {
      return this.question.upvotes.length - this.question.downvotes.length
    },
    totalAnswers () {
      return this.question.answers.length
    }
  }
}
</script>

<style scoped>
.vote {
  font-size: 10px
}
</style>
