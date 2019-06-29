<template>
  <div style="padding: 0; height: 92vh; overflow-y: scroll">
    <DetailCard :type="type[0]" :detail="$store.state.selectedQuestion" />
    <h2 class="p-2" style="text-align: left">Answers:</h2>
    <h4 class="p-2" v-if="$store.state.selectedQuestion.answer.length == 0">No Answer yet...</h4>
    <DetailCard :type="'answer'" v-for="(detail, index) in $store.state.selectedQuestionAnswer" :key="detail._id" :index="index" :detail="detail"/>
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
  created () {
    this.$store.commit('SELECT_QUESTION', this.$route.params.id)
    this.$store.dispatch('getAllAnswer')
      .then(result => {
        let answers = []
        for (let i = 0; i < result.length; i++) {
          answers.push(result[i].data)
        }
        this.$store.commit('ALL_SELECTED_ANSWER', answers)
      })
      .catch(err => {
        console.log(err)
        if (!err.response) {
          this.$swal({
            type: 'error',
            title: `Connection to Server Error`,
            showConfirmButton: true
          })
        } else {
          this.$swal({
            type: 'error',
            title: `${err.response.data.message}`,
            showConfirmButton: true
          })
        }
      })
  }
}
</script>

<style>

</style>
