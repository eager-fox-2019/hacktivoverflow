<template>
  <form class="form-question center" @submit.prevent="formSubmit">
    <div class="form-group">
      <label>Title</label>
      <b-form-input type="text" class="form-control" v-model="question.title" placeholder="Question Title" required></b-form-input>
    </div>

    <div class="form-group">
      <label>Description</label>
      <b-form-textarea v-model="question.desc" rows="6" max-rows="10" placeholder="Question Detail" required></b-form-textarea>
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
      question: {
        title: '',
        desc: ''
      }
    }
  },
  created () {
    if (this.type === 'edit') {
      this.$store.commit('SELECT_QUESTION', this.$route.params.id)
    }
  },
  mounted () {
    if (this.type === 'edit') {
      this.question.title = this.$store.state.selectedQuestion.title
      this.question.desc = this.$store.state.selectedQuestion.desc
    }
  },
  methods: {
    formSubmit () {
      if (this.type === 'create') {
        this.$store.dispatch('questionCreate', this.question)
          .then((result) => {
            return this.$store.dispatch('getAllQuestion')
          })
          .then(({ data }) => {
            this.$swal({
              type: 'success',
              title: 'Question successfully posted to the forum!',
              showConfirmButton: false,
              timer: 3000
            })
            this.$store.commit('ALL_QUESTION', data)
            this.$store.commit('FILTER_NONE')
            this.question.title = ''
            this.question.desc = ''
            this.$router.push('/')
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
        this.$store.dispatch('questionUpdateDetail', this.question)
          .then((result) => {
            return this.$store.dispatch('getAllQuestion')
          })
          .then(({ data }) => {
            this.$swal({
              type: 'success',
              title: 'Question successfully updated!',
              showConfirmButton: false,
              timer: 3000
            })
            this.$store.commit('ALL_QUESTION', data)
            this.$store.commit('FILTER_NONE')
            this.question.title = ''
            this.question.desc = ''
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
