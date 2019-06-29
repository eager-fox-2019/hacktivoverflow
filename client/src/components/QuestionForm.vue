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
  data () {
    return {
      question: {
        title: '',
        desc: ''
      }
    }
  },
  methods: {
    formSubmit () {
      this.$store.dispatch('questionCreate', this.question)
        .then((result) => {
          this.$swal({
            type: 'success',
            title: 'Question successfully posted to the forum!',
            showConfirmButton: false,
            timer: 3000
          })
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
</script>

<style>

</style>
