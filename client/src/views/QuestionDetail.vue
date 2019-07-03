<template>
  <v-container>
    <v-layout col wrap>
      <v-flex xs12 lg8 offset-lg2>
        <v-layout col wrap>
          <v-flex xs12>
            <v-layout align-center justify-center fill-height>
              <h1>{{ $store.state.questionDetail.title }}</h1>
            </v-layout>
          </v-flex>
          <v-flex xs12>
            <questionBox :question="$store.state.questionDetail"></questionBox>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 lg8 offset-lg2>
        <h1>Answer :</h1>
      </v-flex>
      <v-flex xs12 lg8 offset-lg2>
        <v-list three-line
          v-if="noAnswerStatus"
          >
          <answerBox
            v-for="answer in $store.state.questionDetail.answers"
            :item="answer" :key="answer._id">
          </answerBox>
        </v-list>
      </v-flex>
      <v-flex xs12 lg8 offset-lg2>
        <v-container>
          <v-text-field
            v-model="answer.title"
            label="Could you answer this question?"
            required
          ></v-text-field>
          <v-textarea
            outline
            v-model="answer.content"
            label="Explain more detail here"
          ></v-textarea>
          <v-btn @click="sendAnswer($store.state.questionDetail._id)">submit</v-btn>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import answerBox from '@/components/answerBox.vue'
import questionBox from '@/components/questionBox.vue'

export default {
  name: 'questionDetail',
  components: {
    answerBox,
    questionBox
  },
  data () {
    return {
      answer: {
        title: '',
        content: ''
      },
      noAnswerStatus: false
    }
  },
  methods: {
    sendAnswer (val) {
      let answerData = {
        title: this.title,
        content: this.content,
        user_id: val
      }
      this.$store.dispatch('sendNewAnswer', answerData)
    }
  },
  created () {
    this.$store.dispatch('getQuestionDetail', this.$route.params.id)
  },
  mounted () {
    if (this.$store.state.questionDetail.answers) {
      this.noAnswerStatus = true
    }
  },
  watch: {
    '$store.state.sendAnswerStatus' (val) {
      if (val) {
        this.answer.title = ''
        this.answer.content = ''
      }
    }
  }
}
</script>

<style>

</style>
