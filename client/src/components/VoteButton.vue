<template>
    <b-button-group vertical>
        <b-button v-if="$store.state.isLogin" :class="{ active: upvoted }" @click="upvote(que)">Up</b-button>
        <b-button disabled>{{ quevote }}</b-button>
        <b-button v-if="$store.state.isLogin" :class="{ active: downvoted }" @click="downvote(que)">Down</b-button>
    </b-button-group>
</template>

<script>
export default {
  props: ['que'],
  methods: {
    upvote (que) {
      let checkUp = false
      let upvotesArr = this.que.upvotes
      let updateObj = {}
      for (let i = 0; i < this.que.upvotes.length; i++) {
        if (this.que.upvotes[i] === localStorage.getItem('id')) {
          checkUp = true
          upvotesArr.splice(i, 1)
        }
      }
      if (!checkUp) {
        upvotesArr.push(localStorage.getItem('id'))
        let downvotesArr = this.que.downvotes
        for (let i = 0; i < this.que.downvotes.length; i++) {
          if (this.que.downvotes === localStorage.getItem('id')) {
            downvotesArr.splice(i, 1)
            updateObj['downvotes'] = downvotesArr
          }
        }
      }
      updateObj['upvotes'] = upvotesArr
      this.$store.dispatch('UPDATE_DETAILED_QUESTION', updateObj)
    },
    downvote (que) {
      let checkDown = false
      let downvotesArr = this.que.downvotes
      let updateObj = {}
      for (let i = 0; i < this.que.downvotes.length; i++) {
        if (this.que.downvotes[i] === localStorage.getItem('id')) {
          checkDown = true
          downvotesArr.splice(i, 1)
        }
      }
      if (!checkDown) {
        downvotesArr.push(localStorage.getItem('id'))
        let upvotesArr = this.que.upvotes
        for (let i = 0; i < this.que.upvotes.length; i++) {
          if (this.que.upvotes === localStorage.getItem('id')) {
            upvotesArr.splice(i, 1)
            updateObj['upvotes'] = upvotesArr
          }
        }
      }
      updateObj['downvotes'] = downvotesArr
      this.$store.dispatch('UPDATE_DETAILED_QUESTION', updateObj)
    }
  },
  computed: {
    quevote: function () {
      return this.que.upvotes.length - this.que.downvotes.length
    },
    upvoted: function () {
      return this.que.upvotes.filter(id => id === localStorage.getItem('id')).length !== 0
    },
    downvoted: function () {
      return this.que.downvotes.filter(id => id === localStorage.getItem('id')).length !== 0
    }
  }
}
</script>
