<template>
  <div>
    <v-layout class="question-container">
      <v-flex xs2 text-xs-center class="votes-container py-4">
        <div><i @click="upvote" class="material-icons votes-icon-up">thumb_up</i></div>
        <div class="votes-diff">{{votesDiff}}</div>
        <div><i @click="downvote" class="material-icons votes-icon-down">thumb_down</i></div>
      </v-flex>
      <v-flex xs10 class="py-4 px-4">
        <small>Author: {{question.author.firstName+' '+question.author.lastName}}</small>
        <h4 class="display-1 my-2">{{question.title}}</h4>
        <p class="question-text" v-html="question.description"></p>
        <v-btn @click="addAnswer" color="info">{{addAnswerText}}</v-btn>
        <v-btn v-if="userId == question.author._id" color="warning" @click="showEditForm">Edit</v-btn>
        <DeleteModalQuestion v-if="userId == question.author._id" :question="question"></DeleteModalQuestion>
        <!-- <v-btn >Delete</v-btn> -->
      </v-flex>
    </v-layout>
    <v-layout class="answer-text-container">
      <p class="answer-text">
        {{question.answers.length}} Answer(s)
        <v-btn @click="hideAnswer" flat>{{showAnswerText}}</v-btn>
      </p>
    </v-layout>
    <v-layout v-if="isAddAnswer">
      <AddAnswerForm :question="question"></AddAnswerForm>
    </v-layout>
    <div v-if="isShowAnswer">
      <v-layout v-for="answer in question.answers" :key="answer._id">
      <Answer :answer="answer"></Answer>
      </v-layout>
    </div>
  </div>
</template>

<script>
  import Answer from './Answer'
  import DeleteModalQuestion from './DeleteModalQuestion'
  import AddAnswerForm from './AddAnswerForm'
  import Swal from 'sweetalert2'
  export default {
    components: {
      Answer,
      AddAnswerForm,
      DeleteModalQuestion
    },
    props: ['question'],
    data() {
      return {
        isAddAnswer: false,
        addAnswerText: 'Add Answer',
        upvoteAmount: 0,
        downvoteAmount: 0,
        isShowAnswer: false,
        showAnswerText: 'Show Answer',
        userId: localStorage.getItem('_id')
      }
    },
    methods: {
      hideAnswer() {
        if (this.question.answers.length != 0) {
          if (this.isShowAnswer) {
            this.isShowAnswer = false;
            this.showAnswerText = 'Show Answer'
          } else {
            this.isShowAnswer = true;
            this.showAnswerText = 'Hide Answer'
          }
        } else {
          Swal.fire('This post has no answer yet')
        }
      },
      addAnswer() {
        if (this.isAddAnswer) {
          this.isAddAnswer = false;
          this.addAnswerText = 'Add Answer'
        } else {
          this.isAddAnswer = true;
          this.addAnswerText = 'Close Form'
        }
      },
      upvote() {
        for (let i = 0; i < this.question.upvotes.length; i++) {
          if (this.question.upvotes[i].includes(localStorage.getItem('_id'))) {
            this.upvoteAmount = 1;
            break;
          }
        }
        if (this.upvoteAmount < 1) {
          let index = -1;
          for (let i = 0; i < this.question.downvotes.length; i++) {
            if (this.question.downvotes[i].includes(localStorage.getItem('_id'))) {
              index = i;
            }
          }
          if (index != -1) {
            this.question.downvotes.splice(index, 1);
            this.downvoteAmount = 0;
          }
          this.question.upvotes.push(localStorage.getItem('_id'));
          this.$store.dispatch('updateQuestion', this.question);
        }
      },
      downvote() {
        for (let i = 0; i < this.question.downvotes.length; i++) {
          if (this.question.downvotes[i].includes(localStorage.getItem('_id'))) {
            this.downvoteAmount = 1;
            break;
          }
        }
        if (this.downvoteAmount < 1) {
          let index = -1;
          for (let i = 0; i < this.question.upvotes.length; i++) {
            if (this.question.upvotes[i].includes(localStorage.getItem('_id'))) {
              index = i;
            }
          }
          if (index != -1) {
            this.question.upvotes.splice(index, 1);
            this.upvoteAmount = 0;
          }
          this.question.downvotes.push(localStorage.getItem('_id'));
          this.$store.dispatch('updateQuestion', this.question);
        }
      },
      showEditForm() {
        this.$store.commit('SETSELECTEDQUESTION', this.question);
        this.$router.push('/edit_question');
      }
    },
    computed: {
      votesDiff() {
        return this.question.upvotes.length - this.question.downvotes.length
      }
    }
  }
</script>

<style scoped>
  .votes-diff {
    font-size: 2.5rem;
  }

  .votes-icon-up,
  .votes-icon-down {
    font-size: 2.5rem;
    color: #444;
  }

  .votes-icon-up:hover {
    color: #1E88E5;
    cursor: pointer;
  }

  .votes-icon-down:hover {
    color: #E53935;
    cursor: pointer;
  }

  .question-container {
    margin-top: 50px;
    border-bottom: 1px solid #ddd;
    min-height: 400px;
    background-color: white;
  }

  .votes-container {
    border-right: 1px solid #ddd;
  }

  .question-text {
    margin-bottom: 50px;
  }

  .answer-text-container {
    width: 100%;
    padding: 20px 0px 0px 20px;
    background-color: white;
  }

  .answer-text {
    font-size: 1.8rem;
  }
</style>
