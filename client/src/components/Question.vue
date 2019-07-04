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
        <div class="column is-9 card-content" id="card" @click="$router.push('/one')">
          <div class="content">
            <b style="font-size: 35px;">{{q.title}}</b>
          </div>
          <small>Asked by <i>{{q.userId.userName}}</i></small>
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
      <div class="columns" style="display: flex; justify-content: center; background-color: lightcoral">
        <div v-for="(tag, index) in q.tags" :key="index" class="column is-1">
          <a @click="tagsearch(tag)"><b-tag type="is-primary" rounded>{{tag}}</b-tag></a>
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
    },
    tagsearch(tag){
      this.$store.dispatch("TAGQUESTION", tag);
      this.$router.push('/all')
    }
  },
  computed: {
    totalvotes() {
      return this.q.upvotes.length - this.q.downvotes.length;
    },
    totalanswers() {
      return this.q.answers.length;
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
