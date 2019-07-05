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
    <form class="col s12">
      <div class="row">
        <div class="input-field col s10">
          <i class="material-icons prefix">T</i>
          <input v-model="edit_title" id="input_text" type="text"  class="validate"/>
          <label class="active" for="input_text">Title</label>
        </div>
      </div>
      <!-- {{ data_edit }} -->
      <div class="row">
          <wysiwyg v-model="edit_description" />
      </div>
    </form>
    <a @click="update_answer" class="waves-effect waves-light btn-small grey darken-3">Update Your Answer</a>
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
import NavBar from '@/components/NavBar'
import MenuLeftBar from "@/components/MenuLeftBar";
// import QuestionForm from "@/components/QuestionForm";
import EditForm from '@/components/EditForm'
import WatchTagCard from "@/components/WatchTagCard";
import { mapState } from 'vuex'
import myServer from '../api/myServer';

export default {
  data() {
    return {
      edit_title: '',
      edit_description: '',
      edit_tags: [],
      data_edit: '',
      tag_input: ''
    }
  },
  methods: {
    delete_tag (tag) {
      let index = this.edit_tags.indexOf(tag);
      if (index !== -1) this.edit_tags.splice(index, 1);
    },
    add_tag_button () {
      if (
        this.tag_input !== "" &&
        this.edit_tags.indexOf(this.tag_input.toLowerCase()) == -1
      ) {
        this.edit_tags.push(this.tag_input.toLowerCase());
        this.tag_input = "";
      }
    },
    update_question () {
      myServer
      .put(`/questions/${this.$route.params.id}`, { 
        title: this.edit_title,
        description: this.edit_description,
        tags: this.edit_tags
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log(data, "after update")
          this.$store.commit('UPDATE_AFTER_UPDATE', data)
          this.$router.push('/myquestions')
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
    ...mapState([
    'isLogin',
    'myQuestions'
    ])
  },
  components: {
    NavBar,
    MenuLeftBar,
    // QuestionForm,
    WatchTagCard,
    EditForm
  },
  created () {
    if (this.isLogin) {
      console.log(this.$route.params.id, "paraaams")
      myServer.get(`questions/${this.$route.params.id}`)
      .then(({ data }) => {
        console.log(data, "---")
        // this.data_edit = data
      this.edit_title= data.title,
      this.edit_description= data.description,
      this.edit_tags= data.tags,
        console.log(this.data_edit, "dataedit ========")
      })
      .catch((err) => {
        console.log(err)
      })
    } else {
      this.$router.push('/login')
    }
  }
}
</script>

<style>
</style>
