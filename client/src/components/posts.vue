<template>
  <v-container grid-list-md ml-5>
    <v-layout row wrap >
      <v-flex xs11 ma-2 style="margin: 0; padding: 0; background-color:#F7C10A;">
        <v-btn flat class="font-weight-bold">Public questions</v-btn>
        <v-btn flat class="font-weight-bold">Your questions</v-btn>  
      </v-flex>
      <v-flex style="border: 1px solid #BEBEBE" xs11 v-for="(question, index) in $store.state.publicQuestions" :key="index" ma-2>
        <v-card flat>
          <v-layout row wrap>
            <v-flex xs1 style="background-color: #E5E5E5;">
              <v-layout column align-center>
                <v-icon style="cursor:pointer;" class="upvoted-button" large v-on:click="upvote">keyboard_arrow_up</v-icon>
                <div>0</div>
                <v-icon style="cursor:pointer;" large>keyboard_arrow_down</v-icon>
              </v-layout>
            </v-flex>
            <v-divider vertical></v-divider>
            <v-flex xs10>
              <v-layout column class="pt-2 pl-3" fill-height style="overflow: hidden;">
                <div class="title post-title mt-2" @click='ViewPost(question._id)'>{{ question.question }}</div>
                <v-flex>
                  <v-layout row wrap align-center class="mt-3">
                    <v-btn flat class="ma-0 pl-0"><v-icon class="mr-2">comment</v-icon>Comment</v-btn>
                    <div class="subheading text-md-center ml-2">Posted by: {{ question.user.username }}</div>
                    <v-spacer></v-spacer>
                    <div class="subheading" style="color: #949596;"> {{ getTime(question.createdAt)}}</div>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Posts',

  methods: {
    getTime(createdAt) {
        let now = new Date()
        let date = new Date(createdAt)
        let diff = now - date
        
        if(diff < (1000 * 60 * 60)) {
          return `${Math.floor(diff/ (1000 * 60))} mins ago`
        } else if (diff < (1000 * 60 * 60 * 24)) {
          return `${Math.floor(diff/(1000 * 60 * 60))} hours ago`
        } else {
          return `${Math.floor(diff/(1000 * 60 * 60 * 24))} days ago`
        }
    },

    ViewPost(id) {
      this.$router.push(`/post/${id}`)
    },

    upvote() {
      console.log('masukk')
    }
  }
}
</script>

<style>
  .post-title {
    cursor: pointer;
    color: #3E95DD;
  }

  .post-title:hover {
    color: #6BBCFF;
  }

  .upvoted-button {
    color: orange;
  }

</style>
