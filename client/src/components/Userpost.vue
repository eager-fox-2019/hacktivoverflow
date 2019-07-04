<template>
  <div>
    <div class="column is-10 box" id="p">
        <div class="columns">
          <div class="column is-2">
            <div>
              <b style="font-size:20px">Up Votes: {{upvotes}}</b>
            </div>
            <div>
              <b style="font-size:20px">Total Votes: {{totalvotes}}</b>
            </div>
            <div>
              <b style="font-size:20px">Down Votes: {{downvotes}}</b>
            </div>
          </div>
          <div class="column is-9 box-content" @click="$router.push('/one')">
            <div class="content">
              <b style="font-size: 25px;">{{p.title}}</b>
            </div>
            <small>Asked by {{p.userId.userName}}</small>
          </div>
          <div>
            <div class="column is-1" style="margin-top: 5px">
              <div class="button" @click="editt(p._id)">
                <i style="font-size:30px" class="fas fa-edit"></i>
              </div>
              <div class="button" @click="delet(p._id)" style="margin-top: 10px">
                <i style="font-size:30px" class="fas fa-trash"></i>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["p"],
  methods: {
      editt(id){
        this.$store.dispatch('ONEQUESTION', id)
        this.$router.push('/edit')
      },
      delet(id){
          this.$store.dispatch('DELETEQUESTION', id)
      }
  },
  computed: {
    totalvotes() {
      return this.p.upvotes.length - this.p.downvotes.length;
    },
    upvotes() {
      return this.p.upvotes.length
    },
    downvotes() {
      return this.p.downvotes.length;
    }
  }
};
</script>

<style scoped>
#p:hover {
  transform: scale(1.02);
}
</style>
