<template>
  <div>
    <div>
      <b-card v-if="!showEdit">
        <b-row>
          <vote class="col col-2" :data="answer" :type="'answers'" @updateData="updateData"/>
          <div class='col col-10'><h2>{{answer.title}}</h2></div>
        </b-row>
        <b-row align-h="between" class="px-3">
          <div class="col col-5">
            <b-button
              v-show="answer.creator._id == userId "
              class="bg-primary mx-1"
              @click.prevent="edit"
            >edit</b-button>
            <b-button
              v-show="answer.creator._id == userId "
              class="bg-danger"
              @click.prevent="deleteThis"
            >delete</b-button>
          </div>
        <p style='color:grey'>Answered by: {{answer.creator.name}}</p>
        </b-row>
          <hr role="separator" aria-orientation="horizontal" class="my-4 dropdown-divider">

        <b-card-text>
          <vue-editor
              :disabled="disabled"
              :editor-toolbar="customToolbar"
              style="background-color:rgb(233, 233, 233)"
              id="editor"
              v-model="answer.description"
            ></vue-editor>
          <!-- <span v-html="answer.description"></span> -->
        </b-card-text>
        <!-- @updateData="updateData" inside vote-->
      </b-card>
      <b-card v-if="showEdit">
        <formUpdate :index="index" :use='"answers"' @editOff="edit"/>
        <b-button @click.prevent="edit">Cancel</b-button>
      </b-card>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import vote from "@/components/Votes.vue";
import api from "@/api/api.js";
api.defaults.headers.common["token"] = localStorage.getItem("token");
import formPosting from "@/components/Form.vue";
import formUpdate from "@/components/FormUpdate.vue";

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
      showEdit: false,
      customToolbar:[],
      disabled:true
    };
  },
  components: {
    vote,
    formUpdate,
    VueEditor
  },
  methods: {
    deleteThis() {
      let payload = {
        answerId: this.answer._id,
        questionId: this.$route.params.questionId
      };
      this.$store.dispatch("deleteAnswer", payload);
      //   api
      //     .delete(`/answers/${this.answer._id}`)
      //     .then(({data})=>{
      //         let payload = {data:{}, index:this.index}
      //         this.$emit('delete', payload)
      //         console.log(data)
      //     })
      //     .catch(err=>{
      //         console.log(err)
      //     })
    },
    edit() {
      this.showEdit = !this.showEdit;
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
<style>

</style>
