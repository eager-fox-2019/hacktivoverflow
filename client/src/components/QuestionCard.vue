<template>
  <div class="card text-white bg-dark mb-3" style="width: 600px;" v-if="question.UserId != undefined">
    <div class="card-header" style="height:47px">Category: {{ question.category }}</div>
    <div class="card-body">
      <blockquote class="blockquote mb-0">
        <p>{{ question.description }}</p>
        <footer class="blockquote-footer">
          <small style="color:white">
            By
            {{ question.UserId.name }} at {{ question.created_at.slice(0,10) }}
          </small>
        </footer>
      </blockquote>
      <br />
      <UpvoteButton2 :question="question" :addUpvote="addUpvote" :addDownvote="addDownvote">
        <button
          @click="addUpvote"
          type="button"
          class="btn btn-outline-light"
          style="margin-right:10px;height:40px;width:40px;border-radius:20px"
        >+</button>
        {{ question.upvotes.length - question.downvotes.length}}
        <button
          @click="addDownvote"
          type="button"
          class="btn btn-outline-danger"
          style="margin-left:10px;height:40px;width:40px;border-radius:20px"
        >-</button>
      </UpvoteButton2>

      <br />
      <br />
      <EditQuestion v-if="userId == question.UserId._id" :question="question"></EditQuestion>
    </div>
  </div>
</template>
<script>
import EditQuestion from '@/components/EditQuestion.vue'
import UpvoteButton2 from '@/components/UpvoteButton2.vue'
import { mapActions } from 'vuex'
import axios from 'axios'
export default {
  name: 'question-card',
  data () {
    return {
      error: ''
    }
  },
  components: {
    EditQuestion,
    UpvoteButton2
  },
  computed: {
    url () {
      return this.$store.state.url
    },
    userId () {
      return this.$store.state.id
    },
    question () {
      return this.$store.state.question
    }
  },
  methods: {
    ...mapActions(['FETCHQUESTION']),
    addUpvote () {
      axios({
        method: 'PATCH',
        url: `${this.url}/question/upvote/${this.$route.params.id}`,
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
        })
    },
    addDownvote () {
      axios({
        method: 'PATCH',
        url: `${this.url}/question/downvote/${this.$route.params.id}`,
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
        })
    }
  },
  created () {
    this.FETCHQUESTION(this.$route.params.id)
  }
}
</script>
