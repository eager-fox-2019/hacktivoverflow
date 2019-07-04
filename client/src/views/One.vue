<template>
  <div class="container is-fluid">
    <Navbar style="margin-top: 20px"></Navbar>
    <div style="margin-top: 20px; margin-bottom: 20px">
      <div>
        <Questiondesc :q="currentQ"></Questiondesc>
      </div>
      <div style="margin-top: 10px" v-for="(a, index) in currentQ.answers" :key="index">
        <AnswerCard :a="a"></AnswerCard>
      </div>
      <Answer v-if="isLogin"></Answer>
    </div>
  </div>
</template>

<script>
import Answer from "@/components/Answer.vue";
import Navbar from "@/components/Navbar.vue";
import AnswerCard from "@/components/Answercard.vue";
import Questiondesc from "@/components/Questiondesc.vue";
export default {
  components: {
    Navbar,
    Answer,
    AnswerCard,
    Questiondesc
  },
  computed: {
    currentQ() {
      return this.$store.state.currentQ;
    },
    isLogin() {
      return this.$store.state.isLogin;
    }
  }
};
</script>

<style>
</style>
