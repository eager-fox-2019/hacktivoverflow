<template>
  <div class="d-flex justify-content-center">
    <b-form class="formArea" @submit.prevent="onSubmit" @reset.prevent="onReset">
      <b-form-group id="input-title" label="Title:" label-for="title-1">
        <b-form-input id="title-1" v-model="form.title" required placeholder="Summary of the Answer"></b-form-input>
        <small>Make the title clear and concise</small>
      </b-form-group>

      <b-form-group id="input-description" label="Description:" label-for="desc-2">
        <b-form-textarea id="desc-2" v-model="form.description" required placeholder="Answer here" rows="3" max-rows="6"></b-form-textarea>
        <small>Be clear without being condescending</small>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Cancel</b-button>

    </b-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AnswerForm',
  props: ['questionId'],
  data () {
    return {
      form: {
        title: '',
        description: ''
      }
    }
  },
  methods: {
    toggleForm () {
      this.$emit('hideForm')
    },
    onSubmit () {
      let { state, commit, dispatch } = this.$store

      this.form.question = this.questionId

      dispatch('postAnswer', this.form)
        .then(({ data }) => {
          console.log({ submitAnswer: data })
          data.owner = state.user
          data.owner._id = state.user.id

          let tempArray = state.answerList
          tempArray.unshift(data)

          commit('UPDATECURRENTANSWERLIST', [])
          commit('UPDATECURRENTANSWERLIST', tempArray)

          console.log(data)
          this.onReset()
        })
        .catch(({ response }) => {
          console.log(response.data)
        })
    },
    onReset () {
      this.form.title = ''
      this.form.description = ''
      this.toggleForm()
    }
  }
}

</script>
<style scoped>
.formArea {
  color: #F7C331;
  background-color: #6B7A8F;
  margin: 1em;
  padding: 1em;
  border-radius: 1em;
  font-weight: bold;
  min-width: 30em;
  width: 100%;
  max-width: 90em;
}

small {
  color: black;
}
</style>
