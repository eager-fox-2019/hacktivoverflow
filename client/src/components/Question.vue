<template>
  <div>
    <v-list-tile class="my-3">
      <v-layout justify-center column>
        <v-list-tile-action>
          <v-btn @click="vote('upvote')" icon>
            <v-icon color="grey">arrow_drop_up</v-icon>
          </v-btn>
        </v-list-tile-action>
        <span class="ml-2">{{ question.upvotes.length - question.downvotes.length }}</span>
        <v-list-tile-action>
          <v-btn @click="vote('downvote')" icon>
            <v-icon color="grey">arrow_drop_down</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-layout>
      <v-flex>
        <v-list-tile-content>
          <router-link :to="'/question/'+question._id">
          <v-list-tile-title class="text-truncate">{{ question.title }}</v-list-tile-title>
          </router-link>
          <v-list-tile-sub-title>asked by : <router-link class="mr-5" v-model="question.user" :to="'/profile/'+question.user._id">{{ question.user.name }}</router-link>
          <span class="grey--text mr-5">
          created : {{ createdAt }} 
          </span>
          <span class="grey--text">
           updated : {{ updatedAt }}
          </span>
          </v-list-tile-sub-title>
          <div>
          <v-chip @click="$store.dispatch('searchByTags',tag)" v-for="(tag,index) in question.tags" color="primary" text-color="white" :key="index">{{ tag }}</v-chip>
          </div>
        </v-list-tile-content>
      </v-flex>
    </v-list-tile>
    <v-divider></v-divider>
  </div>
</template>
<script>
export default {
  name: 'question',
  props: ['question','title'],
  data() {
    return {};
  },
  computed: {
    createdAt(){
      return new Date(this.question.createdAt).toLocaleDateString('id-ID')
    },
    updatedAt(){
      return new Date(this.question.updatedAt).toLocaleDateString('id-ID')
    },
  },
  methods: {
    vote(voteType){
      if(localStorage.getItem('token')){
        this.$store.dispatch('voteQuestion',{
          questionId: this.question._id,
          voteType,
          sortBy: this.title
        })
      }
      else
        this.$router.push('/auth')
    }
  }
};
</script>
