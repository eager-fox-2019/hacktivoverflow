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
  props: ['typeform', 'type'],
  methods: {
    onSubmit () {
      if ((this.type === 'answer') && (this.typeform === 'add')) {
        this.form.question = this.questionShowed._id
        const { dispatch } = this.$store
        let addform = {
          question: this.questionShowed._id,
          ...this.form
        }
        dispatch('ADD_ANSWER', addform)
          .then(({ data }) => {
            let ans = this.questionShowed.answer
            ans.push(data._id)
            console.log("thap 1")
            return dispatch('UPDATE_DETAILED_QUESTION', {
              id: this.questionShowed._id,
              answer: ans
            })
          })
          .then(({ data }) => {
            console.log("thap 2")
            dispatch('GET_A_QUESTION', this.questionShowed._id)
            this.$bvModal.hide('modal-scrollable-add')
            this.$swal({
              type: 'success',
              title: 'Answer added!'
            })
          })
          .catch(e => {
            console.log(e.response.data.message)
            let arr = e.response.data.message.split(':')
            this.$swal({
              type: 'error',
              title: 'Failed to add answer!',
              text: `${arr[arr.length - 1]} \nPlease try again!`
            })
          })
      } else if ((this.type === 'answer') && (this.typeform === 'edit')) {
        const { dispatch } = this.$store
        dispatch('EDIT_ANSWER', this.form)
          .then(({ data }) => {
            this.$bvModal.hide('modal-scrollable-edit')
            this.$swal({
              type: 'success',
              title: 'Answer updated!'
            })
            dispatch('GET_A_QUESTION', this.questionShowed._id)
          })
          .catch(e => {
            console.log(e.response.data.message)
            let arr = e.response.data.message.split(':')
            this.$swal({
              type: 'error',
              title: 'Failed to update answer!',
              text: `${arr[arr.length - 1]} \nPlease try again!`
            })
          })
      } else if ((this.type === 'question') && (this.typeform === 'add')) {
        const { dispatch } = this.$store
        dispatch('ADD_QUESTION', this.form)
          .then(() => {
            this.$bvModal.hide('modal-scrollable-add-question')
            dispatch('GET_QUESTION')
            this.$swal({
              type: 'success',
              title: 'Question added!'
            })
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
      } else if ((this.type === 'question') && (this.typeform === 'edit')) {
        const { dispatch } = this.$store
        dispatch('EDIT_QUESTION', this.form)
          .then(({ data }) => {
            this.$bvModal.hide('modal-scrollable-edit')
            dispatch('GET_QUESTION')
            this.$swal({
              type: 'success',
              title: 'Question updated!'
            })
          })
          .catch(e => {
            console.log(e.response.data.message)
            let arr = e.response.data.message.split(':')
            this.$swal({
              type: 'error',
              title: 'Failed to update question!',
              text: `${arr[arr.length - 1]} \nPlease try again!`
            })
          })
      }
    }
  },
  computed: {
    ...mapState(['questionShowed', 'answerShowed']),
    form () {
      return (this.typeform === 'edit') ? ((this.type === 'question') ? this.questionShowed : this.answerShowed) : {}
    }
  }
}
</script>
