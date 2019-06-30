<template>
  <div v-if="islogin">
    <h2 class="header">Ask a Question</h2>
    <div id="askQuestions">
      <form @submit.prevent="postQuestion">
        <div class="form-group">
          <label for="askTitle">Title</label>
          <input
            v-model="question.title"
            type="text"
            class="form-control"
            id="askTitle"
            placeholder="Title"
          />
        </div>

        <div class="form-group">
          <label for="askCategory">Category</label>
          <input
            v-model="question.category"
            type="text"
            class="form-control"
            id="askCategory"
            placeholder="Category"
          />
        </div>
        <div class="form-group">
          <label for="askQuestion">Question</label>
          <textarea
            v-model="question.description"
            class="form-control"
            id="askQuestion"
            rows="6"
            placeholder="Question.."
          ></textarea>
        </div>
        <button type="submit" class="btn btn-dark">Ask!</button>
        <p v-if="error.length != 0" style="color:red">{{ error }}</p>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "ask-view",
  props: ["islogin"],
  data() {
    return {
      question: {
        title: "",
        category: "",
        description: ""
      },
      error: ""
    };
  },
  computed: {
    url() {
      return this.$store.state.url;
    }
  },
  components: {},
  methods: {
    postQuestion() {
      axios({
        method: "POST",
        url: `${this.url}/question`,
        data: {
          title: this.question.title,
          category: this.question.category,
          description: this.question.description
        },
        headers: {
            token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.clearAll();
          console.log(data);
          this.$router.push("/questions");
        })
        .catch(error => {
          this.error = error.response.data.message;
          console.log(error);
        });
    },
    clearAll() {
      this.question.title = "";
      this.question.category = "";
      this.question.description = "";
      this.error = "";
    }
  }
};
</script>

<style>
#askQuestions {
  margin-top: 50px;
  display: flex;
  justify-content: center;
}
.form-group {
  width: 350px;
}
.header {
  text-align: center;
  margin-top: 50px;
  font-weight: 600;
}
</style>