<template>
  <div style="margin-top:0px">
    <p class="header">Your Answer</p>
    <div id="answerQuestion">
      <form @submit.prevent="postAnswer">
        <div class="form-group">
          <label for="answerTitle">Title</label>
          <input
            v-model="answer.title"
            type="text"
            class="form-control"
            id="answerTitle"
            placeholder="Title"
          />
        </div>
        <div class="form-group">
          <label for="answerQuestion">Answer</label>
          <textarea
            v-model="answer.comment"
            class="form-control"
            id="answerQuestion"
            rows="4"
            placeholder="Answer.."
          ></textarea>
        </div>
        <p v-if="error.length != 0" style="color:red;text-align:center">
          {{ error }}
          <br />
          <br />
        </p>
        <button type="submit" class="btn btn-dark">Answer!</button>
      </form>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import axios from 'axios'
export default {
  name: 'answer-post',
  data () {
    return {
      answer: {
        title: '',
        comment: ''
      },
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
    postAnswer () {
      axios({
        method: 'POST',
        url: `${this.url}/answer/${this.$route.params.id}`,
        data: {
          title: this.answer.title,
          comment: this.answer.comment
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.clearAll()
          this.FETCHQUESTION(this.$route.params.id)
        })
        .catch(error => {
          this.error = error.response.data.message
          console.log(error)
        })
    },
    clearAll () {
      this.answer.title = ''
      this.answer.comment = ''
      this.error = ''
    }
  },
  created () {}
}
</script>
<style>
#answerQuestion {
  display: flex;
  justify-content: center;
}
.form-group {
  width: 350px;
}
.header {
  text-align: center;
  font-size: 22px;
}
</style>
