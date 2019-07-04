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
    <!-- TAGS -->
    <div class="row">
      <div class="input-field col s12 m12 l12">
        <i class="material-icons prefix">label</i>
        <input v-on:keyup.enter="add_tag_button" v-model="tag_input" id="tag_input" type="text" class="validate">
        <!-- <input v-model="tag_input" id="tag_input" type="text" class="validate" /> -->
        <label for="tag_input">Tags</label>
        <span class="helper-text">Enter a tag</span>
      </div>
      <!-- {{data_edit}} -->
              <div class="row">
          <div v-for="(tag, index) in edit_tags" :key="index" class="list-tag col">
            <div class="chip2">
              <!-- <div class="chip-head"></div> -->
              <div class="chip2-content">{{ tag }}</div>
              <div class="chip2-close">
                <a @click.prevent="delete_tag(tag)">
                  <svg class="chip2-svg" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
    </div>
    <slot></slot>
    <a @click="update_question" class="waves-effect waves-light btn-small grey darken-3">Update Your Question</a>
  </div>

      <!-- <EditForm
        :data_edit="data_edit"
      >
      </EditForm> -->
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
