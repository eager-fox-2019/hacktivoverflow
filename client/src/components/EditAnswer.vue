<template>
<div>
      <li class="list-group-item">
        <button
          type="button"
          class="btn btn-secondary"
          style="margin-right:10px"
          data-toggle="collapse"
          :data-target="`#a${answer._id}`"
          aria-expanded="false"
        >Edit</button>
        <button type="button" class="btn btn-danger" v-on:click="deleteAnswer(answer._id)">Delete</button>
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
                  <p v-if="error.length != 0" style="color:red;text-align:center">{{ error }}   <br><br></p>
              <button type="submit" class="btn btn-secondary">Edit</button>
            </form>
          </div>
        </div>
      </li>
  </div>
</template>
<script>
export default {
  name: "answer-edit",
  props: ["answer"],
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
          let hiding = (document.getElementById(`a${ans._id}`).className =
            "collapse");
          this.$emit("fetchQuestion");
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
          this.$emit("fetchQuestion");
        })
        .catch(error => {
          this.error = error.response.data.message;
          console.log(error);
        });
    }
  },
  created() {}
};
</script>
