<template>
  <div class>
    <div class="row">
      <div class="col s12 m12">
        <div class="card grey darken-3">
          <div class="card-action">
            <router-link :to="'/'">HOME</router-link>
          </div>
          <div class="card-action">
            <router-link :to="'/myquestions'">MY QUESTIONS</router-link>
          </div>
          <div class="card-action">
            <router-link :to="'/askquestion'">ASK QUESTION</router-link>
          </div>
          <div class="card-action">
            <router-link :to="'/tags'">TAGS</router-link>
          </div>
          <div class="card-action">
            <router-link :to="'/users'">USERS</router-link>
          </div>
          <div class="card-action">
            <router-link :to="'/detail'">DETAIL</router-link>
          </div>
          <div v-if="isLogin" class="card-action">
            <a @click="logout">LOGOUT</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState([
      'isLogin',
    ])
  },
  methods: {
    logout () {
      this.$store.commit('USER_LOGOUT_MUTATION')
      this.$router.push('/')
    }
  },
};
</script>

<style>
</style>
