<template>
  <div>
    <div style="margin: 0.4rem 0 1rem 0;">
      <button type="button" class="btn btn-secondary btn-sm" @click="showEdit">
        Edit
      </button>
      <button type="button" style="margin-left: 0.5rem;" class="btn btn-danger btn-sm" @click="deleteQuestion(question._id)">
        Delete
      </button>
    </div>
    <div class="modal" v-show="editModal">
      <form class="modalcontent" @submit.prevent="editQuestion(question)">
        <button class="btn btn-outline-secondary btn-sm" @click="editModal = false">Back</button>
        <br><br>
        <div class="form-group">
          <label>Title: </label>
          <input type="text" class="form-control" v-model="title">
        </div>
        <div class="form-group">
          <label>Tags: </label>
          <input type="text" class="form-control" v-model="tags">
        </div>
        <div class="form-group">
          <label>Description: </label>
          <input type="text" class="form-control" v-model="description">
        </div>
        <div style="text-align: center;">
          <button type="submit" class="btn btn-secondary">Update</button>
        </div>
        <p class="erroralert" v-if="error">
          {{ error }}
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import axios from 'axios'

export default {
  name: 'edit-question',
  props: ['question'],
  data () {
    return {
      editModal: false,
      title: '',
      description: '',
      tags: '',
      error: '',
    }
  },
  created () {
    this.title = this.question.title
    this.description = this.question.description
    this.tags = this.question.tags
  },
  computed: {
    url () {
      return this.$store.state.url
    },
    tagArray() {
      if(typeof this.tags === 'string') {
        let str = this.tags.toLowerCase().trim()
        let str2 = ''
        for(let i = 0; i < str.length; i ++) {
          if(!(str[i] === ' ' && (str[i-1] === ',' || str[i-1] === ' '))) {
            str2 += str[i]
          }
        }
        return str2.split(',').filter((val, index, self) => {
          if(val === '') {
            return false;
          }
          return self.indexOf(val) === index;
        });
      } else {
        return []
      }
    },
  },
  methods: {
    ...mapActions(['FETCHQUESTION']),
    showEdit() {
      this.title = this.question.title
      this.description = this.question.description
      this.tags = this.question.tags
      this.editModal = true;
    },
    deleteQuestion() {
      axios({
        method: 'DELETE',
        url: `${this.url}/question/${this.$route.params.id}`,
        headers: { token: localStorage.getItem('token') }
      })
        .then(({ data }) => {
          this.$router.push('/questions')
        })
        .catch(err => {
          console.log(err)
          this.error = err.response.data.message
          setTimeout(() => {
              this.error = ''
          }, 2000);
        })
    },
    editQuestion() {
      axios({
        method: 'PATCH',
        url: `${this.url}/question/${this.$route.params.id}`,
        data: {
          title: this.title,
          description: this.description,
          tags: this.tagArray
        },
        headers: { token: localStorage.getItem('token') }
      })
        .then(({ data }) => {
          this.FETCHQUESTION(this.$route.params.id)
          this.editModal = false
        })
        .catch(err => {
          console.log(err)
          this.error = err.response.data.message
           setTimeout(() => {
              this.error = ''
          }, 2000);
        })
    },
  },
}
</script>
