<template>
  <v-container>
    <v-flex xs12 sm6 d-flex>
      <v-select v-model="selected" @change="sortQuestions" :items="category" solo></v-select>
    </v-flex>
    <ListQuestions :value="$store.state.questions" v-for="cat in category" v-show="selected==cat" :title="cat" :key="cat" :tags="$store.state.existingTags"/>
  <Progress :loading="loading"/>
  </v-container>
</template>

<script>
import ListQuestions from "@/components/ListQuestions";

export default {
  components: {
    ListQuestions,
  },
  data(){
    return {
      loading: true,
      selected: 'Newest',
      category: ['Updated Recently','Newest','Most Voted','Most Answers']
    }
  },
  created() {
    this.loading = true
    this.$store.dispatch('getAllQuestions',this.selected)
    .then(results =>{
      this.loading = false
    })
    .catch(err =>{
      this.loading = false
      console.log(err);
    })
  },
  methods: {
    sortQuestions(){
      this.$store.commit('sortQuestions',this.selected)
    }
  }
};
</script>
