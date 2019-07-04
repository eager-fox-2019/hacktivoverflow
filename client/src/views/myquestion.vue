<template>
    <div class="d-flex justify-content-center" >
        <div class="mypost" v-if="myquestions.length !== 0">
        <eachquestion v-for="question in myquestions" :key="question._id" :dataquestion="question"/>
        </div>
        <div v-if="myquestions.length == 0">
          <h2> Question still empty! Go ask some question! </h2>
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
    myquestions () {
      return this.$store.state.myquestions
    }
  },
  created () {
    // alert("gfdgf")
    //router di server msh salah krn dikira params
    //getOneQuetsion nya pindah ke kedalam detail question
    //update pkek $push(namakolom: value)
    this.$store.dispatch('GETMYQUESTION')
  }
}
</script>

<style>
.mypost{
    width: 35rem;
}
</style>
