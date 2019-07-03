<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs8 offset-xs2 style="border: 1px solid #BEBEBE; background-color: white;" class="pt-4 pb-4 pl-5 pr-5 mt-4">
        <v-layout align-center>
          <v-flex xs1>
            <v-layout column align-center mr-3>
              <v-icon style="cursor:pointer;" color="orange" large>keyboard_arrow_up</v-icon>
              <div>0</div>
              <v-icon style="cursor:pointer;" large>keyboard_arrow_down</v-icon>
            </v-layout>
          </v-flex>
          <v-flex xs11>
            <v-layout align-center> 
              <div class="display-1 mb-3 font-weight-medium"> {{ post.question }}  </div>
              <v-spacer></v-spacer>
              <div class="subheading"> Asked {{ getTime(post.createdAt)}} by <span style="color: #929292">{{post.user.username}}</span></div>
            </v-layout>
            <v-divider></v-divider>
          </v-flex>
        </v-layout>
        <div class="pa-4">
          <div v-html="post.description"></div>
        </div>
        <v-divider></v-divider>
        <v-layout class="mt-3" column>
          
          <div class="title font-weight-regular mb-3">Have relevant insight? Answer below.</div>
           <v-text-field
            v-model="title"
            prepend-inner-icon="question_answer"
            solo
            placeholder="Title your answer"
          >
          </v-text-field>
          <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
          <v-flex align-self-end mt-2>
            <v-btn large color="#F7C10A" v-on:click="submit">Submit</v-btn>
          </v-flex>
        </v-layout>
        
        <Answers v-for="(answer, index) in post.answers" :key="index" :answer="answer"/>
      </v-flex>
    </v-layout> -
  </v-container>
</template>

<script>
import axios from 'axios'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import Answers from '@/components/answers.vue'

export default {
  name: 'ViewPost',
  components: {
    Answers
  },
  data() {
    return {
      post: '',
      editor: ClassicEditor,
      editorData: '',
      editorConfig: {
          // The configuration of the rich-text editor.
      },
      title: '',
      description: '',
      questionId: ''
    }
  },
  created() {
    this.questionId = this.$route.params.id
    axios({ 
      method: 'GET',
      url: `${this.$store.state.baseURL}/questions/${this.questionId}`,
    })
      .then(({data}) => {
        console.log(data)
        this.post = data
      })
      .catch(({ response }) => {
        console.log(response)
      })
  },

  methods: {
    getTime(createdAt) {
      let now = new Date()
      let date = new Date(createdAt)
      let diff = now - date
      
      let time = Math.floor(diff/(1000 * 60 * 60))
      if(diff < (1000 * 60 * 60)) {
        if(time === 0) {
          return 'Just now'
        } else {
          return `${Math.floor(diff/ (1000 * 60))} mins ago`
        }
      } else if (diff < (1000 * 60 * 60 * 24)) {
        if(time === 1) {
          return `${time} hour ago`
        } else {
          return `${time} hours ago`
        }
      } else {
        return `${Math.floor(diff/(1000 * 60 * 60 * 24))} days ago`
      }
    },

    submit() {
      axios({ 
        method: 'POST',
        url: `${this.$store.state.baseURL}/answers`,
        data: {
          title: this.title,
          description: this.editorData,
          questionId: this.questionId
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({data}) => {
          this.post = data
          console.log(data)
        })
        .catch(({response}) => {
          console.log(response)
        })
    }
  }
}
</script>

<style>
  .answer:hover {
    background-color: #EDEDED;
  }
</style>
