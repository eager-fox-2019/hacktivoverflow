<template>
  <div class="btnGroup d-flex flex-column">
    <b-button @click="upvote"><img src="../assets/arrow-up.png"></b-button>
    <b-button disabled>{{totalVotes}}</b-button>
    <b-button @click="downvote"><img src="../assets/arrow-down.png"></b-button>
  </div>
</template>

<script>
export default {
  name: 'VoteButtons',
  props: ['totalVotes'],
  methods:{
    upvote(){
      this.$emit('upvote')
    },
    downvote(){
      this.$emit('downvote')
    }
  }
}
</script>

<style scoped>
.btn{
  width: 3em;
  margin: 0;
  border-radius: 0;
}

.btn img {
  width: 1em;
  margin: 0;
  padding: 0;
}

</style>
