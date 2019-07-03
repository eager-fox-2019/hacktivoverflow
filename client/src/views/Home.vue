<template>
  <div class="home">
    <NavBar/>
    <b-container class="bv-example-row">
      <b-row class="text-center">
        <b-col></b-col>
        <b-col cols="10">
          <CardList v-for="question in questions" :key="question._id" :inside="question" :type="'question'" />
        </b-col>
        <b-col></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import CardList from '@/components/CardList.vue'
import { mapState } from 'vuex'

export default {
  name: 'home',
  components: {
    NavBar,
    CardList
  },
  computed: {
    ...mapState(['questions'])
  },
  methods: {
    answering (question) {
      // this.$store.router
    }
  }
}
</script>
