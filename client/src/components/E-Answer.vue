<template>
  <div>
    <form @submit.prevent="editAnswer(answer)">
      <div class="form-group">
        <label :for="`#${answer._id}title`">Edit Title</label>
        <input type="text" class="form-control" :id="`${answer._id}title`" v-model="answer.title" />
      </div>
      <div class="form-group">
        <label :for="`#${answer._id}comment`">Edit Answer</label>
        <input
          type="text"
          class="form-control"
          :id="`${answer._id}comment`"
          v-model="answer.comment"
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
  name: 'answer-edit2',
  props: ['answer'],
  data () {
    return {
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
    editAnswer (ans) {
      axios({
        method: 'PATCH',
        url: `${this.url}/answer/${ans._id}`,
        data: {
          title: ans.title,
          comment: ans.comment
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          document.getElementById(`a${ans._id}`).className =
            'collapse'
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
