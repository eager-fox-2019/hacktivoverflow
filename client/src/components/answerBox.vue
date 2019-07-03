<template>
  <v-container v-if="item">
    <v-layout row>
      <v-flex xs2>
        <!-- Button Vote -->
        <v-layout row wrap>
          <v-flex>
            <v-layout row wrap align-center justify-center fill-height>
              <v-btn @click="vote('upvote')"
                :disabled="upvoteStatus" fab dark small>
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
                :disabled="downvoteStatus" fab dark small>
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
            <h2>{{ item.title }}</h2>
          </v-flex>
          <v-flex xs12>
            {{ item.content }}
          </v-flex>
          <v-flex xs12>
            <v-layout fill-height align-end justify-start row>
              By {{ item.user_id.username }}
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['item'],
  methods: {
    vote (val) {
      let sendVote = {
        question_id: this.item.question_id,
        answer_id: this.item._id,
        val,
        type: 'answers'
      }
      this.$store.dispatch('sendVote', sendVote)
    }
  },
  computed: {
    upvoteStatus () {
      return this.item.upvotes.includes(this.$store.state.loginUser.id)
    },
    downvoteStatus () {
      return this.item.downvotes.includes(this.$store.state.loginUser.id)
    }
  }
}
</script>

<style>

</style>
