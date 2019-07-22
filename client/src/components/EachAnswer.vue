<template>
  <div>
    <br>
    <div>
      <b-card class="text-muted" classv-if='showEdit === false' :title="answer.title" :sub-title="answer.creator.name" style="padding: 5px !important">
        <b-card-text><span v-html='answer.description' class="text-muted"></span></b-card-text>
        <vote :data="answer" :type="'answers'" @updateData="updateData"/>
        <b-button v-show="answer.creator._id == userId " class="bg-primary" @click.prevent="edit" style="background: gainsboro !important; border-color: white !important; margin-right: 5px">
          <span class="text-muted">Edit</span>
        </b-button>
        <b-button v-show="answer.creator._id == userId" class="bg-danger" @click.prevent="deleteThis" style="border: none !important">
          Delete
        </b-button>
      </b-card>
      <b-card v-if='showEdit === true' >
            <formUpdate :index='index' :use='"answers"' @editOff='edit'/>
            <b-button @click.prevent='edit' style="margin-top: 7px">Cancel</b-button>
      </b-card>
    </div>
  </div>
</template>

<script>
import vote from "@/components/Votes.vue";
import formPosting from "@/components/Form.vue"
import formUpdate from "@/components/FormUpdate.vue"
import api from "@/api/api.js";
api.defaults.headers.common["token"] = localStorage.getItem("token");

export default {
  name: "eachAnswer",
  props: ["index"],
  computed: {
    answer() {
      return this.$store.state.answers[this.index];
    }
  },
  data() {
    return {
      userId: "",
      showEdit:false
    };
  },
  components: {
    vote,
    formUpdate
  },
  methods: {
    deleteThis() {
      let payload = {
        answerId: this.answer._id,
        questionId: this.$route.params.questionId
      };
      console.log('component eachAnswer')
      this.$store.dispatch("deleteAnswer", payload);
    },
    edit(){
        this.showEdit = !this.showEdit
    },
    updateData(data) {
      let payload = {
        data,
        index: this.index
      };
      this.$store.commit("updateAnswer", payload);
    }
  },
  created() {
    this.userId = localStorage.getItem("id");
  }
};
</script>