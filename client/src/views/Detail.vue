<template>
<div class="container">
  <div class="detailPage">
    <detailQuestion :question="dataQuestion"/>
    <answerlist />
  </div>
    <addingAnswer v-if="isLogin"/>
</div>
</template>

<script>
import answerlist from '@/components/answerlist.vue'
import detailQuestion from '@/components/detailQuestion.vue'
import addingAnswer from '@/components/addingAnswer.vue'
import ax from '@/axiosApi'
import { mapState } from "vuex";

export default {
  components: {
    answerlist,detailQuestion,addingAnswer
  },
  data(){
    return {
      dataQuestion : {}
    }
  },
  computed: {
    ...mapState(["answers","isLogin","onequestion"])
  },
  created(){ 
    console.log('masuk sini');
    console.log(this.$route.params.questionId);
    //  ax.get(`/questions/detail/${this.$route.params.questionId}`, {
    //     headers: {
    //       token: localStorage.getItem('token')
    //     }
    //   }).then(({ data }) => {
    //     console.log(data,'&&');
    //     this.dataQuestion = data
    //     // this.$store.commit('UPVOTES',data.upvotes.length)
    //     // this.$store.commit('DOWNVOTES',data.downvotes.length)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
    //     this.$store.dispatch('GETONEQUESTION',this.$route.params.questionId)
  }
}
</script>

<style>
/* .detailPage{ */
  /* width: 35rem; */
/* } */
.answerpage{
  width: 35rem;
  padding-bottom: 4rem;
}
</style>
