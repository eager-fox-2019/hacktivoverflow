<template>
  <div>
    <Navbar></Navbar>
    <div class="row">
      <div class="col-2 side-nav">
        <SideNavbar></SideNavbar>
      </div>
      <div class="col-8 offset-2">
        <form @submit.prevent="create">
          <div class="form-group">
            <label for="exampleInputEmail1">Title</label>
            <input
              v-model="question.title"
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter title"
            />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Description</label>
            <wysiwyg v-model="question.description" />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Tag</label>
            <vue-tags-input
              v-model="tag"
              :tags="question.tags"
              @tags-changed="newTags => question.tags = newTags"
            />
          </div>
          <button v-if="isUpdate" type="submit" class="btn btn-primary">Update</button>
          <button v-if="!isUpdate" type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
      <div class="col-2">
        <WatchedTag></WatchedTag>
      </div>
    </div>
  </div>
</template>

<script>
import VueTagsInput from "@johmun/vue-tags-input";
import "vue-wysiwyg/dist/vueWysiwyg.css";
import axios from "@/api/server.js";
import Navbar from "@/components/Navbar.vue";
import WatchedTag from "@/components/WatchedTag.vue";
import SideNavbar from "@/components/SideNavbar.vue";

export default {
  components: {
    VueTagsInput,
    Navbar,
    WatchedTag,
    SideNavbar
  },
  data() {
    return {
      question: {
        title: "",
        description: "",
        tags: []
      },
      tag: "",
      isUpdate: false
    };
  },
  created() {
    if (this.$route.params.id) {
      this.isUpdate = true;
    }
  },
  methods: {
    create() {
      let token = localStorage.getItem("token");
      if (!this.isUpdate) {
        axios
          .post("/questions", this.question, { headers: { token } })
          .then(({ data }) => {
            Swal.fire({
              position: "center",
              type: "success",
              title: "You created new question",
              showConfirmButton: false,
              timer: 1500
            });
            this.$router.push("/home");
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        axios
          .put(`/questions/${this.$route.params.id}`, this.question, { headers: { token } })
          .then(({ data }) => {
            Swal.fire({
              position: "center",
              type: "success",
              title: "You updated a question",
              showConfirmButton: false,
              timer: 1500
            });
            this.$router.push("/home");
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  mounted() {
    if (this.isUpdate) {
      let token = localStorage.getItem("token");
      this.$store.state.questions.forEach(el => {
        if (el._id == this.$route.params.id) {
          this.question = el;
        }
      });
    }
  }
};
</script>

<style scoped>
.container {
  width: 70%;
}
.row {
  margin: 0 0;
}
.col-2 {
  padding: 5px;
}
.side-nav {
  text-align: center;
  border-right: 1px solid rgb(201, 196, 196);
  height: 100%;
  position: fixed;
  z-index: 1;
  top: 20;
  left: 0;
  overflow-x: hidden;
  padding-top: 20px;
}
</style>
