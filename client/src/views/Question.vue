<template>
  <div>
    <p v-if="error.length != 0" style="color:red;text-align:center">{{ error }}</p>
    <div style="display:flex" v-if="question.length != 0">
      <div class="col-6" v-if="islogin">
        <h2 style="text-align:center">{{ question.title }}</h2>
        <br />
        <div style="display:flex;flex-direction:column">
          <QuestionCard v-if="islogin" :question="question" @fetchQuestion="fetchQuestion"></QuestionCard>
          <AnswerPost v-if="islogin" @fetchQuestion="fetchQuestion"></AnswerPost>
        </div>
      </div>
      <div class="col-6">
        <h2 style="text-align:center">Answers</h2>
        <br />

        <div v-for="answer in answers" :key="answer._id">
          <Answer :answer="answer" @fetchQuestion="fetchQuestion"></Answer>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Answer from "@/components/Answer.vue";
import AnswerPost from "@/components/AnswerPost.vue";
import QuestionCard from "@/components/QuestionCard.vue";
export default {
  name: "question-detail",
  props: ["islogin"],
  data() {
    return {
      question: "",
      answers: [],
      error: ""
    };
  },
  components: {
    Answer,
    AnswerPost,
    QuestionCard
  },
  computed: {
    url() {
      return this.$store.state.url;
    }
  },
  methods: {
    fetchQuestion() {
      axios({
        method: "GET",
        url: `${this.url}/question?search=${this.$route.params.id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
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
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.fetchQuestion();
  }
};
</script>
