<template>
  <v-container>
    <v-layout row>
      <v-flex xs2>
        <!-- Button Vote -->
        <v-layout row wrap>
          <v-flex>
            <v-layout row wrap align-center justify-center fill-height>
              <v-btn fab dark small>
                <v-icon>fas fa-chevron-up</v-icon>
              </v-btn>
            </v-layout>
          </v-flex>
          <v-flex xs12>
            <v-layout align-center justify-center row fill-height>
              <span>{{ totalVotes }}</span>
            </v-layout>
          </v-flex>
          <v-flex xs12>
            <v-layout align-center justify-center row fill-height>
              <v-btn fab dark small>
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
            <v-layout fill-height align-end justify-start row>
              By {{ question.user_id.username }}
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'questionBox',
  props: ['question'],
  computed: {
    totalVotes () {
      let vote = {
        upvotes: this.question.upvotes,
        downvotes: this.question.downvotes
      }
      return this.$store.commit('computedVotes', vote)
    }
  }
}
</script>

<style>

</style>
