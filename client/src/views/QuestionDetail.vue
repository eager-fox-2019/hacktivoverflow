<template>
  <div style="padding: 0">
    <DetailCard :type="type[0]" :detail="$store.state.selectedQuestion" />
    <h2 class="p-2" style="text-align: left">Answers:</h2>
    <h4 class="p-2" v-if="$store.state.selectedQuestion.answer.length == 0">No Answer yet...</h4>
    <DetailCard :type="'answer'" v-for="detail in $store.state.selectedQuestion.answer" :key="detail._id"/>
  </div>
</template>

<script>
import DetailCard from '@/components/DetailCard'
export default {
  components: {
    DetailCard
  },
  data () {
    return {
      type: ['question', 'answer']
    }
  },
  mounted () {
    this.$store.commit('SELECT_QUESTION', this.$route.params.id)
  }
}
</script>

<style>

</style>
