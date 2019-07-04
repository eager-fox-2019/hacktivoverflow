<template>
  <!-- <v-layout row justify-center> -->
    <v-dialog
        v-model="dialog2"
        max-width="800px"
        persistent
      >
      <v-card class="pa-3">
        <v-text-field
        v-model="editAnswerTitle"
        prepend-inner-icon="question_answer"
        solo
        >
        </v-text-field>
      <ckeditor :editor="editor" v-model="editAnswerDesc" :config="editorConfig"></ckeditor>

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

  <!-- </v-layout> -->
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import axios from 'axios'

export default {
  props: ['dialog2', 'answer'],
  data() {
    return {
      question: '',
      editor: ClassicEditor,
      editorData: '',
      editorConfig: {
     // The configuration of the rich-text editor.
      },
      editAnswerTitle : '',
      editAnswerDesc: ''
    }
  },
  created() {
    this.editAnswerTitle = this.answer.title
    this.editAnswerDesc = this.answer.description
  },
  methods: {
    closeDialog() {
      this.editAnswerTitle =  this.answer.title += ' '
      this.editAnswerDesc = this.answer.description += ' '

      this.$emit('closeDialog')
    },

    edit() {
      // console.log(this.editAnswerTitle, this.editAnswerDesc, 'hahahaa')
      axios({ 
        method: 'PATCH',
        url: `${this.$store.state.baseURL}/answers/${this.answer._id}`,
        data: {
          title: this.editAnswerTitle,
          description: this.editAnswerDesc
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({data}) => {
          this.$emit('closeDialog')
          
          this.$emit('editQuestion')
          // console.log(data)
        })
        .catch(({response}) => {
          console.log(response)
        })
    }
  }
}
</script>

<style>

</style>
