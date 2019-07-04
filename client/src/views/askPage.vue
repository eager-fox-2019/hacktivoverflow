<template>
    <div id = "askingQuestion">
      <form @submit.prevent = "postQuestion">
        <div class = "form-group">
          <label for = "askTitle">Title : </label>
          <input v-model = "question.title"
            type = "text"
            class = "form-control"
            id = "askTitle"
            placeholder = "Title"
          />
        </div>
        <div class = "form-group">
          <label for = "askQuestion">Question : </label>
          <textarea v-model = "question.description"
            class = "form-control"
            id = "askQuestion"
            placeholder = "Write your Question here..."
          ></textarea>
        </div>
        <button type="submit" class="btn btn-dark">Submit Question</button>
        <p v-if="error.length != 0" style="color:red">{{ error }}</p>
      </form>
  </div>
</template>
<script>
export default {
  name: "ask-component",
  data() {
    return {
      question: {
        title: "",
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
          description: this.question.description
        },
        headers: {
            token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.clearAll();
          this.$router.push("/questions");
        })
        .catch(error => {
          this.error = error.response.data.message;
          console.log(error);
        });
    },
    clearAll() {
      this.question.title = "";
      this.question.description = "";
      this.error = "";
    }
  }
};
</script>

<style>
#askingQuestion {
  margin-top: 50px;
  display: flex;
  justify-content: center;
}
.form-group {
  width: 350px;
}
</style>