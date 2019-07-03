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
    // if ((this.typeform === 'add') && (this.type === 'answer')) {
    //     console.log("ADD ANSWER")
    return {
      form: {
        title: '',
        description: '',
        question: ''
      }
    }
    // } else {
    //   return {
    //     form: {
    //       title: '',
    //       description: ''
    //     }
    //   }
    // }
  },
  props: ['typeform', 'type'],
  methods: {
    clearForm () {
      this.form.title = ''
      this.form.description = ''
      if ((this.typeform === 'add') && (this.type === 'answer')) {
        this.form.question = ''
      }
    },
    onSubmit () {
      if ((this.type === 'answer') && (this.typeform === 'add')) {
        this.form.question = this.questionShowed._id
        const { dispatch } = this.$store
        dispatch('ADD_ANSWER', this.form)
          .then(({ data }) => {
            let ans = this.questionShowed.answer
            ans.push(data._id)
            console.log('Setelah berhasil add answer')
            return dispatch('UPDATE_DETAILED_QUESTION', {
              id: this.questionShowed._id,
              answer: ans
            })
          })
          .then(({ data }) => {
            console.log('Setelah berhasil update yang question')
            this.$swal({
              type: 'success',
              title: 'Answer added!'
            })
            dispatch('GET_A_QUESTION', this.questionShowed._id)
            this.$router.push(`/question/${this.questionShowed._id}`)
            this.clearForm()
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
        console.log('masuk edit answer')
        const { dispatch } = this.$store
        dispatch('EDIT_ANSWER', this.form)
          .then(({ data }) => {
            this.$swal({
              type: 'success',
              title: 'Answer updated!'
            })
            dispatch('GET_A_QUESTION', this.questionShowed._id)
            this.clearForm()
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
            dispatch('GET_QUESTION')
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
      } else if ((this.type === 'question') && (this.typeform === 'edit')) {
        const { dispatch } = this.$store
        dispatch('EDIT_QUESTION', this.form)
          .then(({ data }) => {
            this.$swal({
              type: 'success',
              title: 'Question updated!'
            })
            this.clearForm()
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
  created () {
    console.log(this.type)
    console.log(this.typeform)
    // if ((this.typeform === 'edit') && (this.type === 'answer')) {
    //   this.$store.dispatch('GET_AN_ANSWER', this.$route.params.answerId)
    //   this.form.title = this.$store.state.answerShowed.title
    //   this.form.description = this.$store.state.answerShowed.description
    // } else {
    //   this.$store.dispatch('GET_A_QUESTION', this.$route.params.questionId)
    //   if (this.typeform === 'edit') {
    //     this.form.title = this.$store.state.questionShowed.title
    //     this.form.description = this.$store.state.questionShowed.description
    //   }
    // }
  },
  computed: {
    ...mapState(['questionShowed', 'answerShowed'])
    // computedForm: function () {
    //     if (this.typeform === 'edit'){
    //         if (this.type === 'answer'){
    //             return this.$store.dispatch('GET_AN_ANSWER', this.$route.params.answerId)
    //         } else if (this.type === 'question'){
    //             return this.$store.dispatch('GET_A_QUESTION', this.$route.params.questionId)
    //         }
    //     }
    // }
  }
}
</script>
