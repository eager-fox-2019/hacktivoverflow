<template>
  <v-card flat>
    <v-layout row wrap>
      <v-flex xs1>
        <v-layout column align-center>
          <v-icon :class="upvoted ? 'orange--text' : 'black--text'" large v-on:click="upvote">keyboard_arrow_up</v-icon>
          <div>{{ answer.upvotes.length - answer.downvotes.length}}</div>
          <v-icon :class="downvoted ? 'orange--text' : 'black--text'" large v-on:click="downvote">keyboard_arrow_down</v-icon>
        </v-layout>
      </v-flex>
      <v-flex xs11 pb-2 class="answer">
        <v-layout column class="pl-3" fill-height style="overflow: hidden;">
          <div class="title mt-2">{{ answer.title }}</div>
          <div class="subheading mt-2" v-html="answer.description"></div>
          <v-flex>
            <v-layout row wrap align-center class="mt-3 mr-3">
              <v-spacer></v-spacer>
              <div class="subheading text-md-center">Answered {{ getTime }} by <span style="color: #929292">{{ answer.user.username }}</span></div>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
        <!-- <v-divider></v-divider> -->
  </v-card>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Answers',
  props: ['answer'],
  data() {
    return {
      upvoted: false,
      downvoted: false
    }
  },
  computed: {
    getTime() {
      return moment(this.answer.createdAt).fromNow()
    }
  },
  created() {
    for(let user of this.answer.upvotes) {
        if(user === this.$store.state.loggedUser.id) {
          this.upvoted = true
          
        }
      }
  
    for(let user of this.answer.downvotes) {
      if(user === this.$store.state.loggedUser.id) {
        this.downvoted = true
      }
    }
  },
  methods: {
      upvote() {
      let user = this.$store.state.loggedUser.id
      if(this.upvoted === false) {
        this.upvoted = true
        this.answer.upvotes.push(user)
        if(this.downvoted === true) {
          this.downvoted = false
          let index = this.answer.downvotes.indexOf(user)
          this.answer.downvotes.splice(index,1)
        }
      }
      else if(this.upvoted === true) {
        this.upvoted = false
        let index = this.answer.upvotes.indexOf(user)
        this.answer.upvotes.splice(index,1)
      }
      this.$store.dispatch('voteAnswer', this.answer)
    },

    downvote() {
      let user = this.$store.state.loggedUser.id
      if(this.downvoted === false) {
        this.downvoted = true
        this.answer.downvotes.push(user)
        if(this.upvoted === true) {
          this.upvoted = false
          let index = this.answer.upvotes.indexOf(user)
          this.answer.upvotes.splice(index,1)
        }
      }
      else if(this.downvoted === true) {
        this.downvoted = false
        let index = this.answer.downvotes.indexOf(user)
        this.answer.downvotes.splice(index, 1)
      }
      this.$store.dispatch('voteAnswer', this.answer)
    }
  }
}
</script>

<style>

</style>
