<template>
<v-card hover>
  <v-layout row fill-height>
    <!-- Button Vote -->
    <v-flex xs2 sm1 class="grey lighten-2">
      <v-layout col wrap align-end justify-start fill-height>
        <v-flex>
          <v-layout column wrap align-center justify-center>
            <h2>{{ item.upvotes.length - item.downvotes.length }}</h2>
            <h5>votes</h5>
          </v-layout>
        </v-flex>
        <v-flex xs12 v-if="item.answers">
          <v-layout column wrap align-center justify-center fill-height>
            <h2>{{ item.answers.length }}</h2>
            <h5>answers</h5>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-flex>
    <!-- Content -->
    <v-flex xs8 sm10>
      <v-container>
        <v-layout row wrap fill-height>
          <v-flex xs12 @click="toQuestion(item._id)">
            <h2>{{ item.title }}</h2>
          </v-flex>
          <v-flex xs12 @click="toQuestion(item._id)">
            {{ item.content }}
          </v-flex>
          <v-flex xs12>
            <v-layout pa-2 column
              wrap fill-height align-end justify-start
              class="blue lighten-4">
              <v-btn :to="'/profile/' + item.user_id._id">
                By {{ item.user_id.username }}
                </v-btn>
              <span>{{ createdDate }}</span>
              <span>{{ momentAgo }}</span>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
    <!-- Button Action -->
    <v-flex xs2 sm1>
      <v-layout column align-center justify-center fill-height>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              v-if='boxOwner'
              v-on="on"
              fab small
              ripple @click="deleteItem(item._id)">
              <v-icon>fas fa-trash-alt</v-icon>
            </v-btn>
          </template>
          <span>Delete</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              v-if='boxOwner'
              v-on="on"
              fab small
              ripple @click="showAddEdit(item)">
              <v-icon>edit</v-icon>
            </v-btn>
          </template>
          <span>Edit</span>
        </v-tooltip>
      </v-layout>
    </v-flex>
  </v-layout>
</v-card>
</template>

<script>
import moment from 'moment'

export default {
  props: ['item'],
  data () {
    return {
      boxOwner: false
    }
  },
  methods: {
    toQuestion (val) {
      // this.$store.dispatch('getQuestionDetail', val)
      this.$router.push(`/questions/${val}`)
    },
    deleteItem (val) {
      this.$store.dispatch('deleteQuestionAnswer', { type: 'questions', val })
    },
    showAddEdit (val) {
      this.$store.commit('setAddEditDialog', { show: true, type: 'questions', val })
    }
  },
  created () {
    if (this.item.user_id._id === this.$store.state.loginUser.id) {
      this.boxOwner = true
    }
  },
  watch: {
    '$store.state.loginUser' () {
      if (this.item.user_id._id === this.$store.state.loginUser.id) {
        this.boxOwner = true
      }
    }
  },
  computed: {
    createdDate () {
      return moment(this.item.createdAt).format('ddd, MMMM Do YYYY')
    },
    momentAgo () {
      return moment(this.item.createdAt).fromNow()
    }
  }
}
</script>

<style>

</style>
