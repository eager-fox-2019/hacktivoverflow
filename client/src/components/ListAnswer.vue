<template>
  <div>
    <li class="list-group-item">
      <div class="row">
        <div class="col-1 vote">
          <div @click="upVote" class="row d-flex justify-content-center">
            <i class="vote fas fa-sort-up"></i>
          </div>
          <div class="row d-flex justify-content-center voteTotal">{{ totalAnswerVotes }}</div>
          <div @click="downVote" class="row d-flex justify-content-center">
            <i class="vote fas fa-sort-down"></i>
          </div>
        </div>
        <div class="col-11">
          <div class="row description">
            <p v-html="answer.description"></p>
          </div>
          <div v-if="isOwner" class="row d-flex justify-content-end mr-3">
            <i @click="update" class="fas fa-edit">Edit</i>
          </div>
        </div>
      </div>
    </li>
    <div v-if="isUpdate" class="form-group mt-5 inputAnswer">
      <label for="exampleInputEmail1" style="font-weight:bold">Edit Your Answer</label>
      <wysiwyg v-model="answerUpdateText" />
      <button @click="submitEdit" type="submit" class="btn btn-primary mb-3 mt-2">Edit</button>
      <button @click="submitCancel" type="submit" class="btn btn-danger mb-3 ml-2 mt-2">Cancel</button>
    </div>
  </div>
</template>

<script>
import axios from '@/api/server'
export default {
  props: ["answer"],
  data() {
    return {
      isOwner: false,
      isUpdate: false,
      answerUpdateText: ''
    };
  },
  methods: {
    submitEdit() {
      let token = localStorage.getItem('token')
      axios.put(`/answers/${this.answer._id}`, { description: this.answerUpdateText }, { headers: { token } })
        .then(({ data }) =>{
          this.answer.description = data.description
          this.isUpdate = false
        })
        .catch(err => {
          console.log(err)
        })
    },
    submitCancel() {
      this.isUpdate = false
    },
    update() {
      this.answerUpdateText = this.answer.description
      this.isUpdate = true
    },
    upVote() {
      let token = localStorage.getItem("token");
      axios
        .post(
          `/answers/upVotes/${this.answer._id}`,
          {},
          { headers: { token } }
        )
        .then(data => {
          this.$emit('fetchQuestion');
        })
        .catch(err => {
          console.log(err);
        });
    },
    downVote(questionId) {
      let token = localStorage.getItem("token");
      axios
        .post(
          `/answers/downVotes/${this.answer._id}`,
          {},
          { headers: { token } }
        )
        .then(data => {
          this.$emit('fetchQuestion');
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    if (this.answer.userId == localStorage.getItem("userId")) {
      this.isOwner = true;
    }
  },
  computed : {
    totalAnswerVotes () {
      if(this.answer.upVotes){
        return this.answer.upVotes.length - this.answer.downVotes.length
      }
    }
  }
};
</script>

<style>
.fas {
  cursor: pointer;
}
.fa-edit {
  font-size: 13px;
}
</style>
