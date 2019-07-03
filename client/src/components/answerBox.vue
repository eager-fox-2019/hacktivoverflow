<template>
  <v-container v-if="item">
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
              <span>{{ item.upvotes.length - item.downvotes.length }}</span>
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
      <v-flex xs8>
        <v-layout row wrap fill-height>
          <v-flex xs12>
            <h2>{{ item.title }}</h2>
          </v-flex>
          <v-flex xs12>
            {{ item.content }}
          </v-flex>
          <v-flex xs12>
            <v-layout align-end justify-center column fill-height>
              <span>By {{ item.user_id.username }}</span>
              <span>{{ createTime }}</span>
              <span>{{ momentAgo }}</span>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <!-- Button Action -->
      <v-flex xs2>
        <v-layout column align-center justify-center fill-height>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn
                v-if='boxOwner'
                v-on="on"
                fab small
                ripple @click="deleteItem(item._id)">
                <v-icon>fas fa-trash-alt</v-icon>
              </v-btn>
            </template>
            <span>Delete</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                v-if='boxOwner'
                v-on="on"
                fab small
                ripple @click="showAddEdit(item)">
                <v-icon>edit</v-icon>
              </v-btn>
            </template>
            <span>Edit</span>
          </v-tooltip>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import moment from 'moment'

export default {
  props: ['item'],
  data () {
    return {
      boxOwner: false
    }
  },
  methods: {
    vote (val) {
      let sendVote = {
        question_id: this.item.question_id,
        answer_id: this.item._id,
        val,
        type: 'answers'
      }
      this.$store.dispatch('sendVote', sendVote)
    },
    showAddEdit (val) {
      this.$store.commit('setAddEditDialog', { show: true, type: 'answers', val })
    },
    deleteItem (val) {
      this.$store.dispatch('deleteQuestionAnswer', { type: 'answers', val })
    }
  },
  watch: {
    '$store.state.loginUser.id' () {
      if (this.item.user_id._id === this.$store.state.loginUser.id) {
        this.boxOwner = true
      }
    }
  },
  created () {
    if (this.item.user_id._id === this.$store.state.loginUser.id) {
      this.boxOwner = true
    }
  },
  computed: {
    upvoteStatus () {
      return this.item.upvotes.includes(this.$store.state.loginUser.id)
    },
    downvoteStatus () {
      return this.item.downvotes.includes(this.$store.state.loginUser.id)
    },
    createTime () {
      return moment(this.item.createdAt).format('ddd, MMMM Do YYYY')
    },
    momentAgo () {
      return moment(this.item.createdAt).fromNow()
    }
  }
}
</script>

<style>

</style>
