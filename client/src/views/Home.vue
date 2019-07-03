<template>
  <v-container>
    <v-layout row wrap align-center justify-center fill-height>
      <v-btn @click="showAddEdit">Ask a question</v-btn>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 lg8 offset-lg2>
        <v-list three-line v-if="$store.state.loginUser.id">
          <homeBox v-for="item in $store.state.questions"
            :key="item._id" :item="item"></homeBox>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import homeBox from '@/components/homeBox.vue'

export default {
  name: 'home',
  components: {
    homeBox
  },
  data () {
    return {
      //
    }
  },
  methods: {
    showAddEdit () {
      this.$store.commit('setAddEditDialog', { show: true, type: 'questions' })
    }
  },
  created () {
    this.$store.dispatch('getQuestions')
  }
}
</script>
