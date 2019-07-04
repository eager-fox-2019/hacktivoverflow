<template>
    <div v-if="inside">
        <b-button-group vertical>
                <b-button v-if="$store.state.isLogin" :class="{ active: upvoted }" @click="upvote(inside)"><img src='@/assets/up-arrow.png' style="width:25px; height:25px"></b-button>
                <b-button disabled>{{ totalvote }}
                  <p style="font-size:12px">vote(s)</p>
                  <div v-if="(type === 'question')">
                    {{ inside.answer.length }}
                    <p style="font-size:12px">answer(s)</p>
                  </div>
                  </b-button>
                <b-button v-if="$store.state.isLogin" :class="{ active: downvoted }" @click="downvote(inside)"><img src='@/assets/down-arrow.png' style="width:25px; height:25px"></b-button>
        </b-button-group>
    </div>
</template>

<script>
export default {
  props: ['inside', 'type'],
  methods: {
    upvote (inside) {
      let upvotesArr = this.inside.upvotes
      let downvotesArr = this.inside.downvotes
      let updateObj = {}
      let foundUp = upvotesArr.indexOf(localStorage.getItem('id'))
      if (foundUp !== -1) {
        upvotesArr.splice(foundUp, 1)
      } else {
        upvotesArr.push(localStorage.getItem('id'))
        let foundDown = downvotesArr.indexOf(localStorage.getItem('id'))
        if (foundDown !== -1) {
          downvotesArr.splice(foundDown, 1)
          updateObj['downvotes'] = downvotesArr
        }
      }
      updateObj['upvotes'] = upvotesArr
      updateObj['id'] = this.inside._id
      if (this.type === 'question') {
        this.$store.dispatch('UPDATE_DETAILED_QUESTION', updateObj)
          .then(({ data }) => {
            this.$store.dispatch('GET_QUESTION')
          })
          .catch(e => {
            console.log(e.response)
          })
      } else if (this.type === 'answer') {
        this.$store.dispatch('UPDATE_DETAILED_ANSWER', updateObj)
          .then(({ data }) => {
            this.$store.dispatch('GET_A_QUESTION', data.question)
          })
          .catch(e => {
            console.log(e.response)
          })
      }
    },
    downvote (inside) {
      let downvotesArr = this.inside.downvotes
      let upvotesArr = this.inside.upvotes
      let updateObj = {}
      let foundDown = downvotesArr.indexOf(localStorage.getItem('id'))
      if (foundDown !== -1) {
        downvotesArr.splice(foundDown, 1)
      } else {
        downvotesArr.push(localStorage.getItem('id'))
        let foundUp = upvotesArr.indexOf(localStorage.getItem('id'))
        if (foundUp !== -1) {
          upvotesArr.splice(foundUp, 1)
          updateObj['upvotes'] = upvotesArr
        }
      }
      updateObj['downvotes'] = downvotesArr
      updateObj['id'] = this.inside._id
      if (this.type === 'question') {
        this.$store.dispatch('UPDATE_DETAILED_QUESTION', updateObj)
          .then(({ data }) => {
            this.$store.dispatch('GET_QUESTION')
          })
          .catch(e => {
            console.log(e.response)
          })
      } else if (this.type === 'answer') {
        this.$store.dispatch('UPDATE_DETAILED_ANSWER', updateObj)
          .then(({ data }) => {
            this.$store.dispatch('GET_A_QUESTION', data.question)
          })
          .catch(e => {
            console.log(e.response)
          })
      }
    }
  },
  computed: {
    totalvote: function () {
      if (!this.inside || !this.inside.upvotes || !this.inside.downvotes) return 0
      return this.inside.upvotes.length - this.inside.downvotes.length
    },
    upvoted: function () {
      if (!this.inside || !this.inside.upvotes) return false
      return this.inside.upvotes.filter(id => id === localStorage.getItem('id')).length !== 0
    },
    downvoted: function () {
      if (!this.inside || !this.inside.downvotes) return false
      return this.inside.downvotes.filter(id => id === localStorage.getItem('id')).length !== 0
    }
  }
}
</script>
