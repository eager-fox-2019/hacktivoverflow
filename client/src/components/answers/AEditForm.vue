<template>
  <b-modal :id="'answer-modal-edit' + aedit._id" title="Answer" @ok="addAnswer">
    <b-form >
      <b-form-group label="Title:" label-for="Atitle">
        <b-form-input id="Atitle" v-model="aedit.title" type="text" placeholder="Title..."></b-form-input>
      </b-form-group>
      <b-form-group label="Description:" label-for="Adescription" >
        <b-form-textarea id="Adescription" v-model="aedit.description" rows="3">
        </b-form-textarea>
      </b-form-group>
    </b-form>
  </b-modal>
</template>

<script>
export default {
  props: ['aedit'],
  methods: {
    addAnswer () {
      this.$store.dispatch('editAnswer', this.aedit)
    }
  }
}
</script>
