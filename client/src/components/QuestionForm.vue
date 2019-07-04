<template>
  <div class="d-flex justify-content-center">
    <b-form class="formArea" @submit.prevent="onSubmit" @reset.prevent="onReset">
      <b-form-group id="input-title" label="Title:" label-for="title-1">
        <b-form-input id="title-1" v-model="form.title" placeholder="Enter Question Title"></b-form-input>
        <small>Make the title clear and concise</small>
      </b-form-group>

      <b-form-group id="input-description" label="Description:" label-for="desc-2">
        <b-form-textarea id="desc-2" v-model="form.description" placeholder="Question description..." rows="3" max-rows="6"></b-form-textarea>
        <small>Show working example of the error with relevant code snippets and the sample result you are looking for.</small>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Cancel</b-button>

    </b-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'QuestionForm',
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
      this.$emit('hideQuestionFrom')
    },
    onSubmit () {
      let { state, commit, dispatch } = this.$store

      dispatch('postQuestion', this.form)
        .then(({ data }) => {
          let tempArray = state.questionList
          data.owner = state.user
          // console.log(state.user)
          // console.log(data.owner.name)
          tempArray.unshift(data)

          commit('UPDATEQUESTIONLIST', [])
          commit('UPDATEQUESTIONLIST', tempArray)

          // console.log(data)
          this.onReset()
        })
        .catch(({ response }) => {
          // console.log(response.data)
          commit('SHOWMSG', {
            message: response.data,
            type: 'warning'
          })
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
