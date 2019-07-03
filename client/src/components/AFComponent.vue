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

      <br><b-button type="submit" variant="primary">Submit</b-button><br>

    </b-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
      dispatch('ADD_ANSWER', this.form)
        .then(({ data }) => {
          let ans = this.questionShowed.answer
          ans.push(data._id)
          return dispatch('UPDATE_DETAILED_QUESTION', {
              id: this.questionShowed._id,
              answer: ans
            })
        })
        .then(({ data }) => {
          this.$swal({
            type: 'success',
            title: 'Answer added!'
          })
          this.$router.push(`/question/${this.questionShowed._id}`)
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
  },  
  created () {
      this.$store.dispatch('GET_A_QUESTION', this.$route.params.questionId)
  },
  computed: {
    ...mapState(['questionShowed'])
  }
}
</script>
