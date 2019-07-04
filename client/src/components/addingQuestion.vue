<template>
  <div>
    <form @submit.prevent="addQuestion">
    <div role="group">
      <b-form-input
        id="input-live"
        v-model="title"
        :state="nameState"
        aria-describedby="input-live-help input-live-feedback"
        placeholder="Enter title of your Question"
        trim
      ></b-form-input>

      <!-- This will only be shown if the preceding input has an invalid state -->
      <b-form-invalid-feedback id="input-live-feedback">Enter at least 3 letters</b-form-invalid-feedback>

    </div>
    <b-form-textarea
      id="textarea"
      v-model="desc"
      placeholder="Enter your question"
      rows="3"
      max-rows="6"
    ></b-form-textarea>
    <b-button type="submit" variant="outline-primary">Ask</b-button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'addQue',
  data () {
    return {
      title: '',
      desc: ''
    }
  },
  computed: {
    nameState () {
      return this.title.length > 2
    }
  },
  methods: {
    addQuestion () {
      let data = {
        title: this.title,
        description: this.desc
      }
      this.$store.dispatch('CREATEQUESTION', data)
    }
  }
}
</script>

<style>
</style>
