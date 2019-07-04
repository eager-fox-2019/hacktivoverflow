<template>
  <b-modal :id="'modal-question-edit' + qedit._id" title="Question" @ok="addQuestion">
    <b-form >
      <b-form-group label="Title:" label-for="Qtitle">
        <b-form-input id="Qtitle" v-model="qedit.title" type="text" placeholder="Title..."></b-form-input>
      </b-form-group>
      <b-form-group label="Description:" label-for="Qdescription" >
        <b-form-textarea id="Qdescription" v-model="qedit.description" rows="3">
        </b-form-textarea>
      </b-form-group>
    </b-form>
  </b-modal>
</template>

<script>
export default {
  props: ['qedit'],
  methods: {
    addQuestion () {
      this.$store.dispatch('editQuestion', this.qedit)
    }
  }
}
</script>
