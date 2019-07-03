<template>
  <div>
    <b-form @submit.prevent="onSubmit">
      <b-form-group class="w-50 mx-auto"
        id="input-group-1"
        label="Title:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.title"
          type="text"
          required
          placeholder="Enter title"
        ></b-form-input>
      </b-form-group>

        <b-form-textarea
        id="textarea"
        class="w-50 mx-auto"
        v-model="form.description"
        placeholder="Enter description"
        rows="3"
        max-rows="6"
        ></b-form-textarea>

      <br><b-button type="submit" variant="primary">Submit</b-button><br><br>

    </b-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        title: '',
        description: ''
      }
    }
  },
  methods: {
    clearForm () {
      this.form.title = ''
      this.form.description = ''
    },
    onSubmit () {
      const { dispatch } = this.$store
      dispatch('ADD_QUESTION', this.form)
        .then(() => {
          this.$swal({
            type: 'success',
            title: 'Question added!'
          })
          this.$router.push('/')
          this.clearForm()
        })
        .catch(e => {
          console.log(e.response.data.message)
          let arr = e.response.data.message.split(':')
          this.$swal({
            type: 'error',
            title: 'Failed to add question!',
            text: `${arr[arr.length - 1]} \nPlease try again!`
          })
        })
    }
  }
}
</script>
