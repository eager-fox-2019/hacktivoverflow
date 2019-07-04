<template>
  <div class="container is-fluid">
    <Navbar style="margin-top: 20px"></Navbar>
    <div class="container" style="margin-top: 30px; margin-bottom: 30px">
      <div v-if="allQ.length == 0"  style="margin-top: 150px">
        <strong style="font-size: 30px">No question found</strong>
      </div>
      <div v-for="(q, index) in allQ" :key="index" style="margin-top: 10px" @click="toQuestion(q._id)">
        <Question :q='q'></Question>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Question from '@/components/Question.vue'
export default {
  name: "navbar",
  components: {
    Navbar,
    Question
  },
  computed: {
    allQ(){
      return this.$store.state.allQ
    }
  },
  methods: {
    toQuestion(id){
      this.$store.dispatch('ONEQUESTION', id)
    }
  },
};
</script>

<style>
</style>
