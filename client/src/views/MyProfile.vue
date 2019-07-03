<template>
    <v-layout column align-center justify-center fill-height wrap>
      <v-card wrap>
        <v-avatar tile
          size="200">
          <img src="https://cdn-images-1.medium.com/max/1600/1*7rG4-5l7pCggislvU2RTbQ.jpeg"
            >
        </v-avatar>
        <v-card-title>
          <div>
            <h1>{{ myprofile.full_name }}</h1>
            <h3>{{ myprofile.username }}</h3>
            <p>Total questions : {{ myQuestions.length }}</p>
            <p>Total answers : {{ myAnswers.length }}</p>
          </div>
        </v-card-title>
      </v-card>
      <v-layout row wrap>
        <v-flex col xs12 sm6>
          <h3>All Questions</h3>
          <homeBox v-for="item in myQuestions" :key="item._id"
            :item="item"></homeBox>
        </v-flex>
        <v-flex xs12 sm6>
          <h3>All Answers</h3>
          <homeBox v-for="item in myAnswers" :key="item._id"
            :item="item"></homeBox>
        </v-flex>
      </v-layout>
    </v-layout>
</template>

<script>
import axios from 'axios'
import homeBox from '@/components/homeBox.vue'

export default {
  name: 'profile',
  components: {
    homeBox
  },
  data () {
    return {
      myprofile: {},
      myQuestions: [],
      myAnswers: []
    }
  },
  created () {
    let promiseAnswer = axios({
      method: 'GET',
      url: `${this.$store.state.url_server}/answers/users/${this.$route.params.id}`
    })
    let promiseQuestion = axios({
      method: 'GET',
      url: `${this.$store.state.url_server}/questions/users/${this.$route.params.id}`
    })
    Promise.all([promiseAnswer, promiseQuestion])
      .then((values) => {
        this.myAnswers = values[0].data
        this.myQuestions = values[1].data
        this.myprofile = this.myQuestions[0].user_id
      })
      .catch(err => console.log(err))
  }
}
</script>

<style>

</style>
