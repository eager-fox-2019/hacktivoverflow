<template>
  <v-content class="form-create-container">
  <h4 class="add-form-header display-1" >Edit Answer</h4>
  <v-form class="form-create mt-5" ref="form" v-model="valid" lazy-validation>
    <v-text-field :rules="titleRules" v-model="answerObj.title" label="Title"></v-text-field>
    <wysiwyg v-model="answerObj.description"></wysiwyg>
    <v-btn color="success" @click="editAnswer" class="button-form">
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
        answerObj: {
          _id: this.$store.state.selectedAnswer._id,
          title: this.$store.state.selectedAnswer.title,
          description: this.$store.state.selectedAnswer.description,
          upvotes: this.$store.state.selectedAnswer.upvotes,
          downvotes: this.$store.state.selectedAnswer.downvotes
        },
        titleRules: [
          v => !!v || 'title cannot be empty',
        ]
      }
    },
    methods: {
      editAnswer() {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('updateAnswerNoVotes', this.answerObj);
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
