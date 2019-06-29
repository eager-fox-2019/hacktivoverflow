<template>
  <form class="form-answer center" @submit.prevent="formSubmit">
    <div class="form-group">
      <label>Title</label>
      <b-form-input type="text" class="form-control" v-model="answer.title" placeholder="Answer Title" required></b-form-input>
    </div>

    <div class="form-group">
      <label>Description</label>
      <b-form-textarea v-model="answer.desc" rows="6" max-rows="10" placeholder="Answer Detail" required></b-form-textarea>
    </div>

    <div class="col text-center" >
      <button type="submit" class="btn btn-success center">Submit</button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    type: String
  },
  data () {
    return {
      answer: {
        title: '',
        desc: ''
      }
    }
  },
  created () {
    this.$store.commit('SELECT_QUESTION', this.$route.params.id)
    if (this.type === 'edit') {
      this.$store.dispatch('getAllAnswer')
        .then(result => {
          let answers = []
          for (let i = 0; i < result.length; i++) {
            answers.push(result[i].data)
          }
          this.$store.commit('ALL_SELECTED_ANSWER', answers)
          this.$store.commit('SELECT_ANSWER', this.$route.params.answerId)
          this.answer.title = this.$store.state.selectedAnswer.title
          this.answer.desc = this.$store.state.selectedAnswer.desc
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted () {
    if (this.type === 'edit') {
      this.answer.title = this.$store.state.selectedAnswer.title
      this.answer.desc = this.$store.state.selectedAnswer.desc
    }
  },
  methods: {
    formSubmit () {
      if (this.type === 'create') {
        this.$store.dispatch('answerCreate', this.answer)
          .then(({
            data
          }) => {
            let answer = []
            for (let i = 0; i < this.$store.state.selectedQuestion.answer.length; i++) {
              answer.push(this.$store.state.selectedQuestion.answer[i])
            }
            answer.push(data._id)
            let payload = {
              answer: answer
            }
            return this.$store.dispatch('questionUpdateNonDetail', payload)
          })
          .then((result) => {
            return this.$store.dispatch('getAllQuestion')
          })
          .then(({
            data
          }) => {
            this.$swal({
              type: 'success',
              title: 'Answer successfully added to the forum!',
              showConfirmButton: false,
              timer: 3000
            })
            this.$store.commit('ALL_QUESTION', data)
            this.$store.commit('FILTER_NONE')
            this.$store.commit('SELECT_QUESTION', this.$route.params.id)
            this.answer.title = ''
            this.answer.desc = ''
            return this.$store.dispatch('getAllAnswer')
          })
          .then(result => {
            let answers = []
            for (let i = 0; i < result.length; i++) {
              answers.push(result[i].data)
            }
            this.$store.commit('ALL_SELECTED_ANSWER', answers)
            this.$router.push(`/question/${this.$route.params.id}`)
          })
          .catch((err) => {
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
      } else if (this.type === 'edit') {
        this.$store.dispatch('answerUpdateDetail', this.answer)
          .then(result => {
            this.$swal({
              type: 'success',
              title: 'Answer successfully updated!',
              showConfirmButton: false,
              timer: 3000
            })
            this.$store.commit('SELECT_QUESTION', this.$route.params.id)
            this.answer.title = ''
            this.answer.desc = ''
            return this.$store.dispatch('getAllAnswer')
          })
          .then(result => {
            let answers = []
            for (let i = 0; i < result.length; i++) {
              answers.push(result[i].data)
            }
            this.$store.commit('ALL_SELECTED_ANSWER', answers)
            this.$router.push(`/question/${this.$route.params.id}`)
          })
          .catch((err) => {
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

</style>
