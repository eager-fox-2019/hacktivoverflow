<template>
  <div>
    <div class="card" style="width: 100%">
      <div class="card-body">
        <h5 class="card-title">Watched Tags</h5>
        <template>
          <div>
            <vue-tags-input v-model="tag" :tags="tags" @tags-changed="newTags => tags = newTags" />
          </div>
        </template>
        <button @click="updateTag" type="button" class="btn btn-primary">Update</button>
      </div>
    </div>
    <div v-if="showAlert" class="alert alert-success mt-3" role="alert">Update Success</div>
    <button
      v-if="isOwner"
      @click="deleteQuestion"
      type="button"
      class="btn btn-danger"
    >Delete Question</button>
  </div>
</template>

<script>
import VueTagsInput from "@johmun/vue-tags-input";
import axios from "@/api/server.js";
export default {
  components: {
    VueTagsInput
  },
  data() {
    return {
      tag: "",
      tags: [],
      showAlert: false,
      isOwner: false
    };
  },
  created() {
    let token = localStorage.getItem("token");
    axios
      .get("/users", { headers: { token } })
      .then(({ data }) => {
        this.$store.commit("getTag", data.tags);
        this.tags = data.tags;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    updateTag() {
      let token = localStorage.getItem("token");
      axios
        .put("/users", { tags: this.tags }, { headers: { token } })
        .then(({ data }) => {
          this.tags = data.tags;
          this.showAlert = true;
          this.$store.commit('tagChange', data.tags)
          setTimeout(() => {
            this.showAlert = false;
          }, 1000);
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteQuestion() {
      let token = localStorage.getItem("token");
      axios
        .delete(`questions/${this.$route.params.id}`, { headers: { token } })
        .then(() => {
          Swal.fire({
            position: "center",
            type: "success",
            title: "You deleted a question",
            showConfirmButton: false,
            timer: 1500
          });
          this.$router.push("/home");
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.$store.state.questions.forEach(el => {
      if (el._id == this.$route.params.id && el.userId == localStorage.getItem('userId')) {
        this.isOwner = true
      }
    });
  }
};
</script>

<style scoped>
h5 {
  text-align: center;
  background-color: #f7f1d5;
  padding: 7px;
  margin-bottom: 10px;
  color: #a98067;
}
button {
  margin-top: 10px;
  padding: 2px;
  height: 30px;
  width: 100%;
  font-size: 15px;
}
.card {
  background-color: #fff8dc;
}
</style>
