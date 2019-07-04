<template>
  <div>
    <Navbar></Navbar>
    <div class="row">
      <div class="col-2 side-nav">
        <SideNavbar></SideNavbar>
      </div>
      <div class="col-8">
        <div class="row p-3 mb-3 title">
          <div class="col-10">
            <h3>{{ question.title }}</h3>
          </div>
          <div v-if="isOwner" class="col-2">
            <button  @click="updateQuestion" type="button" class="btn">Edit Question</button>
          </div>
        </div>
        <div class="row detail">
          <div class="col-1">
            <div @click="upVote" class="row d-flex justify-content-center">
              <i class="vote fas fa-sort-up"></i>
            </div>
            <div class="row d-flex justify-content-center voteTotal">{{ totalQuestionVotes }}</div>
            <div @click="downVote" class="row d-flex justify-content-center">
              <i class="vote fas fa-sort-down"></i>
            </div>
          </div>
          <div v-html="question.description" class="col-11"></div>
        </div>
        <hr />
        <ListAnswer v-for="(answer, index) in question.answers" :key="index" :answer="answer" @fetchQuestion="fetchQuestion" ></ListAnswer>
        <div class="form-group mt-5 inputAnswer">
          <label for="exampleInputEmail1" style="font-weight:bold">Post Your Answer</label>
          <wysiwyg v-model="answer" />
        </div>
        <button @click="submitAnswer" type="submit" class="btn btn-primary mb-3">Submit</button>
      </div>
      <div class="col-2">
        <WatchedTag></WatchedTag>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/api/server.js";
import Navbar from "@/components/Navbar.vue";
import Home from "@/views/Home.vue";
import WatchedTag from "@/components/WatchedTag.vue";
import SideNavbar from "@/components/SideNavbar.vue";
import ListAnswer from "@/components/ListAnswer.vue";
import "vue-wysiwyg/dist/vueWysiwyg.css";

export default {
  components: {
    Navbar,
    Home,
    WatchedTag,
    ListAnswer,
    SideNavbar
  },
  data() {
    return {
      question: {},
      isOwner: false,
      answer: ""
    };
  },
  created() {
    this.fetchQuestion()
  },
  methods: {
    fetchQuestion () {
    let token = localStorage.getItem("token");
      axios
      .get(`/questions/${this.$route.params.id}`, { headers: { token } })
      .then(({ data }) => {
        this.question = data;
        if (data.userId == localStorage.getItem("userId")) this.isOwner = true;
      })
      .catch(err => {
        console.log(err);
      });
    },
    updateQuestion() {
      this.$router.push(`/updateQuestion/${this.$route.params.id}`);
    },
    submitAnswer() {
      let token = localStorage.getItem("token");
      axios
        .post(
          `/answers/${this.$route.params.id}`,
          { description: this.answer },
          { headers: { token } }
        )
        .then(({ data }) => {
          this.question.answers.push(data);
          this.answer = "";
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    upVote() {
      let token = localStorage.getItem("token");
      axios
        .post(`/questions/upVotes/${this.$route.params.id}`,
          {},
          { headers: { token } }
        )
        .then(data => {
          this.fetchQuestion();
        })
        .catch(err => {
          console.log(err);
        });
    },
    downVote(questionId) {
      let token = localStorage.getItem("token");
      axios
        .post(`/questions/downVotes/${this.$route.params.id}`,
          {},
          { headers: { token } }
        )
        .then(data => {
          this.fetchQuestion();
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed : {
    totalQuestionVotes () {
      if(this.question.upVotes){
        return this.question.upVotes.length - this.question.downVotes.length
      }
    }
  }
};
</script>

<style scoped>
.row {
  margin: 0 0;
}
.col-2 {
  padding: 5px;
}
.side-nav {
  text-align: center;
  border-right: 1px solid rgb(201, 196, 196);
  position: relative;
  left: 0;
  overflow-x: hidden;
  padding-top: 20px;
}
button {
  font-size: 13px;
  -webkit-box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.75);
  background-color: rgb(7, 146, 226);
  color: white;
}
.title {
  border-bottom: 1px solid;
}
.vote {
  cursor: pointer;
  font-size: 40px;
}
.voteTotal {
  font-size: 35px;
}
</style>
