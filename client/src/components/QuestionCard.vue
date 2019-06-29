<template>
  <div class="question d-flex flex-row" style="border-bottom: 1px solid grey" >
    <div class="sides-info d-flex flex-column col-1 justify-content-center p-3" style="border-right: 1px solid grey">
      <div>
        <h4>{{question.upvote.length - question.downvote.length}}</h4>
        <p>Votes</p>
      </div>
      <div>
        <h4>{{question.answer.length}}</h4>
        <p style="margin: 0">Answers</p>
      </div>
    </div>
    <div class="detail-info col d-flex flex-column justify-content-between p-3" style="text-align: left">
      <div>
        <a :href="`/question/${question._id}`" style="text-decoration: none; font-size: 20px">{{question.title}}</a>
        <p v-if="question.desc.length < 200">{{question.desc}}</p>
        <p v-else>{{question.desc.slice(0,200)}}...</p>
      </div>
      <div>
        <p v-if="question.user.email != $store.state.user.email" style="margin: 0">Asked by: {{question.user.name}}</p>
        <p v-else style="margin: 0">Asked by: You</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    question: Object
  }
}
</script>

<style>

</style>
