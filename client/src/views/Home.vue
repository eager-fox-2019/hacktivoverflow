<template>
  <div class="home">
    <b-container class="bv-example-row">
      <h2 class="mt-5">Question List</h2>
      <div  v-if="questions.length > 0">
        <QuestionComponent
          v-for="question in questions"
          :key="question._id"
          v-bind="question"
          />
      </div>
      <div class="m-5" v-else>
        <h5>No Question Exists</h5>
        <p>Seems like everyone already know what they're doin</p>
      </div>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import QuestionComponent from '@/components/QuestionComponent.vue'

export default {
  name: "home",
  computed: mapState([
    'questions'
  ]),
  components: {
    QuestionComponent
  },
  data() {
    return {

    }
  },
  created() {
    let q = QuestionComponent
    this.$store.dispatch('fetchQuestion')
  },
};
</script>
