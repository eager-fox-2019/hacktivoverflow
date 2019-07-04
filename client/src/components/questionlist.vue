<template>
    <div>
        <div class="eQuestion">
        <eachquestion v-for="question in questions" :key="question._id" :dataquestion="question"/>
        </div>
    </div>
</template>

<script>
import eachquestion from '@/components/eachquestion.vue'
export default {
  name: 'listQ',
  components: {
    eachquestion
  },
  computed: {
    questions () {
      return this.$store.state.questions
    }
  },
  created () {
    this.$store.dispatch('GETQUESTION')
  }
}
</script>

<style>
.eQuestion{
    padding: 3rem;
}
</style>
