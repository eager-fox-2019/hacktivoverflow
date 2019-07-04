<template>
  <div class="row">
    <div class="col s2 m2 l2">
      <div class="row">
        <span @click="upvotes_question(question_detail.author)">
        <i class="material-icons">thumb_up</i></span>
      </div>
      <div class="row">
<!-- {{question_detail.upvotes}} -->
        <h5>{{ upvoteValue}} {{downvoteValue }}</h5>
      </div>
      <div class="row">
        <span @click="downvotes_question(question_detail._id)">
        <i class="material-icons">thumb_down</i></span>
      </div>
    </div>
    <div class="col m10 l10 s10">
            <p v-html="question_detail.description"></p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['question_detail'],
  data() {
    return {
      upvoteValue: this.question_detail.upvotes,
      downvoteValue: this.question_detail.downvotes
    }
  },
  methods: {
    upvotes_question (id) {
      this.$emit('upvotes_question', id)
      // console.log("upvotes", id)
      // upvotesquestion
    },
    downvotes_question (id) {
      // console.log("downvotes", id)
      this.$emit('downvotes_question', id)
    }
  },
};
</script>

<style scope>
span {
  cursor: pointer;
}
</style>
