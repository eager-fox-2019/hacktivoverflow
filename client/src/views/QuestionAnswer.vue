<template>
  <div class="questionanswer">
    <NavBar/>
    <b-container fluid class="bv-example-row">
        <b-row>
            <b-col sm="1">
                <VoteButton :inside="questionShowed" :type="'question'"/>
            </b-col>
            <b-col sm="10">
                    <b-card no-body align="left">
                        <b-card-body>
                            <pre>{{this.$store.state.questionShowed}}</pre>
                        <h4>{{ questionShowed.title }}</h4>
                        <b-card-text>
                            {{ questionShowed.description }}
                        </b-card-text>
                        <b-button variant="primary" :to="`/add-answer/${questionShowed._id}`">Give answer</b-button>
                    </b-card-body>
                </b-card>
                <b-row>
                    <b-col cols="12" sm>
                        {{ "ini area answer"}}
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-container>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import VoteButton from '@/components/VoteButton.vue'
import { mapState } from 'vuex'

export default {
  name: 'QuestionAnswer',
  data () {
    return {
    }
  },
  components: {
    NavBar,
    VoteButton
  },
  computed: {
    ...mapState(['questionShowed'])
    // answers: function () {
    //   this.$store.dispatch()
    // }
  },
  created () {
      this.$store.dispatch('GET_A_QUESTION', this.$route.params.questionId)
  },
  methods: {
    answering (question) {
      // this.$store.router
    }
  }
}
</script>
