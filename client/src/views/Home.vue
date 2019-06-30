<template>
  <div style="display:flex">
    <div class="col-9" v-if="islogin">
      <h2 style="text-align:center">Questions</h2>
      <br />
      <div style="display:flex;flex-direction:row;flex-wrap:wrap;">
        <div class="col-4" v-for="question in questions">
          <div class="card" style="width: 300px;cursor:pointer" v-on:click="detail(question._id)">
            <div class="card-header" style="height:47px">{{ question.category }}</div>
            <div class="card-body">
              <blockquote class="blockquote mb-0">
                <p>{{ question.title }}</p>
                <footer class="blockquote-footer">
                  Created by
                  <cite title="Source Title">{{ question.UserId.name }}</cite>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-3">
      <h2 style="text-align:center">Categories</h2>
      <br />
      <div class="card" style="width: 18rem;">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Cras justo odio</li>
          <li class="list-group-item">Dapibus ac facilisis in</li>
          <li class="list-group-item">Vestibulum at eros</li>
          <li class="list-group-item">Cras justo odio</li>
          <li class="list-group-item">Dapibus ac facilisis in</li>
          <li class="list-group-item">Vestibulum at eros</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "home",
  props: ["islogin"],
  data() {
    return {};
  },
  components: {},
  computed: {
    url() {
      return this.$store.state.url;
    },
    questions() {
      return this.$store.state.questions;
    }
  },
  methods: {
    detail(id) {
      this.$router.push({ path: `/questions/${id}` });
    },
    fetchQuestions() {
      this.$store
        .dispatch("FETCHQUESTIONS")
        .then(({ data }) => {
          this.$store.commit("ALLQUESTIONS", data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.fetchQuestions();
  }
};
</script>
<style>
.card {
  margin-bottom: 15px;
  margin-right: 5px;
}
</style>