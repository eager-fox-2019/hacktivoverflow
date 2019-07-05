<template>
  <div>
    <h2 class="m-5">Edit Answer: {{ answerDetail.title }}</h2>
    <div class="m-5 d-flex flex-row justify-content-center">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group id="input-group-1" label="Title:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.title"
            type="text"
            required
            placeholder="Enter title"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-2" label="Your description:" label-for="input-2">
          <b-form-textarea
            id="input-2"
            v-model="form.description"
            required
            placeholder="Enter description"
          ></b-form-textarea>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      form: {
        title: '',
        description: ''
      },
      show: true
    };
  },
  created() {
    this.form.title = this.answerDetail.title
    this.form.description = this.answerDetail.description
  },
  computed: {
    ...mapState(["answerDetail", "loggedUser"])
  },
  methods: {
    async onSubmit(evt) {
        evt.preventDefault()
        let res = await this.$store.dispatch('updateAnswer', {
          id: this.answerDetail._id,
          title: this.form.title,
          description: this.form.description
        })
        if (res) {
          this.$router.push({path: `/question/${this.answerDetail.question}`})
        }
      },
      onReset(evt) {
        evt.preventDefault()
        this.form.title = ''
        this.form.description = ''
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
  }
};
</script>

<style>
</style>
