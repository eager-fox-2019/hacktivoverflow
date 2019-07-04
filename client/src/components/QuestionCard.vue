<template>
  <div class="qcard">
    <div>
      <div class="qcv" @click="toQuestion">
        {{ question.upvotes.length - question.downvotes.length }}<br>
        <span style="font-size: 0.8rem;">Votes</span>
      </div>
    </div>
    <div>
      <div class="qcardheader" @click="toQuestion">Question: {{ question.title }}</div>
      <div class="qcdesc">{{question.description}}</div>
      <div style="display: flex; flex-wrap: wrap;">
        <div class="tagbtn" v-for="tag of question.tags" :key="tag" @click="$emit('tagselect', tag)">{{tag}}</div>
      </div>
      <div style="margin: 0.7rem 0 0.3rem 0; text-align: right; font-size: 0.85rem; color: #777;">
        asked on: {{ question.created_at.slice(0,10) }} by: <span style="color: #0b56ac">{{ question.UserId.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'question-card',
  props: ['question'],
  methods: {
    toQuestion() {
      this.$emit('detail');
    },
  }
}
</script>

<style>
.qcard {
  display: flex;
  padding: 0.2rem 1rem;
  border-bottom: 1px solid #ccc;
}
.qcv {
  cursor: pointer;
  text-align: center;
  margin-top: 0.5rem;
  margin-right: 1.2rem;
  font-size: 1.2rem;
}
.qcardheader {
  cursor: pointer;
  margin-bottom: 0.2rem;
  color: #0b56ac;
}
.qcdesc {
  font-size: 0.85rem;
  line-height: 1.2rem;
}
</style>
