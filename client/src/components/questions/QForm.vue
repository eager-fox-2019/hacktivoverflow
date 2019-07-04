<template>
  <b-modal id="question-modal" title="Question" @ok="addQuestion">
    <b-form >
      <b-form-group label="Title:" label-for="Qtitle">
        <b-form-input id="Qtitle" v-model="title" type="text" placeholder="Title..."></b-form-input>
      </b-form-group>
      <b-form-group label="Description:" label-for="Qdescription" >
        <b-form-textarea id="Qdescription" v-model="description" rows="3">
        </b-form-textarea>
      </b-form-group>
    </b-form>
  </b-modal>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      description: ''
    }
  },
  methods: {
    addQuestion () {
      this.$store.dispatch('question', { title: this.title, description: this.description })
      this.title = ''
      this.description = ''
    }
  }
}
</script>
