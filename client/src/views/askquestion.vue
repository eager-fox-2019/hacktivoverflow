<template>
  <v-form>
    <v-container>
      <v-layout row wrap>
        <v-flex xs8 offset-xs2 style="border: 1px solid #BEBEBE; background-color: white;" class="pt-4 pb-4 pl-5 pr-5 mt-4">
          <v-layout justify-center>
            <div class="display-1 mb-3 font-weight-medium"> Ask a question </div>
          </v-layout>
          <v-text-field
            label="Question:"
            v-model="question"
            prepend-inner-icon="live_help"
            outline
            placeholder="What's your programming question? Remember to be specific."
          >
          </v-text-field>
          <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
          <v-layout justify-center class="mt-4">
            <v-btn color="blue" class="subheading white--text" @click="submit">Post your question</v-btn>
          </v-layout>
        </v-flex>
      </v-layout>
      <PostSuccess :dialog="dialog"/>
    </v-container>
  </v-form>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import PostSuccess from '@/components/postsuccess.vue'

import axios from 'axios'

export default {
  name: 'AskQuestion',
  data () {
    return {
      editor: ClassicEditor,
      editorData: '',
      editorConfig: {
        // The configuration of the rich-text editor.
      },
      question: '',
      dialog: false
    }
  },

  components: {
    PostSuccess
  },

  methods: {
    submit () {
      axios({
        method: 'POST',
        url: `${this.$store.state.baseURL}/questions`,
        data: {
          question: this.question,
          description: this.editorData
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          this.dialog = true
        })
        .catch(({ response }) => {
          console.log(response)
        })
    }
  }
}
</script>

<style>
.ck-content {
  height: 200px;
  }
</style>
