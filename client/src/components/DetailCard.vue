<template>
  <div>
    <h2 v-if="type == 'question'" style="text-align: left" class="p-3">Question Title: {{detail.title}}</h2>
    <div class="d-flex flex-row" style="border-bottom: 1px solid grey; border-top: 1px solid grey">
      <div class="sides-info d-flex flex-column col-1 justify-content-center p-3" style="border-right: 1px solid grey">
        <div>
          <b-btn @click="upvote(detail._id)" :class="{ 'activate' : (active === 'upvote'), 'normal' : (active != 'upvote')}" variant="outline-light"><i class="far fa-thumbs-up"></i></b-btn>
        </div>
        <div>
          <h4 class="p-2">{{totalVote}}</h4>
        </div>
        <div>
          <b-btn @click="downvote(detail._id)" :class="{ 'activate' : (active === 'downvote') , 'normal' : (active != 'downvote') }" variant="outline-light"><i class="far fa-thumbs-down"></i></b-btn>
        </div>
      </div>
      <div class="detail-info col d-flex flex-column justify-content-between p-3" style="text-align: left">
        <div>
          <p v-if="type == 'answer'" style="text-align: left">Title: {{detail.title}}</p>
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
            <b-btn variant="danger" @click="deleted(detail._id)">Delete</b-btn>
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
      this.$store.dispatch('getAllQuestion')
        .then(({ data }) => {
          this.$store.commit('ALL_QUESTION', data)
          this.$store.commit('FILTER_NONE')
          this.$store.commit('SELECT_QUESTION', this.$route.params.id)
        })
        .catch(err => {
          console.log(err)
          if (!err.response) {
            this.$swal({
              type: 'error',
              title: `Connection to Server Error`,
              showConfirmButton: true
            })
          } else {
            this.$swal({
              type: 'error',
              title: `${err.response.data.message}`,
              showConfirmButton: true
            })
          }
        })
    }
    let upvoteIds = []
    let downvoteIds = []
    for (let i = 0; i < this.detail.upvote.length; i++) {
      upvoteIds.push(this.detail.upvote[i])
    }
    for (let i = 0; i < this.detail.downvote.length; i++) {
      downvoteIds.push(this.detail.downvote[i])
    }
    if (upvoteIds.includes(this.$store.state.user.id)) {
      this.active = 'upvote'
    } else if (downvoteIds.includes(this.$store.state.user.id)) {
      this.active = 'downvote'
    } else {
      this.active = ''
    }
  },
  computed: {
    totalVote: function () {
      return this.detail.upvote.length - this.detail.downvote.length
    }
  },
  methods: {
    upvote (id) {
      if (!localStorage.getItem('token')) {
        this.$router.push('/login')
      } else {
        let upvoteIds = []
        let downvoteIds = []
        let upvoted = false
        for (let i = 0; i < this.detail.upvote.length; i++) {
          upvoteIds.push(this.detail.upvote[i])
        }
        for (let i = 0; i < this.detail.downvote.length; i++) {
          downvoteIds.push(this.detail.downvote[i])
        }
        if (this.type === 'question') {
          if (!upvoteIds.includes(this.$store.state.user.id)) {
            if (!downvoteIds.includes(this.$store.state.user.id)) {
              upvoteIds.push(this.$store.state.user.id)
              upvoted = true
            } else {
              let index = downvoteIds.indexOf(this.$store.state.user.id)
              downvoteIds.splice(index, 1)
            }
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
                if (upvoted) {
                  this.active = 'upvote'
                } else {
                  this.active = ''
                }
              })
              .catch(err => {
                console.log(err)
                if (!err.response) {
                  this.$swal({
                    type: 'error',
                    title: `Connection to Server Error`,
                    showConfirmButton: true
                  })
                } else {
                  this.$swal({
                    type: 'error',
                    title: `${err.response.data.message}`,
                    showConfirmButton: true
                  })
                }
              })
          }
        } else {
          this.$store.commit('SELECT_ANSWER', id)
          if (!upvoteIds.includes(this.$store.state.user.id)) {
            if (!downvoteIds.includes(this.$store.state.user.id)) {
              upvoteIds.push(this.$store.state.user.id)
              upvoted = true
            } else {
              let index = downvoteIds.indexOf(this.$store.state.user.id)
              downvoteIds.splice(index, 1)
            }
            let payload = {
              upvote: upvoteIds,
              downvote: downvoteIds
            }
            this.$store.dispatch('answerUpdateNonDetail', payload)
              .then(result => {
                return this.$store.dispatch('getAllQuestion')
              })
              .then(({ data }) => {
                this.$store.commit('ALL_QUESTION', data)
                this.$store.commit('FILTER_NONE')
                this.$store.commit('SELECT_QUESTION', this.$route.params.id)
                return this.$store.dispatch('getAllAnswer')
              })
              .then(result => {
                let answers = []
                for (let i = 0; i < result.length; i++) {
                  answers.push(result[i].data)
                }
                this.$store.commit('ALL_SELECTED_ANSWER', answers)
                if (upvoted) {
                  this.active = 'upvote'
                } else {
                  this.active = ''
                }
              })
              .catch(err => {
                console.log(err)
                if (!err.response) {
                  this.$swal({
                    type: 'error',
                    title: `Connection to Server Error`,
                    showConfirmButton: true
                  })
                } else {
                  this.$swal({
                    type: 'error',
                    title: `${err.response.data.message}`,
                    showConfirmButton: true
                  })
                }
              })
          }
        }
      }
    },
    downvote (id) {
      if (!localStorage.getItem('token')) {
        this.$router.push('/login')
      } else {
        let upvoteIds = []
        let downvoteIds = []
        let downvoted = false
        for (let i = 0; i < this.detail.upvote.length; i++) {
          upvoteIds.push(this.detail.upvote[i])
        }
        for (let i = 0; i < this.detail.downvote.length; i++) {
          downvoteIds.push(this.detail.downvote[i])
        }
        if (this.type === 'question') {
          if (!downvoteIds.includes(this.$store.state.user.id)) {
            if (!upvoteIds.includes(this.$store.state.user.id)) {
              downvoteIds.push(this.$store.state.user.id)
              downvoted = true
            } else {
              let index = upvoteIds.indexOf(this.$store.state.user.id)
              upvoteIds.splice(index, 1)
            }
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
                if (downvoted) {
                  this.active = 'downvote'
                } else {
                  this.active = ''
                }
              })
              .catch(err => {
                console.log(err)
                if (!err.response) {
                  this.$swal({
                    type: 'error',
                    title: `Connection to Server Error`,
                    showConfirmButton: true
                  })
                } else {
                  this.$swal({
                    type: 'error',
                    title: `${err.response.data.message}`,
                    showConfirmButton: true
                  })
                }
              })
          }
        } else {
          this.$store.commit('SELECT_ANSWER', id)
          if (!downvoteIds.includes(this.$store.state.user.id)) {
            if (!upvoteIds.includes(this.$store.state.user.id)) {
              downvoteIds.push(this.$store.state.user.id)
              downvoted = true
            } else {
              let index = upvoteIds.indexOf(this.$store.state.user.id)
              upvoteIds.splice(index, 1)
            }
            let payload = {
              upvote: upvoteIds,
              downvote: downvoteIds
            }
            this.$store.dispatch('answerUpdateNonDetail', payload)
              .then(result => {
                return this.$store.dispatch('getAllQuestion')
              })
              .then(({ data }) => {
                this.$store.commit('ALL_QUESTION', data)
                this.$store.commit('FILTER_NONE')
                this.$store.commit('SELECT_QUESTION', this.$route.params.id)
                return this.$store.dispatch('getAllAnswer')
              })
              .then(result => {
                let answers = []
                for (let i = 0; i < result.length; i++) {
                  answers.push(result[i].data)
                }
                this.$store.commit('ALL_SELECTED_ANSWER', answers)
                if (downvoted) {
                  this.active = 'downvote'
                } else {
                  this.active = ''
                }
              })
              .catch(err => {
                console.log(err)
                if (!err.response) {
                  this.$swal({
                    type: 'error',
                    title: `Connection to Server Error`,
                    showConfirmButton: true
                  })
                } else {
                  this.$swal({
                    type: 'error',
                    title: `${err.response.data.message}`,
                    showConfirmButton: true
                  })
                }
              })
          }
        }
      }
    },
    deleted (id) {
      if (this.type === 'question') {
        this.$swal({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        })
          .then((result) => {
            return this.$store.dispatch('deleteQuestion', id)
          })
          .then(result => {
            if (result.value) {
              this.$swal(
                'Deleted!',
                'Your question has been deleted.',
                'success'
              )
            }
            return this.$store.dispatch('getAllQuestion')
          })
          .then(({ data }) => {
            this.$store.commit('ALL_QUESTION', data)
            this.$store.commit('FILTER_NONE')
            this.$router.push('/')
          })
          .catch(err => {
            console.log(err)
            if (!err.response) {
              this.$swal({
                type: 'error',
                title: `Connection to Server Error`,
                showConfirmButton: true
              })
            } else {
              this.$swal({
                type: 'error',
                title: `${err.response.data.message}`,
                showConfirmButton: true
              })
            }
          })
      } else {
        this.$swal({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        })
          .then((result) => {
            return this.$store.dispatch('deleteAnswer', id)
          })
          .then(result => {
            if (result.value) {
              this.$swal(
                'Deleted!',
                'Your answer has been deleted.',
                'success'
              )
            }
            this.$store.commit('SELECT_QUESTION', this.$route.params.id)
            let answer = this.detail.answer
            let index = answer.indexOf(id)
            answer.splice(index, 1)
            let payload = {
              answer: answer
            }
            return this.$store.dispatch('questionUpdateNonDetail', payload)
          })
          .then(result => {
            return this.$store.dispatch('getAllQuestion')
          })
          .then(({ data }) => {
            this.$store.commit('ALL_QUESTION', data)
            this.$store.commit('FILTER_NONE')
            this.$store.commit('SELECT_QUESTION', this.$route.params.id)
            return this.$store.dispatch('getAllAnswer')
          })
          .then(result => {
            let answers = []
            for (let i = 0; i < result.length; i++) {
              answers.push(result[i].data)
            }
            this.$store.commit('ALL_SELECTED_ANSWER', answers)
          })
          .catch(err => {
            console.log(err)
            if (!err.response) {
              this.$swal({
                type: 'error',
                title: `Connection to Server Error`,
                showConfirmButton: true
              })
            } else {
              this.$swal({
                type: 'error',
                title: `${err.response.data.message}`,
                showConfirmButton: true
              })
            }
          })
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
