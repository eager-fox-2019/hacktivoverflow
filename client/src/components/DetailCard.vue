<template>
  <div>
    <h2 v-if="type == 'question'" style="text-align: left" class="p-3">Question Title: {{detail.title}}</h2>
    <div class="d-flex flex-row" style="border-bottom: 1px solid grey; border-top: 1px solid grey">
      <div class="sides-info d-flex flex-column col-1 justify-content-center p-3" style="border-right: 1px solid grey">
        <div>
          <b-btn @click="upvote" :class="{ 'activate' : (active === 'upvote'), 'normal' : (active != 'upvote')}" variant="outline-light"><i class="far fa-thumbs-up"></i></b-btn>
        </div>
        <div>
          <h4 class="p-2">{{totalVote}}</h4>
        </div>
        <div>
          <b-btn @click="downvote" :class="{ 'activate' : (active === 'downvote') , 'normal' : (active != 'downvote') }" variant="outline-light"><i class="far fa-thumbs-down"></i></b-btn>
        </div>
      </div>
      <div class="detail-info col d-flex flex-column justify-content-between p-3" style="text-align: left">
        <div>
          <p>Description: {{detail.desc}}</p>
        </div>
        <div>
          <div v-if="type == 'question'">
            <p v-if="detail.user.email != $store.state.user.email" style="margin: 0">Asked by: {{detail.user.name}}</p>
            <p v-else style="margin: 0">Asked by: You</p>
          </div>
          <div v-if="type == 'answer'">
            <p v-if="detail.user.email != $store.state.user.email" style="margin: 0">Answer by: {{detail.user.name}}</p>
            <p v-else style="margin: 0">Answer by: You</p>
          </div>
          <div v-if="detail.user.email == $store.state.user.email" class="mt-2">
            <b-btn variant="success" class="mr-2" v-if="type == 'question'" :to="`/question/${$route.params.id}/edit`">Edit</b-btn>
            <b-btn variant="success" class="mr-2" v-if="type == 'answer'" :to="`/question/${$route.params.id}/answer/edit/${detail._id}`">Edit</b-btn>
            <b-btn variant="danger">Delete</b-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    detail: Object,
    type: String,
    index: Number
  },
  data () {
    return {
      active: ''
    }
  },
  created () {
    if (this.type === 'question') {
      let upvoteIds = []
      let downvoteIds = []
      for (let i = 0; i < this.$store.state.selectedQuestion.upvote.length; i++) {
        upvoteIds.push(this.$store.state.selectedQuestion.upvote[i])
      }
      for (let i = 0; i < this.$store.state.selectedQuestion.downvote.length; i++) {
        downvoteIds.push(this.$store.state.selectedQuestion.downvote[i])
      }
      if (upvoteIds.includes(this.$store.state.user.id)) {
        this.active = 'upvote'
      } else if (downvoteIds.includes(this.$store.state.user.id)) {
        this.active = 'downvote'
      } else {
        this.active = ''
      }
    }
  },
  computed: {
    totalVote: function () {
      if (this.type === 'question') {
        return this.$store.state.selectedQuestion.upvote.length - this.$store.state.selectedQuestion.downvote.length
      } else {
        return this.$store.state.selectedQuestionAnswer[this.index].upvote.length - this.$store.state.selectedQuestionAnswer[this.index].downvote.length
      }
    }
  },
  methods: {
    upvote () {
      if (!localStorage.getItem('token')) {
        this.$router.push('/login')
      } else {
        if (this.type === 'question') {
          let upvoteIds = []
          let downvoteIds = []
          for (let i = 0; i < this.$store.state.selectedQuestion.upvote.length; i++) {
            upvoteIds.push(this.$store.state.selectedQuestion.upvote[i])
          }
          for (let i = 0; i < this.$store.state.selectedQuestion.downvote.length; i++) {
            downvoteIds.push(this.$store.state.selectedQuestion.downvote[i])
          }
          if (!upvoteIds.includes(this.$store.state.user.id)) {
            if (!downvoteIds.includes(this.$store.state.user.id)) {
              upvoteIds.push(this.$store.state.user.id)
              let payload = {
                upvote: upvoteIds,
                downvote: downvoteIds
              }
              this.$store.dispatch('questionUpdateNonDetail', payload)
                .then(result => {
                  return this.$store.dispatch('getAllQuestion')
                })
                .then(({ data }) => {
                  this.$store.commit('ALL_QUESTION', data)
                  this.$store.commit('FILTER_NONE')
                  this.$store.commit('SELECT_QUESTION', this.$route.params.id)
                  this.active = 'upvote'
                })
                .catch(err => {
                  console.log(err)
                })
            } else {
              let index = downvoteIds.indexOf(this.$store.state.user.id)
              downvoteIds.splice(index, 1)
              let payload = {
                upvote: upvoteIds,
                downvote: downvoteIds
              }
              this.$store.dispatch('questionUpdateNonDetail', payload)
                .then(result => {
                  return this.$store.dispatch('getAllQuestion')
                })
                .then(({ data }) => {
                  this.$store.commit('ALL_QUESTION', data)
                  this.$store.commit('FILTER_NONE')
                  this.$store.commit('SELECT_QUESTION', this.$route.params.id)
                  this.active = ''
                })
                .catch(err => {
                  console.log(err)
                })
            }
          }
        } else {
          // 
        }
      }
    },
    downvote () {
      if (!localStorage.getItem('token')) {
        this.$router.push('/login')
      } else {
        if (this.type === 'question') {
          let upvoteIds = []
          let downvoteIds = []
          for (let i = 0; i < this.$store.state.selectedQuestion.upvote.length; i++) {
            upvoteIds.push(this.$store.state.selectedQuestion.upvote[i])
          }
          for (let i = 0; i < this.$store.state.selectedQuestion.downvote.length; i++) {
            downvoteIds.push(this.$store.state.selectedQuestion.downvote[i])
          }
          if (!downvoteIds.includes(this.$store.state.user.id)) {
            if (!upvoteIds.includes(this.$store.state.user.id)) {
              downvoteIds.push(this.$store.state.user.id)
              let payload = {
                upvote: upvoteIds,
                downvote: downvoteIds
              }
              this.$store.dispatch('questionUpdateNonDetail', payload)
                .then(result => {
                  return this.$store.dispatch('getAllQuestion')
                })
                .then(({ data }) => {
                  this.$store.commit('ALL_QUESTION', data)
                  this.$store.commit('FILTER_NONE')
                  this.$store.commit('SELECT_QUESTION', this.$route.params.id)
                  this.active = 'downvote'
                })
                .catch(err => {
                  console.log(err)
                })
            } else {
              let index = upvoteIds.indexOf(this.$store.state.user.id)
              upvoteIds.splice(index, 1)
              let payload = {
                upvote: upvoteIds,
                downvote: downvoteIds
              }
              this.$store.dispatch('questionUpdateNonDetail', payload)
                .then(result => {
                  return this.$store.dispatch('getAllQuestion')
                })
                .then(({ data }) => {
                  this.$store.commit('ALL_QUESTION', data)
                  this.$store.commit('FILTER_NONE')
                  this.$store.commit('SELECT_QUESTION', this.$route.params.id)
                  this.active = ''
                })
                .catch(err => {
                  console.log(err)
                })
            }
          }
        } else {
          // 
        }
      }
    }
  }
}
</script>

<style>
.activate {
  color: blue;
}
.normal {
  color: black;
}
</style>
