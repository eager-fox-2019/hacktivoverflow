<template>
  <div style="display:flex" v-if="question.length != 0">
    <div class="col-6" v-if="islogin">
      <h2 style="text-align:center">{{ question.title }}</h2>
      <br />
      <div style="display:flex;flex-direction:column">
        <div class="card" style="width: 600px;cursor:pointer" v-on:click="detail(question._id)">
          <div class="card-header" style="height:47px">{{ question.title }}</div>
          <div class="card-body">
            <blockquote class="blockquote mb-0">
              <p>{{ question.description }}</p>
              <footer class="blockquote-footer">
                Created by
                <cite
                  title="Source Title"
                >{{ question.UserId.name }} in {{ question.category }}</cite>
              </footer>
            </blockquote>
          </div>
        </div>
        <div v-if="islogin">
          <p class="header">Your Answer</p>
          <div id="answerQuestion">
            <form @submit.prevent="postAnswer">
              <div class="form-group">
                <label for="answerTitle">Title</label>
                <input
                  v-model="answer.title"
                  type="text"
                  class="form-control"
                  id="answerTitle"
                  placeholder="Title"
                />
              </div>
              <div class="form-group">
                <label for="answerQuestion">Answer</label>
                <textarea
                  v-model="answer.description"
                  class="form-control"
                  id="answerQuestion"
                  rows="6"
                  placeholder="Answer.."
                ></textarea>
              </div>
              <button type="submit" class="btn btn-dark">Answer!</button>
              <p v-if="error.length != 0" style="color:red">{{ error }}</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "question-detail",
  props: ["islogin"],
  data() {
    return {
      question: "",
      answer: {
        title: "",
        description: ""
      },
      error: "",
    };
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
      this.$router.push(`/questions/${id}`);
    },
    fetchQuestion() {
      axios({
        method: "GET",
        url: `${this.url}/question?search=${this.$route.params.id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          console.log(data[0]);
          this.question = data[0];
        })
        .catch(error => {
          console.log(error);
        });
    },
    postAnswer() {
      axios({
        method: "POST",
        url: `${this.url}/answer/${this.$route.params.id}`,
        data: {
          title: this.answer.title,
          description: this.answer.description
        },
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.clearAll();
          console.log(data);
        })
        .catch(error => {
          this.error = error.response.data.message;
          console.log(error);
        });
    },
    clearAll() {
      this.answer.title = "";
      this.answer.description = "";
      this.error = "";
    }
  },
  created() {
    this.fetchQuestion();
  }
};
</script>
<style>
#answerQuestion {
  display: flex;
  justify-content: center;
}
.form-group {
  width: 350px;
}
.header {
  text-align: center;
  font-size: 22px;
}
</style>