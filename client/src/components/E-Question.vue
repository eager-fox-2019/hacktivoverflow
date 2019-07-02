<template>
  <div>
    <form @submit.prevent="editQuestion(questionEdit)">
      <div class="form-group">
        <label :for="`#${questionEdit._id}title`">Edit Title</label>
        <input
          type="text"
          class="form-control"
          :id="`${questionEdit._id}title`"
          v-model="questionEdit.title"
        />
      </div>
      <div class="form-group">
        <label :for="`#${questionEdit._id}category`">Edit Category</label>
        <input
          type="text"
          class="form-control"
          :id="`${questionEdit._id}category`"
          v-model="questionEdit.category"
        />
      </div>
      <div class="form-group">
        <label :for="`#${questionEdit._id}question`">Edit Question</label>
        <input
          type="text"
          class="form-control"
          :id="`${questionEdit._id}question`"
          v-model="questionEdit.description"
        />
      </div>
      <p v-if="error.length != 0" style="color:red;text-align:center">
        {{ error }}
        <br />
        <br />
      </p>
      <button type="submit" class="btn btn-secondary">Edit</button>
    </form>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import axios from 'axios'
export default {
  name: 'question-edit2',
  props: ['question'],
  data () {
    return {
      questionEdit: {},
      error: ''
    }
  },
  components: {},
  computed: {
    url () {
      return this.$store.state.url
    }
  },
  methods: {
    ...mapActions(['FETCHQUESTION']),
    editQuestion (editQ) {
      axios({
        method: 'PATCH',
        url: `${this.url}/question/${this.$route.params.id}`,
        data: {
          title: editQ.title,
          description: editQ.description,
          category: editQ.category
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.FETCHQUESTION(this.$route.params.id)
          document.getElementById(`a${editQ._id}`).className =
            'collapse'
        })
        .catch(error => {
          console.log(error)
          this.error = error.response.data.message
        })
    }
  },
  created () {
    this.questionEdit = this.question
  }
}
</script>
