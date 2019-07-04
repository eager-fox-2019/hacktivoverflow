<template>
  <div>
    <div class="column is-9 card" id="q">
      <div class="columns">
        <div class="column is-1">
          <div class="button" @click="upvote(q._id)">
            <i style="font-size:25px" class="fas fa-arrow-circle-up"></i>
          </div>
          <div>
            <b style="font-size:30px">{{totalvotes}}</b>
          </div>
          <div class="button" @click="downvote(q._id)">
            <i style="font-size:25px" class="fas fa-arrow-circle-down"></i>
          </div>
        </div>
        <div class="column is-9 card-content" id='card' @click="$router.push('/one')">
            <div class="content">
              <b style="font-size: 25px;">{{q.title}}</b>
            </div>
            <small>Asked by {{q.userId.userName}}</small>
        </div>
        <div class="column is-2">
          <div style="margin-top: 20px">
            <strong>Answers:</strong>
          </div>
          <div>
            <b style="font-size:30px">{{totalanswers}}</b>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["q"],
  methods: {
    upvote(data) {
      this.$store.dispatch("UPVOTEQUESTION", data);
    },
    downvote(data) {
      this.$store.dispatch("DOWNVOTEQUESTION", data);
    }
  },
  computed: {
    totalvotes() {
      return this.q.upvotes.length - this.q.downvotes.length;
    },
    totalanswers() {
      return this.q.answers.length
    },
    currentUser() {
      return this.$store.state.user.id;
    }
  }
};
</script>

<style scoped>
#q:hover {
  transform: scale(1.02);
}
#card {
  color: black;
}
</style>
