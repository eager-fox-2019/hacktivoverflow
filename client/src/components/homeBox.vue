<template>
  <v-layout row>
    <!-- Button Vote -->
    <v-flex xs2>
      <v-container class="grey lighten-2" fill-height>
        <v-layout row wrap>
          <v-flex>
            <v-layout column wrap align-center justify-center fill-height>
              <h2>{{ item.upvotes.length - item.downvotes.length }}</h2>
              <h5>votes</h5>
            </v-layout>
          </v-flex>
          <v-flex xs12 v-if="item.answers">
            <v-layout column wrap align-center justify-center fill-height>
              <h2>{{ item.answers.length }}</h2>
              <h5>answers</h5>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
    <!-- Content -->
    <v-flex xs10>
      <v-container>
        <v-layout row wrap fill-height>
          <v-flex xs12>
            <h2>{{ item.title }}</h2>
          </v-flex>
          <v-flex xs12>
            {{ item.content }}
          </v-flex>
          <v-flex xs12>
            <v-layout column wrap fill-height align-end justify-start>
              <p>By {{ item.user_id.username }}</p>
              <p>{{ createdDate }}</p>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
    <!-- Button Action -->
    <v-flex xs2>
      <v-layout column>
        <v-btn ripple @click="toQuestion(item._id)">
          Read more
        </v-btn>
        <v-btn
          v-if='boxOwner'
          fab small
          ripple @click="deleteItem(item._id)">
          <v-icon>fas fa-trash-alt</v-icon>
        </v-btn>
      </v-layout>
    </v-flex>
  </v-layout>
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
    toQuestion (val) {
      // this.$store.dispatch('getQuestionDetail', val)
      this.$router.push(`/questions/${val}`)
    },
    deleteItem (val) {
      this.$store.dispatch('deleteQuestion', val)
    }
  },
  created () {
    if (this.item.user_id._id === this.$store.state.loginUser.id) {
      this.boxOwner = true
    }
  },
  computed: {
    createdDate () {
      return moment(this.item.createdAt).format("ddd, MMMM Do YYYY");
    }
  }
}
</script>

<style>

</style>
