<template>
  <div class="row">
    <form class="col s12">
      <div class="row">
        <div class="input-field col s10">
          <i class="material-icons prefix">T</i>
          <input id="input_text" type="text"  class="validate"/>
          <label for="input_text">Title</label>
        </div>
      </div>
      <div class="row">
          <wysiwyg v-model="myHTML" />
      </div>
    </form>
    <a class="waves-effect waves-light btn-small left grey darken-3">Post Your Answer</a>
  </div>
</template>

<script>
import "vue-wysiwyg/dist/vueWysiwyg.css"

export default {
  data() {
    return {
      tag_input: "",
      myHTML: ''
    }
  },
  methods: {
  }
};
</script>

<style>
</style>
