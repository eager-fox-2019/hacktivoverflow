<template>
   <v-flex style="border: 1px solid #BEBEBE" ma-2 xs11>
      <v-card flat>
        <v-layout row wrap>
          <v-flex xs1 style="background-color: #E5E5E5;">
            <v-layout column align-center>
              <v-icon :class=" upvoted ? 'blue--text' : 'grey--text'" large v-on:click="upvote">keyboard_arrow_up</v-icon>
              <div>{{ question.upvotes.length - question.downvotes.length }}</div>
              <v-icon :class=" downvoted ? 'orange--text' : 'grey--text'" large v-on:click="downvote">keyboard_arrow_down</v-icon>
            </v-layout>
          </v-flex>
          <v-flex xs11>
            <v-layout column class="pt-2 pl-3 pr-3" fill-height style="overflow: hidden;">
              <v-layout row wrap align-center>
                <div class="title post-title mt-2" @click='ViewPost(question._id)'>{{ question.question }}</div>
                <v-spacer></v-spacer>
                <div>
                  <v-icon v-if="validateUser" class="icons black--text mr-3" v-on:click="dialog2 = true">edit</v-icon>
                  <v-icon v-if="validateUser" v-on:click="dialog = true" class="icons black--text">delete</v-icon>
                </div>
              </v-layout>
              <v-flex>
                <v-layout row wrap align-center class="mt-3">
                  <div class="subheading text-md-center"> <span style="background-color: lightblue; padding: 8px; border-radius: 5px;" class="mr-1">{{question.answers.length}}</span> Answers</div>
                  <v-spacer></v-spacer>
                  <div class="subheading text-md-center mr-2">Posted by: {{ question.user.username }}</div>
                  <div class="subheading" style="color: #949596;"> {{ getTime }}</div>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card>
       <v-dialog
        v-model="dialog"
        max-width="310"
      >
      <v-card>
        <v-card-title class="headline">Are you sure you want to delete this post?</v-card-title>

        <v-card-text>
          Once deleted your post cannot be recovered.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="red darken-1"
            flat="flat"
            @click="dialog = false"
          >
            Nevermind
          </v-btn>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="deleteQuestion"
          >
            Yes, i'm sure
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <EditQuestion :dialog2="dialog2" :question="question" @closeDialog="dialog2 = false"/>
  </v-flex>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import EditQuestion from '@/components/editquestion.vue'

export default {
  props: ['question'],
  name: 'PostDetail',
  data () {
    return {
      upvoted: false,
      downvoted: false,
      dialog: false,
      dialog2: false
    }
  },
  created () {
    for (let user of this.question.upvotes) {
      if (user === this.$store.state.loggedUser.id) {
        this.upvoted = true
      }
    }

    for (let user of this.question.downvotes) {
      if (user === this.$store.state.loggedUser.id) {
        this.downvoted = true
      }
    }
  },
  computed: {
    getTime () {
      return moment(this.question.createdAt).fromNow()
    },

    validateUser () {
      return this.question.user._id === this.$store.state.loggedUser.id
    }

  },
  components: {
    EditQuestion
  },
  methods: {
    deleteQuestion () {
      axios({
        method: 'DELETE',
        url: `${this.$store.state.baseURL}/questions/${this.question._id}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          this.dialog = false
          this.$store.dispatch('getPublicQuestions')
          // this.$store.dispatch('getMyQuestions')
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },

    ViewPost (id) {
      this.$router.push(`/post/${id}`)
    },

    upvote () {
      if (localStorage.access_token) {
        let user = this.$store.state.loggedUser.id
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
        this.$emit('errorvote')
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
        this.$emit('errorvote')
      }
    }
  }
}
</script>

<style>
.icons {
  /* color: black; */
  opacity: 0.5;
}

.icons:hover {
  cursor: pointer;
  opacity: 1
}

</style>
