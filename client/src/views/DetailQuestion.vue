<template>
  <div class="row">
    <router-view />
    <NavBar></NavBar>
    <div class="col s12 l3 m3">
      <!-- MENU LEFT BAR -->
      <MenuLeftBar></MenuLeftBar>
    </div>
    <div class="col m6 l6 s12">
      <!-- QUESTION FORM -->
      <div class="row">
        <div class="col s12 m12 l12">
          <h4 class="left border blue-text">{{ question_detail.title }}</h4>
        </div>
        <!-- FOR QUESTION -->
        {{ upvotes_value.length - downvotes_value.length }}
        <!-- <DetailCard
          :question_detail="question_detail"
          :upvotes_value="upvotes_value"
          :downvotes_value="downvotes_value"
          @upvotes_question="upvotes_question"
          @downvotes_question="downvotes_question"
        ></DetailCard> -->
  <div class="row">
    <div class="col s2 m2 l2">
      <div class="row">
        <span @click="upvotes_question(question_detail.author)">
        <i class="material-icons">thumb_up</i></span>
      </div>
      <div class="row">
<!-- {{question_detail.upvotes}} -->
        <h5>{{ upvotes_value.length - downvotes_value.length }}</h5>
      </div>
      <div class="row">
        <span @click="downvotes_question(question_detail._id)">
        <i class="material-icons">thumb_down</i></span>
      </div>
    </div>
    <div class="col m10 l10 s10">
            <p v-html="question_detail.description"></p>
    </div>
  </div>
<!-- {{question_detail}} -->


        <div class="row">
          <div class="col s8 m8 l8 offset-m2 offset-l2 offset-s2">
            <TagCard v-for="(tag, index) in question_detail.tags"
            :key="index"
            :data_card="tag"
            ></TagCard>
          </div>
        </div>

    <div class="row">
      <div id="picturedisplay" class="row s6 m6 l6">
        <div class="row">
          <div class>
            <span class="relativetime">asked: {{ getDate(question_detail.createdAt) }}</span>
          </div>

        </div>
        <div class="col s1 m1 l1">
          <div class>
            <a href="">
              <div class="gravatar-wrapper-32">
                <img
                  src="../../public/user1.png"
                  alt
                  width="38"
                  height="38"
                />
              </div>
            </a>
          </div>
        </div>
        <div class="col s7 m7 l7">
          <div class>
            <span>{{ question_detail_name }}</span>
          </div>
        </div>
      </div>
    </div>


        <hr />
        <div class="row">
          <div class="col m11 l11 s11 offset-s1 offset-m1 offset-l1">
            <div class="col 11">
              <span>1 Answers</span>
              <hr />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col m11 l11 s11 offset-s1 offset-m1 offset-l1">
            <!-- FOR ANSWER -->
            <!-- <DetailCard></DetailCard> -->
            <div class="center">
              <!-- <AuthorCard></AuthorCard> -->
            </div>
          </div>
        </div>
        <hr />
        <!-- YOUR ANSWER -->
        <div class="col m11 l11 s11 offset-s1 offset-m1 offset-l1">
          <div class="col 11">
            <span>Your Answer</span>
            <hr />
          </div>
        </div>
        <div class="col m12 l12 s12">
          <AnswerForm></AnswerForm>
        </div>
      </div>
    </div>
    <!-- MENU RIGHT BAR -->
    <div class="col m3 l3 s12">
      <!-- WATCH TAG -->
      <WatchTagCard></WatchTagCard>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import myServer from '../api/myServer.js'
import NavBar from "@/components/NavBar";
import MenuLeftBar from "@/components/MenuLeftBar";
import SearchForm from "@/components/SearchForm";
import WatchTagCard from "@/components/WatchTagCard";
// import DetailQuestionCard from "@/components/DetailQuestionCard";
import DetailCard from "@/components/DetailCard";
import AnswerForm from "@/components/AnswerForm";
import AuthorCard from '@/components/AuthorCard'
import TagCard from '@/components/TagCard'
import { mapState } from "vuex";

export default {
  data() {
    return {
      question_detail: '',
      upvotes_value: [],
      downvotes_value: [],
      answers_value: [],
      question_detail_name: ''
      
    }
  },
  components: {
    NavBar,
    MenuLeftBar,
    SearchForm,
    WatchTagCard,
    // DetailQuestionCard,
    DetailCard,
    AnswerForm,
    AuthorCard,
    TagCard
  },
  methods: {
    getDate(datetime) {
      let date = new Date(datetime);
      let dateString = date.toDateString();
      return dateString;
    },
    upvotes_question (id) {
      console.log(localStorage.getItem('token'));
      // myServer
      //   .put(`/questions/upvotes/${this.$route.params.id}`, {
      //     headers: {
      //       token: localStorage.getItem('token')
      //     }
      //   })
      myServer
      .patch(`/questions/upvotes/${this.$route.params.id}`, { authorId: id}, {
        headers: {
          token: localStorage.getItem('token')
        }
      })

        .then(({ data }) => {
          console.log(data)
          this.question_detail = data
          this.upvotes_value = data.upvotes
          this.downvotes_value = data.downvotes
          this.answers_value = data.answers
          // this.question_detail = data
          // this.question_detail_name = data.author.name
          // commit('INSERT_FETCH_QUESTION', data)
          // commit("USER_LOGIN_MUTATION");
        })
        .catch((err) => {
          console.log(err.response)
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: `${ err.response.data.message }`,
          })
        })
    },
    downvotes_question (id) {
      console.log('downvotes_question parent', id)
      myServer
      .patch(`/questions/downvotes/${this.$route.params.id}`, { authorId: id}, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          this.question_detail = data
          this.upvotes_value = data.upvotes
          this.downvotes_value = data.downvotes
          this.answers_value = data.answers
        })
        .catch((err) => {
          console.log(err.response)
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: `${ err.response.data.message }`,
          })
        })
    }
  },
  computed: {
    ...mapState(['isLogin'])
  },
  created () {
    myServer
      .get(`/questions/${this.$route.params.id}`)
      .then(({ data }) => {
        console.log(data)
        this.question_detail = data
        this.question_detail_name = data.author.name
                  this.upvotes_value = data.upvotes
          this.downvotes_value = data.downvotes
          this.answers_value = data.answers

        // commit('INSERT_FETCH_QUESTION', data)
        // commit("USER_LOGIN_MUTATION");
      })
      .catch((err) => {
        console.log(err)
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: `${ err.response.data.message }`,
        })
      })
    console.log('created')
    console.log(this.$route.params.id)
    // this.$store.dispatch('FETCH_DETAIL_QUESTION', this.$route.params.id)
    // FETCH_DETAIL_QUESTION ({ state, commit }, payload)
  }
};
</script>

<style>
</style>
