<template>
  <v-container>
    <v-layout row>
      <v-flex xs2>
        <!-- Button Vote -->
        <v-layout row wrap>
          <v-flex>
            <v-layout row wrap align-center justify-center fill-height>
              <v-btn @click="vote('upvote')"
                :disabled="upvoteStatus" fab small>
                <v-icon>fas fa-chevron-up</v-icon>
              </v-btn>
            </v-layout>
          </v-flex>
          <v-flex xs12>
            <v-layout align-center justify-center row fill-height>
              <span>{{ question.upvotes.length - question.downvotes.length }}</span>
            </v-layout>
          </v-flex>
          <v-flex xs12>
            <v-layout align-center justify-center row fill-height>
              <v-btn @click="vote('downvote')"
                :disabled="downvoteStatus" fab small>
                <v-icon>fas fa-chevron-down</v-icon>
              </v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <!-- Content -->
      <v-flex xs10>
        <v-layout row wrap fill-height>
          <v-flex xs12>
            {{ question.content }}
          </v-flex>
          <v-flex xs12>
            <v-layout align-start justify-start column>
              <span>By {{ question.user_id.username }}</span>
              <span>{{ createTime }}</span>
              <span>{{ momentAgo }}</span>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import moment from 'moment'

export default {
  name: 'questionBox',
  props: ['question'],
  methods: {
    vote (val) {
      let sendVote = {
        question_id: this.question._id,
        val,
        type: 'questions'
      }
      this.$store.dispatch('sendVote', sendVote)
    }
  },
  computed: {
    upvoteStatus () {
      return this.question.upvotes.includes(this.$store.state.loginUser.id)
    },
    downvoteStatus () {
      return this.question.downvotes.includes(this.$store.state.loginUser.id)
    },
    createTime () {
      return moment(this.question.createdAt).format('ddd, MMMM Do YYYY')
    },
    momentAgo () {
      return moment(this.question.createdAt).fromNow()
    }
  }
}
</script>

<style>

</style>
