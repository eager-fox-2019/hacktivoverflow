<template>
  <v-layout class="answer-container">
    <v-flex xs2 text-xs-center class="votes-container py-4">
      <div><i @click="upvote" class="material-icons votes-icon-up">thumb_up</i></div>
      <div class="votes-diff">{{votesDiff}}</div>
      <div><i @click="downvote" class="material-icons votes-icon-down">thumb_down</i></div>
    </v-flex>
    <v-flex xs10 class="py-4 px-4">
      <small>Author: {{answer.author.firstName+ ' ' + answer.author.lastName}}</small>
      <h6 class="title my-2">{{answer.title}}</h6>
      <p class="body-1" v-html="answer.description"></p>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    props: ['answer'],
    data() {
      return {
        upvoteAmount: 0,
        downvoteAmount: 0
      }
    },
    methods: {
      upvote() {
        for (let i = 0; i < this.answer.upvotes.length; i++) {
          if (this.answer.upvotes[i].includes(localStorage.getItem('_id'))) {
            this.upvoteAmount = 1;
            break;
          }
        }
        if (this.upvoteAmount < 1) {
          let index = -1;
          for (let i = 0; i < this.answer.downvotes.length; i++) {
            if (this.answer.downvotes[i].includes(localStorage.getItem('_id'))) {
              index = i;
            }
          }
          if (index != -1) {
            this.answer.downvotes.splice(index, 1);
            this.downvoteAmount = 0;
          }
          this.answer.upvotes.push(localStorage.getItem('_id'));
          this.$store.dispatch('updateanswer', this.answer);
        }
      },
      downvote() {
        for (let i = 0; i < this.answer.downvotes.length; i++) {
          if (this.answer.downvotes[i].includes(localStorage.getItem('_id'))) {
            this.downvoteAmount = 1;
            break;
          }
        }
        if (this.downvoteAmount < 1) {
          let index = -1;
          for (let i = 0; i < this.answer.upvotes.length; i++) {
            if (this.answer.upvotes[i].includes(localStorage.getItem('_id'))) {
              index = i;
            }
          }
          if (index != -1) {
            this.answer.upvotes.splice(index, 1);
            this.upvoteAmount = 0;
          }
          this.answer.downvotes.push(localStorage.getItem('_id'));
          this.$store.dispatch('updateAnswer', this.answer);
        }
      }
    },
    computed: {
      votesDiff() {
        return this.answer.upvotes.length - this.answer.downvotes.length
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
    font-size: 2rem;
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

  .answer-container {
    padding-left: 50px;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #ddd;
    max-height: 300px;
  }

  .votes-container {
    border-right: 1px solid #ddd;
  }
</style>
