<template>
  <div class="container is-fluid">
    <Navbar style="margin-top: 20px"></Navbar>
    <div class="container" style="margin-top: 30px; margin-bottom: 30px">
      <div v-if="allQ.length == 0" style="margin-top: 150px">
        <strong style="font-size: 30px">No question found</strong>
      </div>
      <div class="column">
        <div class="columns" style="display: flex; justify-content: center; background-color: lightblue">
        <div v-for="(tag, index) in watchtags" :key="index" style="margin: 5px">
          <a @click="tagsearch(tag)"><b-tag type="is-primary" rounded>{{tag}}</b-tag></a>
        </div>
      </div>
      </div>
      <div
        v-for="(q, index) in allQ"
        :key="index"
        style="margin-top: 10px"
        @click="toQuestion(q._id)"
      >
        <Question :q="q"></Question>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Question from "@/components/Question.vue";
export default {
  name: "navbar",
  components: {
    Navbar,
    Question
  },
  computed: {
    allQ() {
      return this.$store.state.allQ;
    },
    watchtags() {
      return this.$store.state.user.watchtags;
    }
  },
  methods: {
    toQuestion(id) {
      this.$store.dispatch("ONEQUESTION", id);
    },
    tagsearch(tag) {
      this.$store.dispatch("TAGQUESTION", tag);
      this.$router.push("/all");
    }
  }
};
</script>

<style>
</style>
