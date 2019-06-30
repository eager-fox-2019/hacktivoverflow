<template>
  <div style="display:flex">
    <div class="col-9" v-if="islogin">
      <h2 style="text-align:center">Questions</h2>
      <br />
      <div style="display:flex;flex-direction:row;flex-wrap:wrap;">
        <div class="col-4" v-for="question in questions" :key="question._id">
          <HomeCard :question="question"></HomeCard>
        </div>
      </div>
    </div>
    <div class="col-3">
      <h2 style="text-align:center">Categories</h2>
      <br />
      <div class="card" style="width: 18rem;">
        <ul class="list-group list-group-flush">
          <div v-for="category in categories" :key="category">
            <li class="list-group-item">
              <Category @fetchQuestions="fetchQuestions" :category="category"></Category>
            </li>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import HomeCard from "@/components/HomeCard.vue";
import Category from "@/components/Category.vue";
export default {
  name: "home",
  props: ["islogin"],
  data() {
    return {};
  },
  components: {
    HomeCard,
    Category
  },
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
    fetchQuestions(order) {
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
          if (order) {
            this.$store.commit("CATEGORY", order);
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