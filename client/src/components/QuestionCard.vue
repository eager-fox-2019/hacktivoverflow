<template>
  <div class="card" style="width: 600px;">
    <div class="card-header" style="height:47px">{{ question.title }}</div>
    <div class="card-body">
      <blockquote class="blockquote mb-0">
        <p>{{ question.description }}</p>
        <footer class="blockquote-footer">
          Created by
          <cite title="Source Title">{{ question.UserId.name }} in {{ question.category }}</cite>
        </footer>
      </blockquote>
      <br />
      <button
        @click="addUpvote"
        type="button"
        class="btn btn-primary"
        style="margin-right:10px;height:40px;width:40px"
      >+</button>
      {{ question.upvotes.length - question.downvotes.length}}
      <button
        @click="addDownvote"
        type="button"
        class="btn btn-danger"
        style="margin-left:10px;height:40px;width:40px"
      >-</button>
      <br />
      <br />
      <EditQuestion
        v-if="userId == question.UserId._id"
        @fetchQuestion="fetchQuestion"
        :question="question"
      ></EditQuestion>
    </div>
  </div>
</template>
<script>
import EditQuestion from "@/components/EditQuestion.vue";
export default {
  name: "question-card",
  props: ["question"],
  data() {
    return {
      error: ""
    };
  },
  components: {
    EditQuestion
  },
  computed: {
    url() {
      return this.$store.state.url;
    },
    userId() {
      return this.$store.state.id;
    }
  },
  methods: {
    fetchQuestion() {
      this.$emit("fetchQuestion");
    },
    addUpvote() {
      axios({
        method: "PATCH",
        url: `${this.url}/question/upvote/${this.$route.params.id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.$emit("fetchQuestion");
        })
        .catch(error => {
          console.log(error);
          this.error = error.response.data.message;
        });
    },
    addDownvote() {
      axios({
        method: "PATCH",
        url: `${this.url}/question/downvote/${this.$route.params.id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.$emit("fetchQuestion");
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
