<template>
  <b-modal id="answer-modal" title="Answer" @ok="addAnswer">
    <b-form >
      <b-form-group label="Title:" label-for="Atitle">
        <b-form-input id="Atitle" v-model="title" type="text" placeholder="Title..."></b-form-input>
      </b-form-group>
      <b-form-group label="Description:" label-for="Adescription" >
        <b-form-textarea id="Adescription" v-model="description" rows="3">
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
    addAnswer () {
      this.$store.dispatch('answer', { title: this.title, description: this.description })
      this.title = ''
      this.description = ''
    }
  }
}
</script>
