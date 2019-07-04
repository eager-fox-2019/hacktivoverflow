<template>
  <div class="ansform">
    <div class="header">Your Answer:</div>
    <form @submit.prevent="postAnswer">
      <div class="form-group">
        <input type="text" class="form-control" placeholder="Answer title" v-model="answer.title" autofocus/>
      </div>
      <div class="form-group">
        <textarea class="form-control" rows="4" placeholder="Answer in detail" v-model="answer.comment"></textarea>
      </div>
      <p class="erroralert" v-if="error">{{ error }}<br></p>
      <button type="submit" class="btn btn-secondary btn-sm">Submit</button>
    </form>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import axios from 'axios'
export default {
  name: 'answer-form',
  data() {
    return {
      answer: {
        title: '',
        comment: ''
      },
      error: ''
    }
  },
  computed: {
    url() {
      return this.$store.state.url
    }
  },
  methods: {
    ...mapActions(['FETCHQUESTION']),
    postAnswer() {
      axios({
        method: 'POST',
        url: `${this.url}/answer/${this.$route.params.id}`,
        data: {
          title: this.answer.title,
          comment: this.answer.comment
        },
        headers: { token: localStorage.getItem('token') }
      })
        .then(({ data }) => {
          this.clearAll()
          this.FETCHQUESTION(this.$route.params.id)
        })
        .catch(err => {
          console.log(err)
          this.err = err.response.data.message
          setTimeout(() => {
            this.err = ''
          }, 2000);
        })
    },
    clearAll() {
      this.answer.title = ''
      this.answer.comment = ''
    }
  },
}
</script>
<style>
.ansform {
  margin: 0.5rem 0rem;
  padding: 1rem 1.2rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem #999;
}
.header {
  font-size: 1.2rem;
  margin: 0 0 0.4rem 0;
}
.form-group {
  width: 100%;
}
.form-control {
  font-size: 0.9rem;
  padding: 0.2rem 0.5rem;
}
</style>
