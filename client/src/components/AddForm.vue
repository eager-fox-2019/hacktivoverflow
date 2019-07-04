<template>
  <v-content class="form-create-container">
  <h4 class="add-form-header display-1" >Ask a Question</h4>
  <v-form class="form-create mt-5" ref="form" v-model="valid" lazy-validation>
    <v-text-field @keydown.enter.prevent="createQuestion" :rules="titleRules" v-model="questionObj.title" label="Title"></v-text-field>
    <wysiwyg v-model="questionObj.description"></wysiwyg>
    <v-btn color="success" @click="createQuestion" class="button-form">
      Submit
    </v-btn>
  </v-form>
  </v-content>
</template>

<script>
  export default {
    data() {
      return {
        valid: true,
        questionObj: {
          title: '',
          descrpition: ''
        },
        titleRules: [
          v => !!v || 'title cannot be empty',
        ]
      }
    },
    methods: {
      createQuestion() {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('createQuestion', this.questionObj);
        }
      }
    }
  }
</script>

<style scoped>
  @import '../../node_modules/vue-wysiwyg/dist/vueWysiwyg.css';
  
  .form-create-container {
    background-color: white;
  }

  .form-create {
    width: 80%;
    margin: 0 auto;
  }

  .add-form-header {
    font-weight: bold;
    text-align: center;
    margin-top: 40px;
  }

  .button-form {
    margin-top: 20px;
  }
</style>
