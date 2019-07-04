<template>
  <div>
    <div class="row d-flex justify-content-center">
      <div class="col-lg-8 mt-5">
    <form @submit.prevent="addAnswer(onequestion._id)">
    
    <b-form-textarea
      id="textarea"
      v-model="desc"
      placeholder="Enter your answer"
      rows="3"
      max-rows="6"
    ></b-form-textarea>
    <b-button type="submit" variant="outline-primary">Answer</b-button>
    </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: 'addAns',
  data () {
    return {
      desc: ''
    }
  },
  computed: {
    ...mapState(["onequestion"])
  },
  methods: {
    addAnswer (id) {
      let data = {
        description: this.desc,
        questionid: id
      }
      this.$store.dispatch('CREATEANSWER', data)
      this.desc = ''
    }
  }
}
</script>

<style>
form{
  padding-bottom: 3rem;
}
</style>
