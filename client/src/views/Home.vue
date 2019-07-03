<template>
  <div class="home">
    <h1>Ini home</h1>
    <ul>
      <li v-for="(question,i) in this.$store.state.questions" :key="i">
        <h1> {{question.title}} </h1>
        <h2> {{question.description}}</h2>
        <h3> {{question.answers.length}} </h3>
        <h4> {{question.upVote.length}} </h4>
        <h4> {{question.downVote.length}} </h4>
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  }
};
</script>
