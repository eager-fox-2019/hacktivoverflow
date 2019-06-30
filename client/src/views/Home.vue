<template>
  <div style="display:flex">
    <div class="col-9" v-if="islogin">
      <h2 style="text-align:center">Questions</h2>
      <br />
      <div style="display:flex;flex-direction:row;flex-wrap:wrap;">
        <div class="col-4" v-for="question in questions" :key="question._id">
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
        </div>
      </div>
    </div>
    <div class="col-3">
      <h2 style="text-align:center">Categories</h2>
      <br />
      <div class="card" style="width: 18rem;">
        <ul class="list-group list-group-flush">
          <li
            style="cursor:pointer"
            v-for="category in categories"
            class="list-group-item"
            :key="category"
            v-on:click="filtering(category)"
          >{{ category }}</li>
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
    },
    categories() {
      return this.$store.state.categories;
    }
  },
  methods: {
    filtering(cat) {
      this.fetchQuestions(() => {
        this.$store.commit("CATEGORY", cat);
      });
    },
    detail(id) {
      this.$router.push({ path: `/questions/${id}` });
    },
    fetchQuestions(cb) {
      this.$store
        .dispatch("FETCHQUESTIONS")
        .then(({ data }) => {
          let arr = [];
          data.forEach(x => {
            if (arr.indexOf(x.category) == -1) {
              arr.push(x.category);
            }
          });
          this.$store.commit("FILTER", arr);
          this.$store.commit("ALLQUESTIONS", data);
          if(cb){
            cb()
          }
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