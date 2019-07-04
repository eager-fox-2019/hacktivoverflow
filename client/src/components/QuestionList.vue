<template>
  <div class="mt-2">
    <div class="row p-3">
      <div class="col-10">
        <h3>All Questions</h3>
      </div>
      <div class="col-2">
        <button @click="create" type="button" class="btn">Ask Question</button>
      </div>
    </div>
    <ul class="list-group list-group-flush">
      <ListByTag v-for="question in getQuestionsByTag" :key="question._id" :question="question"></ListByTag>
    </ul>
    <div class="input-group mb-3">
      <input
        v-model="inputSearch"
        type="text"
        class="form-control"
        placeholder="Title"
        aria-label="Recipient's username"
        aria-describedby="basic-addon2"
      />
      <div class="input-group-append">
        <span class="input-group-text" id="basic-addon2">Search</span>
      </div>
    </div>
    <ul v-if="!isWatchTags" class="list-group list-group-flush">
      <List v-for="question in questions" :key="question._id" :question="question"></List>
    </ul>
  </div>
</template>

<script>
import axios from "@/api/server.js";
import List from "@/components/List.vue";
import ListByTag from "@/components/ListByTag.vue";
export default {
  components: {
    List,
    ListByTag
  },
  data() {
    return {
      questions: [],
      watchTags: [],
      isWatchTags: false,
      inputSearch: ""
    };
  },
  created() {
    this.fetchQuestions()
  },
  methods: {
    fetchQuestions() {
      let token = localStorage.getItem("token");
      axios
        .get("/questions", { headers: { token } })
        .then(({ data }) => {
          this.questions = data;
          this.$store.commit("getQuestion", data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    create() {
      this.$router.push("/createQuestion");
    },
    fetchQuestionTag() {
      let token = localStorage.getItem("token");
      let tag = [];
      this.$store.state.tags.forEach(el => {
        tag.push(el.text);
      });
      axios
        .post("/questions/tag", tag, { headers: { token } })
        .then(({ data }) => {
          this.$store.commit("getQuestionByTag", data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    getTag() {
      if (this.$store.state.tags.length !== 0) {
        return this.$store.state.tags;
      }
    },
    getQuestionsByTag() {
      if (this.$store.state.questionsByTags.length !== 0) {
        return this.$store.state.questionsByTags;
      }
    },
    filterQuestions() {
      let questionsTag = [];
      let filterByTag = false;
      this.$store.state.questions.forEach(question => {
        this.$store.state.questionsByTags.forEach(questionTag => {
          if (questionTag._id !== question._id) {
            filterByTag = true;
            questionsTag.push(question);
          }
        });
      });
      if (filterByTag) {
        return questionsTag;
      } else {
        return this.questions;
      }
    },
    watchTag() {
      if (this.$store.state.tags.length !== 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  watch: {
    getTag() {
      this.watchTags = this.getTag;
      this.fetchQuestionTag();
    },
    watchTag() {
      if (this.watchTag) {
        this.isWatchTags = true;
      } else {
        this.isWatchTags = false;
      }
    },
    inputSearch(newSearch, oldSearch) {
      let get = this.questions.filter(el => {
        let check = el.title.includes(this.inputSearch);
        if (check) return el;
      });
      this.questions = get;
      if(newSearch.length < oldSearch.length) this.fetchQuestions()
    }
  }
};
</script>

<style scoped>
button {
  font-size: 13px;
  -webkit-box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.75);
  background-color: rgb(7, 146, 226);
  color: white;
}
</style>
