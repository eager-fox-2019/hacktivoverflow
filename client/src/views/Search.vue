<template>
  <v-container>
    <ListQuestions :value="$store.state.queryResults" title="Search result" :tags="$store.state.query.tags"/>
  </v-container>
</template>

<script>
import ListQuestions from "@/components/ListQuestions.vue";

export default {
  name: "profile",
  components: {
    ListQuestions
  },
  created() {
    // if (!this.$store.state.loggedIn) {
    //   this.$router.push("/auth");
    // }
  },
  beforeRouteLeave (to, from, next) {
    // called when the route that renders this component is about to
    // be navigated away from.
    // has access to `this` component instance.
    this.$store.commit('clearQuery')
    next()
  },
};
</script>