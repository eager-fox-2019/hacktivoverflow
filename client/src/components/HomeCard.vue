<template>
  <div class="card" style="width: 300px;cursor:pointer" v-on:click="detail(question._id)">
    <div class="card-header" style="height:47px">{{ question.category }}</div>
    <div class="card-body">
      <blockquote class="blockquote mb-0">
        <p>{{ question.title }}</p>
        <footer class="blockquote-footer">
          Created by
          <cite title="Source Title">{{ question.UserId.name }}</cite>
        </footer>
        <br />
        Vote: {{ question.upvotes.length - question.downvotes.length }}
      </blockquote>
    </div>
  </div>
</template>
<script>
export default {
  name: "home-card",
  props: ["question"],
  data() {
    return {};
  },
  components: {},
  computed: {
  },
  methods: {
    detail(id) {
      this.$router.push({ path: `/questions/${id}` });
    }
  },
  created() {
  }
};
</script>
<style>
.card {
  margin-bottom: 15px;
  margin-right: 5px;
}
</style>