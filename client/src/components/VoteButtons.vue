<template>
  <div class="btnGroup d-flex flex-column">
    <b-button @click="upvote"><img alt="up" :src="iconup"></b-button>
    <b-button disabled>{{totalVotes}}</b-button>
    <b-button @click="downvote"><img alt="down" :src="icondown"></b-button>
  </div>
</template>
<script>
export default {
  name: 'VoteButtons',
  props: ['totalVotes', 'selected'],
  computed: {
    iconup () {
      if (this.selected === 'up') return require('@/assets/arrow-up-selected.png')
      return require('@/assets/arrow-up.png')
    },
    icondown () {
      if (this.selected === 'down') return require('@/assets/arrow-down-selected.png')
      return require('@/assets/arrow-down.png')
    }
  },
  methods: {
    upvote () {
      this.$emit('upvote')
    },
    downvote () {
      this.$emit('downvote')
    }
  }
}

</script>
<style scoped>
.btn {
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
