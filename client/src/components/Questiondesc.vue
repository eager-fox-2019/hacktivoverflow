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
          <div class="column card-content">
            <div class="content">
              <b
                style="font-size: 25px;"
              >{{q.title}}</b>
            </div>
            <div class="content">
              <p>{{q.desc}}</p>
            </div>
            <small>Asked by {{q.userId.userName}}</small>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  props:['q'],
  methods: {
    upvote(id) {
      this.$store.dispatch("UPVOTEQUESTION", id);
    },
    downvote(id) {
      this.$store.dispatch("DOWNVOTEQUESTION", id);
    }
  },
  computed: {
      totalvotes(){
          return this.q.upvotes.length - this.q.downvotes.length
      }
  },
};
</script>

<style scoped>
#q:hover {
  transform: scale(1.02);
}
</style>
