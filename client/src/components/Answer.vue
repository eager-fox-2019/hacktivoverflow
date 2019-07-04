<template>
  <div class="acard">
    <div>
      <div style="display: flex; padding: 0.7rem 0;">
        <div class="voteholder">
          <div class="upvote" :class={upvoted} @click="upvote(answer._id)"></div>
          <div class="votecount">{{ voteCount }}</div>
          <div class="downvote" :class={downvoted} @click="downvote(answer._id)"></div>
        </div>
        <div style="margin-left: 1rem; line-height: 1.4rem;">
          <div class="aheader"> {{ answer.title }}</div>
          <p>{{ answer.comment }}</p>
          <p style="font-size: 0.9rem;">
            Answered by: {{ answer.UserId.name }} on: {{ answer.created_at.slice(0,10) }}
          </p>
          <EditAnswer v-if="userId == answer.UserId._id" :answer="answer"></EditAnswer>
          <p class="erroralert" v-if="error">
            {{ error }}
          </p>
        </div>
      </div>
      <!-- <EditQuestion v-if="userId == question.UserId._id" :question="question"/> -->
    </div>
       <!-- <button type="button" class="btn btn-outline-dark ovis" @click="upvote(answer._id)">
        {{ answer.upvotes.length - answer.downvotes.length}}
        <button type="button" class="btn btn-outline-danger ovis" @click="downvote(answer._id)">
      <EditAnswer v-if="userId == answer.UserId._id" :answer="answer"></EditAnswer>
    </ul>
    </div> -->
  </div>
</template>

<script>
import EditAnswer from '@/components/EditAnswer.vue'
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
  name: 'answer-component',
  props: ['answer'],
  data () {
    return {
      error: ''
    }
  },
  components: { EditAnswer },
  computed: {
    url () {
      return this.$store.state.url
    },
    userId () {
      return this.$store.state.id
    },
    voteCount() {
      return this.answer.upvotes.length - this.answer.downvotes.length
    },
    upvoted() {
      let found = false
      this.answer.upvotes.forEach(v => {
        if(v._id === this.userId) {
          found = true
        }
      })
      return found
    },
    downvoted() {
      let found = false
      this.answer.downvotes.forEach(v => {
        if(v._id === this.userId) {
          found = true
        }
      })
      return found
    },
  },
  methods: {
    ...mapActions(['FETCHQUESTION']),
    upvote (id) {
      axios({
        method: 'PATCH',
        url: `${this.url}/answer/upvote/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.FETCHQUESTION(this.$route.params.id)
        })
        .catch(error => {
          this.error = error.response.data.message
          console.log(error)
        })
    },
    downvote (id) {
      axios({
        method: 'PATCH',
        url: `${this.url}/answer/downvote/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.FETCHQUESTION(this.$route.params.id)
        })
        .catch(error => {
          this.error = error.response.data.message
          console.log(error)
        })
    }
  },
  created () {}
}
</script>

<style scoped>
.acard {
  border-top: 1px solid #ccc;
}
.aheader {
  font-weight: bold;
  margin-bottom: 0.3rem;
}
</style>

