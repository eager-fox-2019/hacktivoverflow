<template>
  <div class="home d-flex justify-content-center">
    <div class="addQ">
    <h1> What's Your Problem</h1>
      <addingQuestion v-if="isLogin"/>
      <questionList />
    </div>
  </div>
</template>

<script>
import addingQuestion from '@/components/addingQuestion.vue'
import questionList from '@/components/questionlist.vue'
import { mapState } from 'vuex'

export default {
  name: 'home',
  components: {
    addingQuestion, questionList
  },
  computed: {
    ...mapState(['isLogin'])
  }
}
</script>

<style>
.addQ{
  width: 30rem;
  margin-top: 1rem;
}

</style>
