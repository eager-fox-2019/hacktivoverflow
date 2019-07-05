<template>
  <div class="qdcard" v-if="question.UserId">
    <div class="qdheader"> {{ question.title }}</div>
    <div>
      <div style="display: flex; padding: 0.7rem 0;">
        <div class="voteholder">
          <div class="upvote" :class={upvoted} @click="upvote"></div>
          <div class="votecount">{{ voteCount }}</div>
          <div class="downvote" :class={downvoted} @click="downvote"></div>
        </div>
        <div style="margin-left: 1rem; line-height: 1.4rem;">
          <p>{{ question.description }}</p>
          <p style="font-size: 0.9rem;">
            Tags: {{ question.tags.join(', ') }}<br>
            Asked by: {{ question.UserId.name }} on: {{ question.created_at.slice(0,10) }}
          </p>
        </div>
      </div>
      <EditQuestion v-if="userId == question.UserId._id" :question="question"/>
    </div>
  </div>
</template>
<script>
import EditQuestion from '@/components/EditQuestion.vue'
import { mapActions } from 'vuex'
import axios from 'axios'

export default {
  name: 'question-detail',
  data () {
    return {
      error: ''
    }
  },
  components: {
    EditQuestion,
  },
  computed: {
    url() {
      return this.$store.state.url
    },
    userId() {
      return this.$store.state.id
    },
    question() {
      return this.$store.state.question
    },
    voteCount() {
      return this.question.upvotes.length - this.question.downvotes.length
    },
    upvoted() {
      let found = false
      this.question.upvotes.forEach(v => {
        if(v._id === this.userId) {
          found = true
        }
      })
      return found
    },
    downvoted() {
      let found = false
      this.question.downvotes.forEach(v => {
        if(v._id === this.userId) {
          found = true
        }
      })
      return found
    },
  },
  methods: {
    ...mapActions(['FETCHQUESTION']),
    upvote() {
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
    downvote() {
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

<style scoped>
.qdheader {
  font-size: 1.6rem;
  font-weight: bold;
  padding-bottom: 0.7rem; 
  border-bottom: 1px solid #ccc;
}
</style>
