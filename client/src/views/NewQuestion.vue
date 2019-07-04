<template>
  <v-container>
    <h1>Create New Question</h1>
    
    <PostForm @submitted="submitQuestion" :loading="loading">
    <template v-slot:inputTags>
      <vue-tags-input
      class="my-4"
      v-model="tag"
      :tags="tags"
      :autocomplete-items="filteredItems"
      @tags-changed="newTags => tags = newTags"
    />
    </template>
      </PostForm>
  </v-container>
</template>
<script>
import PostForm from '@/components/PostForm';

export default {
  components: {
    PostForm
  },
  data(){
    return {
      loading: false,
      tag: '',
      tags: [],
    }
  },
  computed: {
    autocompleteItems(){
        let existingTags = this.$store.state.existingTags.map(tag => {return { text: tag }})
        return existingTags
    },
    filteredItems() {
      return this.autocompleteItems.filter(i => {
        return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
      });
    },
  },
  methods: {
    submitQuestion(title, description){
      this.loading = true
      let tags = this.tags.map(tag => tag.text)
      console.log(tags);
      
      this.$store.dispatch('createQuestion',{
        title,
        description,
        tags
      })
      .then(results =>{
      this.loading = false
    })
    .catch(err =>{
      this.loading = false
      console.log(err);
    })
      // this.title = '',
      // this.description = ''
    }
  },
  created(){
  }
}
</script>
