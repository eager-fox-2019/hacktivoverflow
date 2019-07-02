<template>
  <div>
    <li class="list-group-item">
      <button
        type="button"
        class="btn btn-secondary"
        style="margin-right:10px"
        data-toggle="collapse"
        :data-target="`#a${questionEdit._id}`"
        aria-expanded="false"
      >Edit</button>
      <button type="button" class="btn btn-danger" v-on:click="deleteQuestion(questionEdit._id)">Delete</button>
      <div class="collapse" :id="`a${questionEdit._id}`" style="margin-top:30px">
        <div class="card card-body">
          <EQuestion :question="question"></EQuestion>
        </div>
      </div>
    </li>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import EQuestion from '@/components/E-Question'
import axios from 'axios'
export default {
  name: 'question-edit',
  props: ['question'],
  data () {
    return {
      questionEdit: {}
    }
  },
  components: {
    EQuestion
  },
  computed: {
    url () {
      return this.$store.state.url
    }
  },
  methods: {
    ...mapActions(['FETCHQUESTION']),
    deleteQuestion () {
      axios({
        method: 'DELETE',
        url: `${this.url}/question/${this.$route.params.id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.$router.push('/questions')
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
