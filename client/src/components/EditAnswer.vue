<template>
  <div>
    <div style="margin: 0.4rem 0 1rem 0;">
      <button type="button" class="btn btn-secondary btn-sm" @click="showEdit">
        Edit
      </button>
      <button type="button" style="margin-left: 0.5rem;" class="btn btn-danger btn-sm" @click="deleteAnswer(answer._id)">
        Delete
      </button>
    </div>
    <div class="modal" v-show="editModal">
      <form class="modalcontent" @submit.prevent="editAnswer(answer)">
        <button class="btn btn-outline-secondary btn-sm" @click="editModal = false">Back</button>
        <br><br>
        <div class="form-group">
          <label>Title: </label>
          <input type="text" class="form-control" v-model="answer.title">
        </div>
        <div class="form-group">
          <label>Answer: </label>
          <input type="text" class="form-control" v-model="answer.comment">
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
  props: ['answer'],
  data () {
    return {
      editModal: '',
      error: '',
    }
  },
  computed: {
    url () {
      return this.$store.state.url
    }
  },
  methods: {
    ...mapActions(['FETCHQUESTION']),
    showEdit() {
      this.editModal = true;
    },
    deleteAnswer(id) {
      axios({
        method: 'DELETE',
        url: `${this.url}/answer/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.FETCHQUESTION(this.$route.params.id)
        })
        .catch(error => {
          console.log(error)
          this.error = error.response.data.message
          setTimeout(() => {
              this.error = ''
          }, 2000);
        })
    },
    editAnswer(answer) {
      axios({
        method: 'PATCH',
        url: `${this.url}/answer/${answer._id}`,
        data: {
          title: answer.title,
          comment: answer.comment
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.FETCHQUESTION(this.$route.params.id)
          this.editModal = false;
        })
        .catch(error => {
          console.log(error)
          this.error = error.response.data.message
          setTimeout(() => {
              this.error = ''
          }, 2000);
        })
    },
  },
}
</script>
