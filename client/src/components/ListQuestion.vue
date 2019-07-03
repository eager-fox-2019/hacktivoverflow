<template>
    <b-container class="bv-example-row">
      <b-row>
        <b-col sm="1">
          <VoteButton :inside="question" :type="'question'"/>
        </b-col>
        <b-col sm="11">
          <b-card no-body align="left">
            <b-card-body>
              <b-link :to="`/question/${question._id}`">
                <h4>{{ question.title }}</h4>
              </b-link>
              <b-card-text>
                {{ shortdesc }}
              </b-card-text>
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
    VoteButton
  },
  computed: {
    shortdesc: function () {
      let desc = this.question.description.substring(0, 100)
      if (this.question.description.length > 100) {
        desc += '...'
      }
      return desc
    }
  },
  methods: {
    // getQuestion (id) {
    //   console.log('Masuk getquestion')
    //   // this.$store.dispatch('GET_A_QUESTION', id)
    // }
  }
}
</script>
