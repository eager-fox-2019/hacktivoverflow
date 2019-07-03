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
          <v-flex xs12 v-if="itemi">
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
            <v-layout fill-height align-end justify-start row>
              By {{ item.user_id.username }}
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
    <!-- Read More -->
    <v-flex xs2>
      <v-container>
        <v-btn ripple @click="toQuestion(item._id)">
          Read more
        </v-btn>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ['item'],
  methods: {
    toQuestion (val) {
      this.$router.push(`/questions/${val}`)
    }
  },
}
</script>

<style>

</style>
