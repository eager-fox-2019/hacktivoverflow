<template>
  <div v-if="islogin">
    <h1>HOME</h1>
    <div v-for="question in questions">
      {{ question.title }} <br>
      {{ question.description }} <br>
      {{ question.UserId.name }} <br>
      {{ question.category }} <br>
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
    fetchQuestions() {
      axios({
        method: "GET",
        url: `${this.url}/question`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.$store.commit("ALLQUESTIONS", data);
          console.log(data);
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