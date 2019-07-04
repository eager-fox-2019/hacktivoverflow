<template>
  <v-dialog
      v-model="dialog2"
      max-width="800px"
      persistent
    >
    <v-card class="pa-3">
     <v-text-field
        label="Question:"
        v-model="editQuestionTitle"
        prepend-inner-icon="live_help"
        outline
        placeholder="What's your programming question? Remember to be specific."
      >
     </v-text-field>
    <ckeditor :editor="editor" v-model="editQuestionDesc" :config="editorConfig"></ckeditor>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn
        color="red darken-1"
        flat="flat"
        @click="closeDialog"
      >
        Nevermind
      </v-btn>

      <v-btn
        color="green darken-1"
        flat="flat"
        @click="edit"
      >
        Edit
      </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import axios from 'axios'

export default {
  props: ['dialog2', 'question'],
  name: 'EditQuestion',
  data() {
    return {
      editor: ClassicEditor,
      editorData: '',
      editorConfig: {
     // The configuration of the rich-text editor.
      },
      editQuestionTitle: '',
      editQuestionDesc: ''
    }
  },
  created() {
    this.editQuestionTitle = this.question.question
    this.editQuestionDesc = this.question.description
  },
  methods: {
    edit() {
      axios({ 
        method: 'PATCH',
        url: `${this.$store.state.baseURL}/questions/${this.question._id}`,
        data: {
          title: this.editQuestionTitle,
          description: this.editQuestionDesc
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({data}) => {
          // this.dialog2 = false
          this.$emit('closeDialog')
          this.$store.dispatch('getPublicQuestions')
          this.$store.dispatch('getMyQuestions')
        })
        .catch(({response}) => {
          console.log(response)
        })
    },

    closeDialog() {
      this.editQuestionTitle = this.question.question
      this.editQuestionDesc = this.question.description
      this.$emit('closeDialog')
    }
  }
}
</script>

<style>

</style>
