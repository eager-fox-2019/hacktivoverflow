<template>
  <v-container>
    <v-layout row>
      <v-flex>
        <h1>{{ user.name }}</h1>
        <ListQuestions :value="user.questions" title="Questions" />
      </v-flex>
      <v-flex>
        <v-card>
          <v-img :src="user.image_url" aspect-ratio="2.75"></v-img>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ user.name }}</h3>
              <div>Reputation : {{ user.reputation }}</div>
              <div>
                Watched Tags :
                <v-chip
                  @click="$store.dispatch('searchByTags',{tag})"
                  v-for="(tag,index) in user.watchedTags"
                  color="primary"
                  text-color="white"
                  :key="index"
                >{{ tag }}</v-chip>
              </div>
              <v-btn
                v-if="!editingTags"
                @click="editingTags = !editingTags"
                flat
                icon
                color="indigo"
              >
                <v-icon>library_add</v-icon>
              </v-btn>
              <div v-if="editingTags">
                <vue-tags-input
                  
                  class="my-4"
                  v-model="tag"
                  :tags="tags"
                  :validation="validation"
                  :autocomplete-items="filteredItems"
                  @tags-changed="newTags => tags = newTags"
                />
                <v-btn @click="changeWatchedTags" flat icon color="green">
                <v-icon>done</v-icon>
              </v-btn>
              </div>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat color="orange">Share</v-btn>
            <v-btn flat color="orange">Explore</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ListQuestions from "@/components/ListQuestions.vue";
import { mapState } from "vuex";

export default {
  name: "profile",
  components: {
    ListQuestions
  },
  data() {
    return {
      editingTags: false,
      tag: "",
      tags: [],
      // validation: [
      //   {
      //     classes: "avoid-item",
      //     rule: tag => this.filteredItems.indexOf(tag) == -1,
      //     disableAdd: true
      //   }
      // ]
    };
  },
  computed: {
    ...mapState(["user"]),
    autocompleteItems() {
      this.tags = [...this.$store.state.user.watchedTags];
      let existingTags = this.$store.state.existingTags.map(tag => {
        return { text: tag };
      });
      return existingTags;
    },
    filteredItems() {
      return this.autocompleteItems.filter(i => {
        return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
      });
    }
  },
  watch: {
    $route() {
      this.$store.dispatch("getUserQuestions", this.$route.params.id);
    }
  },
  created() {
    this.$store.dispatch("getUserQuestions", this.$route.params.id);
  },
  methods:{
    changeWatchedTags(){
      let tags = this.tags.map(tag => tag.text)
      this.$store.dispatch('changeProfile',{
        watchedTags: tags
      })
      .then(data =>{
        this.editingTags = false
      })
      .catch(err =>{
        console.log(err);
        
      })
    }
  }
};
</script>