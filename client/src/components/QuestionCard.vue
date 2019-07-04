<template>
  <div class="row">
    <hr>
    <div class="col s2 m2 l2">
      <div class="row">
        <h5>{{ (question.upvotes.length - question.downvotes.length) }}</h5>
        <span>votes</span>
      </div>
      <div class="row">
        <h5>{{ question.answers.length }}</h5>
        <span>answers</span>
      </div>
    </div>
    <div class="col m10 l10 s10">
      <h6 @click="show_detail(question._id)" class="title_link left border blue-text">{{ question.title }}</h6>
      <br />
      <p v-html="question.description"></p>
      <br />
      <div id="authordisplay" class="row">
        <div class="col s8 m8 l8">
          <div class="left">
            <div class="chip" v-for="(tag, index) in question.tags" :key="index">
              <i class="close material-icons">bookmark</i>{{ tag }}
            </div>
          </div>
        </div>
        <div class="col s4 m4 l4">
          <AuthorCard
            :question="question"
          ></AuthorCard>
        </div>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import TagCard from '@/components/TagCard'
import AuthorCard from '@/components/AuthorCard'

export default {
  props: ['question'],
  components: {
    AuthorCard,
    TagCard
  },
  methods: {
    show_detail (id) {
      console.log(id, "show ini")
      this.$router.push(`/questions/${id}`)
    }
  },
};
</script>

<style>
#authordisplay {
  margin-bottom: 0px;
  padding-bottom: 0px;
}
.title_link {
  cursor: pointer;
}
</style>
