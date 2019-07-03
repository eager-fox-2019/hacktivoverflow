<template>
  <div
    class="card text-white bg-dark mb-3"
    style="width: 300px;cursor:pointer"
    v-on:click="detail(question._id)"
  >
    <div class="card-header" style="height:47px">Question: {{ question.title }}</div>
    <div class="card-body" style="color:black">
      <ul class="list-group list-group-flush">
        <li class="list-group-item" style="border-radius:10px;margin-bottom:5px;background-color:lightgrey">Category: {{ question.category }}</li>
        <li class="list-group-item" style="border-radius:10px;margin-bottom:5px">Votes: {{ question.upvotes.length - question.downvotes.length }}</li>
        <li class="list-group-item" style="border-radius:10px;margin-bottom:5px">
          <small>
            By
            {{ question.UserId.name }} at {{ question.created_at.slice(0,10) }}
          </small>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'home-card',
  props: ['question'],
  data () {
    return {}
  },
  components: {},
  computed: {},
  methods: {
    detail (id) {
      this.$router.push({ path: `/questions/${id}` })
    }
  },
  created () {}
}
</script>
<style>
.card {
  margin-bottom: 15px;
  margin-right: 5px;
}
</style>
