<template>
   <v-flex style="border: 1px solid #BEBEBE" ma-2 xs11>
      <v-card flat>
        <v-layout row wrap>
          <v-flex xs1 style="background-color: #E5E5E5;">
            <v-layout column align-center>
              <v-icon :class=" upvoted ? 'orange--text' : 'black--text'" large v-on:click="upvote">keyboard_arrow_up</v-icon>
              <div>{{ question.upvotes.length - question.downvotes.length }}</div>
              <v-icon :class=" downvoted ? 'orange--text' : 'black--text'" large v-on:click="downvote">keyboard_arrow_down</v-icon>
            </v-layout>
          </v-flex>
          <v-divider vertical></v-divider>
          <v-flex xs10>
            <v-layout column class="pt-2 pl-3" fill-height style="overflow: hidden;">
              <div class="title post-title mt-2" @click='ViewPost(question._id)'>{{ question.question }}</div>
              <v-flex>
                <v-layout row wrap align-center class="mt-3">
                  <v-btn flat class="ma-0 pl-0"><v-icon class="mr-2">comment</v-icon>Comment</v-btn>
                  <div class="subheading text-md-center ml-2">Posted by: {{ question.user.username }}</div>
                  <v-spacer></v-spacer>
                  <div class="subheading" style="color: #949596;"> {{ getTime }}</div>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card>
  </v-flex>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  props: ['question'],
  name: 'PostDetail',
  data() {
    return {
      upvoted: false,
      downvoted: false,
    }
  },
  created() {
      for(let user of this.question.upvotes) {
        if(user === this.$store.state.loggedUser.id) {
          this.upvoted = true
          
        }
      }
  
      for(let user of this.question.downvotes) {
        if(user === this.$store.state.loggedUser.id) {
          this.downvoted = true
        }
      }
  },
  computed: {
    getTime(){ 
      return moment(this.question.createdAt).fromNow()
    }

  },
  methods: {
    //  getTime(createdAt) {
    //     let now = new Date()
    //     let date = new Date(createdAt)
    //     let diff = now - date
        
    //     if(diff < (1000 * 60 * 60)) {
    //       return `${Math.floor(diff/ (1000 * 60))} mins ago`
    //     } else if (diff < (1000 * 60 * 60 * 24)) {
    //       return `${Math.floor(diff/(1000 * 60 * 60))} hours ago`
    //     } else {
    //       return `${Math.floor(diff/(1000 * 60 * 60 * 24))} days ago`
    //     }
    // },

    ViewPost(id) {
      this.$router.push(`/post/${id}`)
    },

    upvote() {
      let user = this.$store.state.loggedUser.id
      if(this.upvoted === false) {
        this.upvoted = true
        this.question.upvotes.push(user)
        if(this.downvoted === true) {
          this.downvoted = false
          let index = this.question.downvotes.indexOf(user)
          this.question.downvotes.splice(index,1)
        }
      }
      else if(this.upvoted === true) {
        this.upvoted = false
        let index = this.question.upvotes.indexOf(user)
        this.question.upvotes.splice(index,1)
      }
      this.$store.dispatch('voteQuestion', this.question)
    },

    downvote() {
      let user = this.$store.state.loggedUser.id
      if(this.downvoted === false) {
        this.downvoted = true
        this.question.downvotes.push(user)
        if(this.upvoted === true) {
          this.upvoted = false
          let index = this.question.upvotes.indexOf(user)
          this.question.upvotes.splice(index,1)
        }
      }
      else if(this.downvoted === true) {
        this.downvoted = false
        let index = this.question.downvotes.indexOf(user)
        this.question.downvotes.splice(index, 1)
      }
      this.$store.dispatch('voteQuestion', this.question)
    }
  }
}
</script>

<style>

</style>
