<template>
  <v-layout column>
    <v-layout column wrap align-center justify-center fill-height>
      <v-select
        color="black"
        v-model="sortBy"
        :items="sortBySelects"
        label="Sort Question by"
      ></v-select>
      <v-btn @click="showAddEdit">Ask a question</v-btn>
    </v-layout>
    <v-container>
      <v-flex xs12 md8 offset-md2>
        <v-list py-0 my-0 three-line v-if="$store.state.questions.length">
          <homeBox v-for="item in filteredQuestions"
            :key="item._id" :item="item"></homeBox>
        </v-list>
      </v-flex>
    </v-container>
  </v-layout>
</template>

<script>
import homeBox from '@/components/homeBox.vue'
import moment from 'moment'
import Swal from 'sweetalert2'

export default {
  name: 'home',
  components: {
    homeBox
  },
  data () {
    return {
      sortBySelects: ['Newest', 'Votes'],
      questions: [],
      sortBy: 'Votes'
    }
  },
  methods: {
    showAddEdit () {
      if (this.$store.state.loginUser.id) {
        this.$store.commit('setAddEditDialog', { show: true, type: 'questions' })
      } else {
        Swal.fire(
          'Login First!',
          'Please login to ask a question',
          'error'
        )
      }
    },
    updateQuestions (val) {
      if (val === 'Newest') {
        this.questions = this.sortedByDate
      } else if (val === 'Votes') {
        this.questions = this.sortedByVotes
      }
    }
  },
  watch: {
    sortBy (val) {
      this.updateQuestions(val)
    },
    '$store.state.questions' () {
      this.updateQuestions(this.sortBy)
    }
  },
  computed: {
    sortedByDate () {
      return this.$store.state.questions.sort((q1, q2) => moment(q2.createdAt) - moment(q1.createdAt))
    },
    sortedByVotes () {
      return this.$store.state.questions.sort((q1, q2) => {
        return (q2.upvotes.length - q2.downvotes.length) - (q1.upvotes.length - q1.downvotes.length)
      })
    },
    filteredQuestions () {
      return this.questions.filter((question) => {
        return question.title.includes(this.$store.state.searchQuestion)
      })
    }
  },
  created () {
    this.$store.dispatch('getQuestions')
  }
}
</script>
