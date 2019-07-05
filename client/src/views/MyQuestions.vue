<template>
  <div class="home">
    <router-view />
    <NavBar></NavBar>
    <div class="row">
      <div class="col s12 l3 m3">
        <!-- MENU LEFT BAR -->
        <MenuLeftBar></MenuLeftBar>
      </div>
      <div class="col m6 l6 s12">
        <!-- <div v-if="edit_mode" class="">
          <QuestionForm
            :data_edit="data_edit"
          >
          </QuestionForm>
        </div> -->
        <div class="">
        <!-- SEARCH -->
        <SearchForm></SearchForm>
        <QuestionCard
          v-for="(question, index) in myQuestions"
          :key="index"
          :question="question"
        >
        <div class="row">
            <div class="container">
                <div class="card-action col offset-m3">
                    <a @click="edit_button(question._id)"
                    class="waves-effect waves-light orange lighten-2 btn"
                    >
                    <i class="material-icons left">edit</i>EDIT
                    </a>
                </div>
                <div class="card-action col">
                    <a @click="delete_question(question._id)"
                    class="waves-effect waves-light red darken-1 btn"
                    >
                    <i class="material-icons right">delete_forever</i>DELETE
                    </a>
                </div>
            </div>
            </div>
        </QuestionCard>
        </div>
      </div>
      <!-- MENU RIGHT BAR -->
      <div class="col m3 l3 s12">
        <!-- WATCH TAG -->
        <WatchTagCard></WatchTagCard>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar'
import MenuLeftBar from '@/components/MenuLeftBar'
import SearchForm from '@/components/SearchForm'
import QuestionCard from '@/components/QuestionCard'
import WatchTagCard from '@/components/WatchTagCard'
import QuestionForm from "@/components/QuestionForm";

import { mapState } from "vuex";

export default {
  name: 'home',
  data () {
    return {
      // edit_mode: false,
      // data_edit: ''
    }
  },
  components: {
    NavBar,
    MenuLeftBar,
    SearchForm,
    QuestionCard,
    WatchTagCard,
    QuestionForm,
  },
  computed: {
    ...mapState(['isLogin', "myQuestions"])
  },
  methods: {
    edit_button (value) {
      console.log('edit button', value)
      this.$router.push('editquestion/' + value)
      // this.edit_mode = true
      // this.data_edit = value
    },
    delete_question (id) {
      this.$store.dispatch('DELETE_QUESTION', id)
    }
  },
  created () {
    if (localStorage.getItem("token")) {
      console.log('token ada')
      this.$store.dispatch('LOGIN_VERIFY')
    }else 
    if (!this.isLogin) {
      this.$router.push('/login')
    }    
  }
}
</script>
