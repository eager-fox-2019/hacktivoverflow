<template>
  <div class="d-flex justify-content-center">
    <b-form class="formArea" @submit.prevent="onSubmit" @reset.prevent="onReset">
      <b-form-group id="input-title" label="Title:" label-for="title-1">
        <b-form-input id="title-1" v-model="form.title" placeholder=""></b-form-input>
      </b-form-group>

      <b-form-group id="input-description" label="Description:" label-for="desc-2">
        <b-form-textarea id="desc-2" v-model="form.description" placeholder="Question description..." rows="3" max-rows="6"></b-form-textarea>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Cancel</b-button>

    </b-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'EditForm',
  props: ['original'],
  created () {
    this.form.title = this.original.title
    this.form.description = this.original.description
  },
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

      dispatch('updateAnswer',
        {
          id: this.original._id,
          form: this.form
        })
        .then(({ data }) => {
          let tempArray = state.answerList
          console.log({ data })
          data.owner = {
            _id: state.user.id,
            name: state.user.name,
            email: state.user.email
          }
          console.log({ data })
          console.log(state.user)
          console.log(data.owner.name)

          for (let i = 0; i < tempArray.length; i++) {
            if (tempArray[i]._id = data._id) {
              tempArray[i] = data
              i = tempArray.length
            }
          }

          commit('UPDATECURRENTANSWERLIST', [])
          commit('UPDATECURRENTANSWERLIST', tempArray)

          console.log(data)
          this.onReset()
        })
        .catch(({ response }) => {
          console.log(response.data)
          commit('SHOWMSG', {
            message: response.data,
            type: 'danger'
          })
        })
    },
    onReset () {
      console.log('edit answer form toggled')
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
