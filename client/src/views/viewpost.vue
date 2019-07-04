<template>
  <v-container v-if="rendered">
    <v-layout row wrap>
      <v-flex xs8 offset-xs2 style="border: 1px solid #BEBEBE; background-color: white;" class="pt-4 pb-4 pl-5 pr-5 mt-4">
       <v-alert
        :value="alert2"
        type="error"
        transition="scale-transition"
      >
        You must login before voting.
      </v-alert>
        <v-layout align-center>
          <v-flex xs1>
            <v-layout column align-center mr-3>
              <v-icon :class="upvoted ? 'blue--text' : 'grey--text'" large v-on:click="upvote">keyboard_arrow_up</v-icon>
              <div>{{ question.upvotes.length - question.downvotes.length }}</div>
              <v-icon :class=" downvoted ? 'orange--text' : 'grey--text'" large v-on:click="downvote">keyboard_arrow_down</v-icon>
            </v-layout>
          </v-flex>
          <v-flex xs11>
            <v-layout align-center>
              <div class="display-1 mb-3 font-weight-medium"> {{ question.question }}  </div>
              <v-spacer></v-spacer>
              <div class="subheading" style="color: #929292"> Asked {{ getTime }} by {{question.user.username}}</div>
            </v-layout>
            <v-divider></v-divider>
          </v-flex>
        </v-layout>
        <div class="pa-4">
          <div v-html="question.description"></div>
        </div>
        <v-divider></v-divider>
        <v-layout class="mt-3" column>

          <div class="title font-weight-regular mb-3">Have relevant insight? Answer below.</div>
           <v-text-field
            v-model="title"
            prepend-inner-icon="question_answer"
            solo
            placeholder="Title your answer"
          >
          </v-text-field>
          <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
          <v-flex align-self-end mt-2>
            <v-layout row>
              <v-alert
                :value="alert"
                type="error"
                transition="scale-transition"
              >
                You must log in first before answering.
              </v-alert>
              <v-btn large color="#F7C10A" v-on:click="submit">Submit</v-btn>
            </v-layout>
          </v-flex>
        </v-layout>

        <Answers v-for="(answer, index) in question.answers" :key="index" :answer="answer" v-on:delete="getQuestion" v-on:edit="getQuestion"/>
      </v-flex>
    </v-layout> -
  </v-container>
</template>

<script>
import axios from 'axios'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import Answers from '@/components/answers.vue'
import moment from 'moment'

export default {
  name: 'ViewPost',
  components: {
    Answers
  },
  data () {
    return {
      question: '',
      editor: ClassicEditor,
      editorData: '',
      editorConfig: {
        // The configuration of the rich-text editor.
      },
      title: '',
      description: '',
      questionId: '',
      upvoted: false,
      downvoted: false,
      rendered: false,
      alert: false,
      alert2: false
    }
  },
  computed: {
    getTime () {
      return moment(this.question.createdAt).fromNow()
    }
  },
  created () {
    this.getQuestion()
  },

  methods: {
    displayError () {
      this.alert2 = true
      setTimeout(() => {
        this.alert2 = false
      }, 2500)
    },
    getQuestion () {
      this.questionId = this.$route.params.id
      axios({
        method: 'GET',
        url: `${this.$store.state.baseURL}/questions/${this.questionId}`
      })
        .then(({ data }) => {
          this.question = data
          for (let user of data.upvotes) {
            if (user === this.$store.state.loggedUser.id) {
              this.upvoted = true
            }
          }

          for (let user of data.downvotes) {
            if (user === this.$store.state.loggedUser.id) {
              this.downvoted = true
            }
          }

          this.rendered = true
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },

    submit () {
      axios({
        method: 'POST',
        url: `${this.$store.state.baseURL}/answers`,
        data: {
          title: this.title,
          description: this.editorData,
          questionId: this.questionId
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          // data
          this.question = data
          this.title = ''
          this.editorData = ' '
        })
        .catch(({ response }) => {
          this.alert = true
          setTimeout(() => {
            this.alert = false
          }, 2000)
        })
    },

    upvote () {
      let user = this.$store.state.loggedUser.id
      if (user) {
        if (this.upvoted === false) {
          this.upvoted = true
          this.question.upvotes.push(user)
          if (this.downvoted === true) {
            this.downvoted = false
            let index = this.question.downvotes.indexOf(user)
            this.question.downvotes.splice(index, 1)
          }
        } else if (this.upvoted === true) {
          this.upvoted = false
          let index = this.question.upvotes.indexOf(user)
          this.question.upvotes.splice(index, 1)
        }
        this.$store.dispatch('voteQuestion', this.question)
      } else {
        this.displayError()
      }
    },

    downvote () {
      let user = this.$store.state.loggedUser.id

      if (user) {
        if (this.downvoted === false) {
          this.downvoted = true
          this.question.downvotes.push(user)
          if (this.upvoted === true) {
            this.upvoted = false
            let index = this.question.upvotes.indexOf(user)
            this.question.upvotes.splice(index, 1)
          }
        } else if (this.downvoted === true) {
          this.downvoted = false
          let index = this.question.downvotes.indexOf(user)
          this.question.downvotes.splice(index, 1)
        }
        this.$store.dispatch('voteQuestion', this.question)
      } else {
        this.displayError()
      }
    }
  }
}
</script>

<style>
  .answer:hover {
    background-color: #EDEDED;
  }
</style>
