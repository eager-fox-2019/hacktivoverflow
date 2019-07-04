<template>
  <div>
    <div class="column is-8 box is-offset-1" id="a">
      <div class="columns">
        <div class="column is-1">
          <div class="button" @click="upvote(a._id)">
            <i style="font-size:20px" class="fas fa-arrow-circle-up"></i>
          </div>
          <div>
            <b style="font-size:20px">{{totalvotes}}</b>
          </div>
          <div class="button" @click="downvote(a._id)">
            <i style="font-size:20px" class="fas fa-arrow-circle-down"></i>
          </div>
        </div>
        <div class="column box-content">
          <div class="content">
            <b style="font-size: 20px;">{{a.title}}</b>
            <p>{{a.desc}}</p>
          </div>
          <small>Answer by <i>{{a.userId.userName}}</i></small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["a"],
  methods: {
    upvote(id) {
      this.$store.dispatch("UPVOTEANSWER", id);
    },
    downvote(id) {
      this.$store.dispatch("DOWNVOTEANSWER", id);
    }
  },
  computed: {
      totalvotes(){
          return this.a.upvotes.length - this.a.downvotes.length
      }
  },
};
</script>

<style scoped>
#a:hover {
  transform: scale(1.02);
}
</style>
