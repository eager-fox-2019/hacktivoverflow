<template>
  <div>
    <p v-if="error.length != 0" style="color:red;text-align:center">{{ error }}</p>
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
              <br />
              <li v-if="userId == question.UserId._id" class="list-group-item">
                <button
                  type="button"
                  class="btn btn-secondary"
                  style="margin-right:10px"
                  data-toggle="collapse"
                  :data-target="`#a${question._id}`"
                  aria-expanded="false"
                >Edit</button>
                <button
                  type="button"
                  class="btn btn-danger"
                  v-on:click="deleteQuestion(question._id)"
                >Delete</button>
                <div class="collapse" :id="`a${question._id}`" style="margin-top:30px">
                  <div class="card card-body">
                    <form @submit.prevent="editQuestion(question)">
                      <div class="form-group">
                        <label :for="`#${question._id}title`">Edit Title</label>
                        <input
                          type="text"
                          class="form-control"
                          :id="`${question._id}title`"
                          v-model="question.title"
                        />
                      </div>
                      <div class="form-group">
                        <label :for="`#${question._id}category`">Edit Category</label>
                        <input
                          type="text"
                          class="form-control"
                          :id="`${question._id}category`"
                          v-model="question.category"
                        />
                      </div>
                      <div class="form-group">
                        <label :for="`#${question._id}question`">Edit Question</label>
                        <input
                          type="text"
                          class="form-control"
                          :id="`${question._id}question`"
                          v-model="question.description"
                        />
                      </div>
                      <button type="submit" class="btn btn-secondary">Edit</button>
                    </form>
                  </div>
                </div>
              </li>
            </div>
          </div>
          <div v-if="islogin" style="margin-top:20px">
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
                    v-model="answer.comment"
                    class="form-control"
                    id="answerQuestion"
                    rows="4"
                    placeholder="Answer.."
                  ></textarea>
                </div>
                <button type="submit" class="btn btn-dark">Answer!</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <h2 style="text-align:center">Answers</h2>
        <br />
        <div v-for="answer in answers" :key="answer._id">
          <div
            class="card"
            style="display:flex;justify-content:center;flex-direction:column;width: auto;"
          >
            <div class="card-header">{{answer.title}}</div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                {{answer.comment}}
                <br />
                <cite title="Source Title">
                  Created at {{ answer.created_at }}
                  <br />
                  by {{ answer.UserId.name }}
                </cite>
              </li>
              <li v-if="userId == answer.UserId._id" class="list-group-item">
                <button
                  type="button"
                  class="btn btn-secondary"
                  style="margin-right:10px"
                  data-toggle="collapse"
                  :data-target="`#a${answer._id}`"
                  aria-expanded="false"
                >Edit</button>
                <button
                  type="button"
                  class="btn btn-danger"
                  v-on:click="deleteAnswer(answer._id)"
                >Delete</button>
                <div class="collapse" :id="`a${answer._id}`" style="margin-top:30px">
                  <div class="card card-body">
                    <form @submit.prevent="editAnswer(answer)">
                      <div class="form-group">
                        <label :for="`#${answer._id}title`">Edit Title</label>
                        <input
                          type="text"
                          class="form-control"
                          :id="`${answer._id}title`"
                          v-model="answer.title"
                        />
                      </div>
                      <div class="form-group">
                        <label :for="`#${answer._id}comment`">Edit Answer</label>
                        <input
                          type="text"
                          class="form-control"
                          :id="`${answer._id}comment`"
                          v-model="answer.comment"
                        />
                      </div>
                      <button type="submit" class="btn btn-secondary">Edit</button>
                    </form>
                  </div>
                </div>
              </li>
            </ul>
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
        comment: ""
      },
      answers: [],
      error: ""
    };
  },
  components: {},
  computed: {
    url() {
      return this.$store.state.url;
    },
    userId() {
      return this.$store.state.id;
    }
  },
  methods: {
    editQuestion(editQ) {
      axios({
        method: "PATCH",
        url: `${this.url}/question/${this.$route.params.id}`,
        data: {
          title: editQ.title,
          description: editQ.description,
          category: editQ.category
        },
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.clearAll();
          this.fetchQuestion();
          let hiding = (document.getElementById(`a${editQ._id}`).className =
            "collapse");
          console.log(hiding);
        })
        .catch(error => {
          this.error = error.response.data.message;
          console.log(error);
        });
    },
    deleteQuestion() {
      console.log(this.$route.params.id, "====");
      axios({
        method: "DELETE",
        url: `${this.url}/question/${this.$route.params.id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          console.log(data);
          this.clearAll();
          this.$router.push("/questions");
        })
        .catch(error => {
          this.error = error.response.data.message;
          console.log(error);
        });
    },
    editAnswer(ans) {
      axios({
        method: "PATCH",
        url: `${this.url}/answer/${ans._id}`,
        data: {
          title: ans.title,
          comment: ans.comment
        },
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.clearAll();
          this.fetchQuestion();
          let hiding = (document.getElementById(`a${ans._id}`).className =
            "collapse");
          console.log(hiding);
        })
        .catch(error => {
          this.error = error.response.data.message;
          console.log(error);
        });
    },
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
          return axios({
            method: "GET",
            url: `${this.url}/answer/${this.$route.params.id}`,
            headers: {
              token: localStorage.getItem("token")
            }
          });
        })
        .then(({ data }) => {
          this.answers = data;
          console.log(data);
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
          comment: this.answer.comment
        },
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.clearAll();
          this.fetchQuestion();
          console.log(data);
        })
        .catch(error => {
          this.error = error.response.data.message;
          console.log(error);
        });
    },
    deleteAnswer(id) {
      axios({
        method: "DELETE",
        url: `${this.url}/answer/${id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.clearAll();
          this.fetchQuestion();
          console.log(data);
        })
        .catch(error => {
          this.error = error.response.data.message;
          console.log(error);
        });
    },
    clearAll() {
      this.answer.title = "";
      this.answer.comment = "";
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