<template>
  <div style="margin-top: 50px">
    <div class="column is-6 is-offset-1 box">
      <b style="font-size:20px">Answer</b>
      <div style="margin-top: 10px">
        <b-field>
          <b-input type="text" maxlength="50" rounded v-model="a.title"></b-input>
        </b-field>
        <b-field label>
          <b-input maxlength="500" type="textarea" v-model="a.desc"></b-input>
        </b-field>
        <div>
          <b-button rounded type="is-primary" style="margin-right: 10px" @click="post">Submit</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      a: {
        title: "",
        desc: ""
      }
    };
  },
  methods: {
    post() {
      this.$store.dispatch("NEWANSWER", this.a);
      this.a = {
        title: "",
        desc: ""
      };
    }
  }
};
</script>

<style>
</style>
