<template>
  <div>
    <li class="list-group-item">
      <button
        type="button"
        class="btn btn-secondary"
        style="margin-right:10px"
        data-toggle="collapse"
        :data-target="`#a${question._id}`"
        aria-expanded="false"
      >Edit</button>
      <button type="button" class="btn btn-danger" v-on:click="deleteQuestion(question._id)">Delete</button>
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
            <p v-if="error.length != 0" style="color:red;text-align:center">
              {{ error }}
              <br />
              <br />
            </p>
            <button type="submit" class="btn btn-secondary">Edit</button>
          </form>
        </div>
      </div>
    </li>
  </div>
</template>
<script>
export default {
  name: "question-edit",
  props: ["question"],
  data() {
    return {
      error: ""
    };
  },
  components: {},
  computed: {
    url() {
      return this.$store.state.url;
    },
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
          this.$emit("fetchQuestion");
          let hiding = (document.getElementById(`a${editQ._id}`).className =
            "collapse");
        })
        .catch(error => {
          console.log(error);
          this.error = error.response.data.message;
        });
    },
    deleteQuestion() {
      axios({
        method: "DELETE",
        url: `${this.url}/question/${this.$route.params.id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.$router.push("/questions");
        })
        .catch(error => {
          console.log(error);
          this.error = error.response.data.message;
        });
    }
  },
  created() {}
};
</script>
