<template>
  <v-card flat>
    <v-layout row wrap>
      <v-flex xs1>
        <v-layout column align-center>
          <v-icon style="cursor:pointer;" color="orange" large>keyboard_arrow_up</v-icon>
          <div>0</div>
          <v-icon style="cursor:pointer;" large>keyboard_arrow_down</v-icon>
        </v-layout>
      </v-flex>
      <v-flex xs11 pb-2 class="answer">
        <v-layout column class="pl-3" fill-height style="overflow: hidden;">
          <div class="title mt-2">{{ answer.title }}</div>
          <div class="subheading mt-2" v-html="answer.description"></div>
          <v-flex>
            <v-layout row wrap align-center class="mt-3 mr-3">
              <v-spacer></v-spacer>
              <div class="subheading text-md-center">Answered {{getTime(answer.createdAt)}} by <span style="color: #929292">{{ answer.user.username }}</span></div>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
        <!-- <v-divider></v-divider> -->
  </v-card>
</template>

<script>
export default {
  name: 'Answers',
  props: ['answer'],
  data() {
    return {

    }
  },

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
  }
}
</script>

<style>

</style>
