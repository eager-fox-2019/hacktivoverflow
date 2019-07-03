<template>
    <b-container class="bv-example-row">
      <b-row>
        <b-col sm="1">
          <VoteButton :que="question" />
        </b-col>
        <b-col sm="11">
          <b-card no-body align="left">
            <b-card-body>
              <b-link :to="`/questions/${question._id}`">
                <h4>{{ question.title }}</h4>
              </b-link>
              <b-card-text>
                {{ question.description }}
              </b-card-text>
              <b-button href="#" variant="primary" @click="answering(question)" v-if="$store.state.isLogin">Answer</b-button>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
</template>

<script>
import VoteButton from '@/components/VoteButton.vue'
export default {
  props: ['question'],
  components: {
    // ListQuestion
    VoteButton
  },
  methods: {
    answering (question) {
      // this.$store.router
    }
  }
}
</script>
