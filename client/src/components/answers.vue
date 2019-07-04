<template>
  <v-card flat>
    <v-layout row wrap>
      <v-flex xs1>
        <v-layout column align-center>
          <v-icon :class="upvoted ? 'blue--text' : 'grey--text'" large v-on:click="upvote">keyboard_arrow_up</v-icon>
          <div>{{ answer.upvotes.length - answer.downvotes.length}}</div>
          <v-icon :class="downvoted ? 'orange--text' : 'grey--text'" large v-on:click="downvote">keyboard_arrow_down</v-icon>
        </v-layout>
      </v-flex>
      <v-flex xs11 pb-2 class="answer">
        <v-layout column class="pl-3" fill-height style="overflow: hidden;">
          <v-layout>
            <div class="title mt-2">{{ answer.title }}</div>
            <v-spacer></v-spacer>
          </v-layout>
          <div class="subheading mt-2" v-html="answer.description"></div>
          <v-flex>
            <v-layout row wrap align-center class="mt-3 mr-3">
              <div class="subheading text-md-center" style="color: #929292">Answered {{ getTime }} by <span>{{ answer.user.username }}</span></div>
              <v-spacer></v-spacer>
              <v-alert
                :value="alert"
                type="error"
                transition="scale-transition"
              >
                You must login before voting.
              </v-alert>
              <v-icon v-if="validateUser" class="icons black--text mr-3" v-on:click="dialog2 = true">edit</v-icon>
              <v-icon v-if="validateUser" class="icons black--text mr-3" v-on:click="dialog=true">delete</v-icon>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  <v-divider></v-divider>
    <v-dialog
          v-model="dialog"
          max-width="350"
        >
      <v-card>
        <v-card-title class="headline">Are you sure you want to delete this answer?</v-card-title>

        <v-card-text>
          Once deleted your answer cannot be recovered.
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
            @click="deleteAnswer"
          >
            Yes, i'm sure
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <EditAnswer :dialog2="dialog2" v-on:closeDialog="dialog2 = false" :answer="answer" v-on:editQuestion="edit"/>
  </v-card>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
import EditAnswer from '@/components/editanswer.vue'

export default {
  name: 'Answers',
  props: ['answer'],
  data () {
    return {
      upvoted: false,
      downvoted: false,
      dialog: false,
      dialog2: false,
      alert: false
    }
  },
  components: {
    EditAnswer
  },
  computed: {
    getTime () {
      return moment(this.answer.createdAt).fromNow()
    },

    validateUser () {
      return this.answer.user._id === this.$store.state.loggedUser.id
    }
  },
  created () {
    for (let user of this.answer.upvotes) {
      if (user === this.$store.state.loggedUser.id) {
        this.upvoted = true
      }
    }

    for (let user of this.answer.downvotes) {
      if (user === this.$store.state.loggedUser.id) {
        this.downvoted = true
      }
    }
  },
  methods: {
    displayError () {
      this.alert = true

      setTimeout(() => {
        this.alert = false
      }, 2500)
    },
    deleteAnswer () {
      axios({
        method: 'DELETE',
        url: `${this.$store.state.baseURL}/answers/${this.answer._id}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          this.dialog = false
          this.$emit('delete')
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },

    edit () {
      console.log('masuk emit')
      this.$emit('edit')
    },

    upvote () {
      let user = this.$store.state.loggedUser.id
      if (user) {
        if (this.upvoted === false) {
          this.upvoted = true
          this.answer.upvotes.push(user)
          if (this.downvoted === true) {
            this.downvoted = false
            let index = this.answer.downvotes.indexOf(user)
            this.answer.downvotes.splice(index, 1)
          }
        } else if (this.upvoted === true) {
          this.upvoted = false
          let index = this.answer.upvotes.indexOf(user)
          this.answer.upvotes.splice(index, 1)
        }
        this.$store.dispatch('voteAnswer', this.answer)
      } else {
        this.displayError()
      }
    },

    downvote () {
      let user = this.$store.state.loggedUser.id
      if (user) {
        if (this.downvoted === false) {
          this.downvoted = true
          this.answer.downvotes.push(user)
          if (this.upvoted === true) {
            this.upvoted = false
            let index = this.answer.upvotes.indexOf(user)
            this.answer.upvotes.splice(index, 1)
          }
        } else if (this.downvoted === true) {
          this.downvoted = false
          let index = this.answer.downvotes.indexOf(user)
          this.answer.downvotes.splice(index, 1)
        }
        this.$store.dispatch('voteAnswer', this.answer)
      } else {
        this.displayError()
      }
    }
  }
}
</script>

<style>

</style>
