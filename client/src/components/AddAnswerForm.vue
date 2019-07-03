<template>
  <v-layout>
    <v-form class="form-add-answer mt-5" ref="form" v-model="valid" lazy-validation>
      <v-text-field :rules="titleRules" v-model="answerObj.title" label="Title"></v-text-field>
      <wysiwyg v-model="answerObj.description"></wysiwyg>
      <v-btn @click="addAnswer" color="success">
        Submit
      </v-btn>
    </v-form>
  </v-layout>
</template>

<script>
  export default {
    props: ['question'],
    data() {
      return {
        valid: true,
        answerObj: {
          title: '',
          description: ''
        },
        titleRules: [
          v => !!v || 'title cannot be empty',
        ]
      }
    },
    methods: {
      addAnswer() {
        if (this.$refs.form.validate()) {
        this.$store.dispatch('createAnswer', [this.answerObj, this.question]);
        }
      }
    }
  }
</script>

<style scoped>
  @import '../../node_modules/vue-wysiwyg/dist/vueWysiwyg.css';

  .form-add-answer {
    width: 80%;
    margin: 0 auto;
    margin-bottom: 50px;
  }
</style>
