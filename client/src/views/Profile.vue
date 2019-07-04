<template>
  <v-container>
    <h1>{{ $store.state.user.name }}</h1>
    <ListQuestions :value="$store.state.user.questions" title="Questions"/>
  </v-container>
</template>

<script>
import ListQuestions from "@/components/ListQuestions.vue";

export default {
  name: "profile",
  components: {
    ListQuestions
  },
  watch: {
    $route(){
      this.$store.dispatch('getUserQuestions',this.$route.params.id)
    }
  },
  created() {
    this.$store.dispatch('getUserQuestions',this.$route.params.id)
  }
};
</script>