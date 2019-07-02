<template>
  <div class="card" style="display:flex;justify-content:center;flex-direction:column;width: auto;">
    <div class="card-header">{{answer.title}}</div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">
        {{answer.comment}}
        <br />
        <cite title="Source Title">
          Created at {{ answer.created_at }}
          <br />
          by {{ answer.UserId.name }}
        </cite>
      </li>
      <li class="list-group-item">
        <UpvoteButton :answer="answer" :addUpvote2="addUpvote2" :addDownvote2="addDownvote2">
          <button
            @click="addUpvote2(answer._id)"
            type="button"
            class="btn btn-primary"
            style="margin-right:10px;height:40px;width:40px"
          >+</button>
          {{ answer.upvotes.length - answer.downvotes.length}}
          <button
            @click="addDownvote2(answer._id)"
            type="button"
            class="btn btn-danger"
            style="margin-left:10px;height:40px;width:40px"
          >-</button>
        </UpvoteButton>

        <p v-if="error.length != 0" style="color:red;text-align:center">
          <br />
          <br />
          {{ error }}
        </p>
      </li>
      <EditAnswer v-if="userId == answer.UserId._id" :answer="answer"></EditAnswer>
    </ul>
  </div>
</template>
<script>
import EditAnswer from '@/components/EditAnswer.vue'
import UpvoteButton from '@/components/UpvoteButton.vue'
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
  components: {
    EditAnswer,
    UpvoteButton
  },
  computed: {
    url () {
      return this.$store.state.url
    },
    userId () {
      return this.$store.state.id
    }
  },
  methods: {
    ...mapActions(['FETCHQUESTION']),
    addUpvote2 (id) {
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
    addDownvote2 (id) {
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
