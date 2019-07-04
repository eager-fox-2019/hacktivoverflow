<template>
  <v-card>
    <v-layout v-show="!editing" row wrap>
      <v-layout align-center justify-center column xs1>
        <v-btn @click="vote('upvote')" icon>
          <v-icon color="grey">arrow_drop_up</v-icon>
        </v-btn>
        <span>{{ value.upvotes.length - value.downvotes.length }}</span>
        <v-btn @click="vote('downvote')" icon>
          <v-icon color="grey">arrow_drop_down</v-icon>
        </v-btn>
      </v-layout>
      <v-flex class="mb-3" xs10>
        <slot></slot>
        <v-card-text v-html="value.description" class="subheading"></v-card-text>
        <v-card-sub-title>
          {{ purpose }} by :
          <router-link class="mr-5" v-model="value.user.name" :to="'/profile/'+value.user._id">{{ value.user.name }}</router-link>
        </v-card-sub-title>
        <span class="grey--text mr-5">created : {{ createdAt }}</span>
        <span class="grey--text">updated : {{ updatedAt }}</span>
      </v-flex>
      <v-layout v-show="checkOwnership && !$store.state.editingPost" justify-end xs1>
        <v-btn @click="editing = !editing; $store.commit('editingPost')" color="success" flat icon>
          <v-icon>border_color</v-icon>
        </v-btn>
        <v-btn @click="deletePost" flat icon color="red">
          <v-icon>delete</v-icon>
        </v-btn>
      </v-layout>
    </v-layout>
    <v-container v-show="editing">
      <PostForm :tipe="tipe" @submitted="update" :value="value" :loading="loading">
        <template v-if="tipe == 'Question'" v-slot:inputTags>
          <vue-tags-input
      class="my-4"
      v-model="tag"
      :tags="tags"
      :autocomplete-items="filteredItems"
      @tags-changed="newTags => tags = newTags"
    />
        </template>
        <v-btn @click="editing = !editing; $store.commit('editingPost')" color="info" dark class="mt-4">Cancel</v-btn>
      </PostForm>
    </v-container>
  </v-card>
</template>
<script>
import PostForm from "@/components/PostForm";

export default {
  components: {
    PostForm
  },
  data() {
    return {
      editing: false,
      loading: false,
      tag: '',
      tags: [],
    };
  },
  props: ["tipe", "value"],
  watch: {
    // '$store.state.existingTags'(newVal){
    //   this.tags = [...this.$store.state.existingTags]
    // }
  },
  computed: {
    autocompleteItems(){
      if(this.tipe == 'Question'){
        this.tags = [...this.$store.state.existingTags]
        let existingTags = this.$store.state.existingTags.map(tag => {return { text: tag }})
        return existingTags
      }
      return []
    },
    filteredItems() {
      return this.autocompleteItems.filter(i => {
        return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
      });
    },
    purpose() {
      if (this.tipe == "Answer") return "answered";
      else return "asked";
    },
    createdAt() {
      return new Date(this.value.createdAt).toLocaleDateString("id-ID");
    },
    updatedAt() {
      return new Date(this.value.updatedAt).toLocaleDateString("id-ID");
    },
    checkOwnership() {
      //5ce79c3d5f075c1b0b57d288      
      return this.value.user._id === this.$store.state.me._id;
    },
    deviation(){
      return this.value.upvotes.length - this.value.downvotes.length
    },
    
  },
  methods: {
    vote(voteType) {
      if(localStorage.getItem('token')){
        let payload = {
          voteType
        };
        if (this.tipe == "Answer"){
        payload.questionId = this.value.question._id;
        payload.answerId = this.value._id;
        }
      else{
        payload.questionId = this.value._id;
        }
        this.$store.dispatch("vote" + this.tipe, payload);
      }
      else
        this.$router.push('/auth')
    },
    update(title, description) {
      this.loading = true
      this.editing = false;
      let payload = {
        title,
        description
      };
      if (this.tipe == "Answer"){
        payload.questionId = this.value.question._id;
        payload.answerId = this.value._id;
        }
      else{
        payload.questionId = this.value._id;
        payload.tags = this.tags
        }

      this.$store.dispatch("update" + this.tipe, payload)
      .then(results =>{
      this.loading = false
      this.$store.commit('editingPost')
    })
    .catch(err =>{
      this.loading = false
      console.log(err);
    })
    },
    deletePost(){
      this.loading = true
      let payload = {}
      if (this.tipe == "Answer"){
        payload.questionId = this.value.question._id;
        payload.answerId = this.value._id;
        }
      else{
        payload.questionId = this.value._id;
        }

      this.$store.dispatch("delete" + this.tipe, payload)
      .then(results =>{
      this.loading = false
    })
    .catch(err =>{
      this.loading = false
      console.log(err);
    })
    }
  },
  created(){
    console.log(this.checkOwnership)
  }
  // computed: {
  //   votes(){
  //     console.log(this.value)
  //     return this.value.upvotes.length - this.value.downvotes.length
  //   }
  // }
};
</script>
