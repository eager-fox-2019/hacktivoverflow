<template>
  <div class="row">
    <form @submit.prevent="AnswerForm_trigger" class="col s12">
      <div class="row">
        <div class="input-field col s10">
          <i class="material-icons prefix">T</i>
          <input v-model="answer_title" id="input_text" type="text"  class="validate"/>
          <label for="input_text">Title</label>
        </div>
      </div>
      <div class="row">
          <wysiwyg v-model="myHTML" />
      </div>
    <button type="submit" class="waves-effect waves-light btn-small left grey darken-3">Post Your Answer</button>
    </form>
  </div>
</template>

<script>
import "vue-wysiwyg/dist/vueWysiwyg.css"

export default {
  data() {
    return {
      answer_title: "",
      myHTML: ''
    }
  },
  methods: {
    AnswerForm_trigger () {
      this.$emit('AnswerForm_trigger', { answer: this.answer_title, description: this.myHTML })
      this.answer_title= "",
      this.myHTML= ''

    }
  }
};
</script>

<style>
</style>
