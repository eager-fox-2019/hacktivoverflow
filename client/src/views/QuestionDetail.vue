<template>
  <div>
    <div class="d-flex flex-row m-5">
      <div class="m-3">
        <b-button @click="vote('upvote')" :variant="(upvoted) ? `secondary` : `light`">Up</b-button>
        <br />
        <b-button @click="vote('downvote')" :variant="(downvoted) ? `secondary` : `light`">Down</b-button>
        <h4>Rating: {{ rating }}</h4>
      </div>
      <b-container fluid class="m-3 w-100">
        <b-row align-v="start" class="w-100">
          <b-col sm="12" class="w-100">
            <h3>{{ questionDetail.title }}</h3>
            <p>
              Question by: {{ fullName }} 
              <br v-if="isAuthor" />
              <router-link v-if="isAuthor" :to="{ name: 'questionEdit', params: {id: this.questionDetail._id }}"> 
                <b-button variant="primary">Edit</b-button>
              </router-link>
              <b-button v-if="isAuthor" variant="danger" > Delete </b-button>
            </p>
            <p>{{ questionDetail.description }}</p>
          </b-col>
          <b-col sm="12" class="w-100">
            <hr />
            <h5>Answer This Question</h5>
            <input class="m-2 w-100" placeholder="Title" type="text" v-model="form.title" />
            <br />
            <textarea
              class="m-2 w-100"
              style="height:150px;"
              placeholder="Description"
              type="text"
              v-model="form.description"
            ></textarea>
            <br />
            <b-button @click="postAnswer" class="m-2" variant="light">Answer</b-button>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <AnswerComponent
      v-for="answ in questionDetail.answers"
      :key="answ._id"
      :title="answ.title"
      :description="answ.description"
      :upvotes="answ.upvotes"
      :downvotes="answ.downvotes"
      :_id="answ._id"
      :user="answ.user"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import AnswerComponent from "@/components/AnswerComponent.vue";
export default {
  components: {
    AnswerComponent
  },
  created() {
    this.$store.dispatch("fetchQuestionDetail", { id: this.$route.params.id });
  },
  methods: {
    async vote (action) {
      let id = this.$route.params.id
      let res = await this.$store.dispatch('voteQuestion', { action, id})
      if (res) {    
        this.$store.dispatch("fetchQuestionDetail", { id: this.$route.params.id })
      }
    },
    async postAnswer() {
      let { title, description } = this.form;
      let question = this.$route.params.id;
      let res = await this.$store.dispatch("postAnswer", {
        title,
        description,
        question
      });
      if (res) {
        this.form.title = "";
        this.form.description = "";
        this.$store.dispatch("fetchQuestionDetail", {
          id: this.$route.params.id
        });
      }
    }
  },
  data() {
    return {
      rating: 0,
      upvoted: false,
      downvoted: false,
      isAuthor: false,
      form: {
        title: "",
        description: ""
      }
    };
  },
  computed: {
    fullName() {
      return this.questionDetail.user && this.questionDetail.user.fullName;
    },
    ...mapState(["questionDetail", "loggedUser"])
  },
  watch: {
    questionDetail(val) {
      this.rating = val.upvotes.length - val.downvotes.length
      this.upvoted = val.upvotes.includes(this.loggedUser.user)
      this.downvoted = val.downvotes.includes(this.loggedUser.user)
      this.isAuthor = val.user._id === this.loggedUser.user
    }
  }
};
</script>

<style>
</style>
