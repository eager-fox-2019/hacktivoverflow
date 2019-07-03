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
      </v-flex>
    </v-layout>
    <v-layout class="answer-text-container">
      <p class="answer-text">
        {{question.answers.length}} Answer
      </p>
    </v-layout>
    <v-layout v-if="isAddAnswer">
      <AddAnswerForm :question="question"></AddAnswerForm>
    </v-layout>
    <v-layout>
      <Answer v-for="answer in question.answers" :key="answer._id" :answer="answer"></Answer>
    </v-layout>
  </div>
</template>

<script>
  import Answer from './Answer'
  import AddAnswerForm from './AddAnswerForm'
  export default {
    components: {
      Answer,
      AddAnswerForm
    },
    props: ['question'],
    data() {
      return {
        isAddAnswer: false,
        addAnswerText: 'Add Answer',
        upvoteAmount: 0,
        downvoteAmount: 0
      }
    },
    methods: {
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
    border-top: 1px solid #aaa;
    border-bottom: 1px solid #ddd;
    min-height: 400px;
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
    border-bottom: 1px solid #aaa;
  }

  .answer-text {
    font-size: 1.8rem;
  }
</style>
