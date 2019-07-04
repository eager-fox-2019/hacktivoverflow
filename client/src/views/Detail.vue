<template>
  <div id="detail-container">
    <p id="by">by {{detailedQuestion.user.username}}</p>
    <p class="label">Title</p>
    <div class="detail-item" id="title-container">
      <p id="title">
        {{detailedQuestion.title}}
      </p>
    </div>
    <p class="label" style="margin-top: 20px;">Question</p>
    <div class="detail-item">
      <p id="content">
        {{detailedQuestion.content}}
      </p>
    </div>
    <div id="container-button">
      <p class="label" style="margin-top: 20px;">Answers</p>
      <p id="create-button" @click="addAnswer">Answer this question</p>
    </div>
    <div id="textarea">
      <b-input type="textarea" placeholder="Put your answer here !" v-model="inputAnswer.content"></b-input>
    </div>
    <div id="answers" class="detail-item">
      <Answer v-for="answer in answers"
      :key="answer._id"
      :answer="answer"
      :questionId="questionId"
      class="answer"/>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Answer from '@/components/Answer.vue'
export default {
  data () {
    return {
      questionId: '',
      modalActive: false,
      inputAnswer: {
        content: ''
      }
    }
  },
  created () {
    this.questionId = this.$route.params.id
    this.$store.dispatch('fetchQuestions')
      .then(({ data }) => {
        this.$store.commit('STOREQUESTIONS', data)
        this.$store.commit('STOREDETAIL', this.questionId)
        return this.$store.dispatch('fetchAnswers', this.questionId)
      })
      .then(({ data }) => {
        this.$store.commit('STOREANSWERS', data)
      })
      .catch(err => this.$toast.open({ message: err.response.data.message, type: 'is-danger' }))
  },
  computed: {
    ...mapState(['detailedQuestion', 'answers'])
  },
  methods: {
    addAnswer () {
      let input = {
        id: this.detailedQuestion._id,
        content: this.inputAnswer.content
      }
      this.$store.dispatch('createAnswer', input)
        .then(({ data }) => {
          this.$toast.open({ message: 'Answer posted !', type: 'is-success' })
          this.inputAnswer.content = ''
          return this.$store.dispatch('fetchAnswers', this.questionId)
        })
        .then(({ data }) => {
          this.$store.commit('STOREANSWERS', data)
        })
        .catch(err => {
          this.$toast.open({ message: err.response.data.message, type: 'is-danger' })
        })
    },
    ...mapMutations(['STOREDETAIL'])
  },
  components: {
    Answer
  }
}
</script>

<style lang="scss" scoped>
  $primary: #311B92;
  .answer:last-child {
    margin-bottom: 30px;
  }
  #textarea {
    margin: 20px auto;
  }
  #create-button{
    padding: 5px 15px;
    background-color: $primary;
    border: 1px solid $primary;
    border-radius: 8px;
    color: white;
    transition-duration: 0.2s;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  #container-button {
    display: flex;
    align-items: flex-end;
    margin-bottom: 10px;
    justify-content: space-between;
  }
  #create-button:hover{
    background-color: white;
    transition-duration: 0.2s;
    color: $primary;
    cursor: pointer;
  }
  #title-container {
    border: none;
    border-bottom: 2px solid $primary;
    border-radius: 0;
  }
  #content {
    font-size: 14px;
  }
  #by {
    color: $primary;
    text-align: right;
  }
  #detail-container {
    width: 60%;
    height: 100%;
    border-right: 1px solid black;
    border-left: 1px solid black;
    margin: 0 auto;
    overflow-y: auto;
    padding: 25px;
    padding-bottom: 90px;
    background-color: #FAFAFB;
  }

  #detail-container::-webkit-scrollbar {
    width: 10px;
  }

  #detail-container::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-right: 1px solid $primary;
  }

  #detail-container::-webkit-scrollbar-thumb {
    background: $primary  ;
  }
  .detail-item {
    border: 2px solid $primary;
    border-radius: 5px;
    padding: 10px;
  }
  .label {
    font-size: 16px;
    font-weight: bold;
  }
</style>
