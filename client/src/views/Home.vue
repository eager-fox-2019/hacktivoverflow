<template>
  <div class="home">
    <b-container class="bv-example-row">
      <h2 class="mt-5">Home</h2>
      <QuestionComponent 
        v-for="question in questions"
        :key="question._id"
        v-bind="question"
        />
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
