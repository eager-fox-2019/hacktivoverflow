<template>
  <div class="home">
    <NavBar/>
    <b-container class="bv-example-row">
      <b-row class="text-center">
        <b-col></b-col>
        <b-col cols="10">
          <ListQuestion v-for="question in questions" :key="question._id" :question="question"/>
        </b-col>
        <b-col></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import ListQuestion from '@/components/ListQuestion.vue'
import { mapState } from 'vuex'

export default {
  name: 'home',
  components: {
    NavBar,
    ListQuestion
  },
  computed: {
    ...mapState(['questions'])
  },
  mounted () {
    this.$store.dispatch('GET_QUESTION')
  },
  methods: {
    answering (question) {
      // this.$store.router
    }
  }
}
</script>
