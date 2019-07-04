<template>
  <v-content class="form-create-container">
  <h4 class="add-form-header display-1" >Edit Question</h4>
  <v-form class="form-create mt-5" ref="form" v-model="valid" lazy-validation>
    <v-text-field :rules="titleRules" v-model="questionObj.title" label="Title"></v-text-field>
    <wysiwyg v-model="questionObj.description"></wysiwyg>
    <v-btn color="success" @click="editQuestion" class="button-form">
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
          _id: this.$store.state.selectedQuestion._id,
          title: this.$store.state.selectedQuestion.title,
          description: this.$store.state.selectedQuestion.description,
          upvotes: this.$store.state.selectedQuestion.upvotes,
          downvotes: this.$store.state.selectedQuestion.downvotes,
          answers: this.$store.state.selectedQuestion.answers
        },
        titleRules: [
          v => !!v || 'title cannot be empty',
        ]
      }
    },
    methods: {
      editQuestion() {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('updateQuestionNoVotes', this.questionObj);
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
