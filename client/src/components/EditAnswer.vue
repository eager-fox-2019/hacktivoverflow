<template>
  <div>
    <li class="list-group-item">
      <button
        type="button"
        class="btn btn-secondary"
        style="margin-right:10px"
        data-toggle="collapse"
        :data-target="`#a${answer._id}`"
        aria-expanded="false"
      >Edit</button>
      <button type="button" class="btn btn-danger" v-on:click="deleteAnswer(answer._id)">Delete</button>
      <div class="collapse" :id="`a${answer._id}`" style="margin-top:30px">
        <div class="card card-body">
          <EAnswer :answer="answer"></EAnswer>
        </div>
      </div>
    </li>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import EAnswer from '@/components/E-Answer'
import axios from 'axios'
export default {
  name: 'answer-edit',
  props: ['answer'],
  data () {
    return {
    }
  },
  components: {
    EAnswer
  },
  computed: {
    url () {
      return this.$store.state.url
    }
  },
  methods: {
    ...mapActions(['FETCHQUESTION']),
    deleteAnswer (id) {
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
          this.error = error.response.data.message
          console.log(error)
        })
    }
  },
  created () {}
}
</script>
