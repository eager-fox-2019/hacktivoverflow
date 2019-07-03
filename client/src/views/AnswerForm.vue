<template>
  <div class="answerform">
    <NavBar/>
    <AFComponent :question="questionId"/>
  </div>
</template>

<script>
import AFComponent from '@/components/AFComponent.vue'
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'answerform',
  components: {
    AFComponent,
    NavBar
  }
  // data(){
  //   return {
  //     questionObject : null
  //   }
  // },
  // created(){
  //   this.questionId = this.$route.params.questionId
  // }

}
</script>
