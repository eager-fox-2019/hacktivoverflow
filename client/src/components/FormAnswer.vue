<template>
  <div id="answer-form-container">
    <form @submit.prevent="addAnswer">
      <b-field label="Title">
        <template slot="label">
          <span class="has-text-primary label">Answer</span>
        </template>
        <b-input type="textarea" v-model="inputAnswer.content"></b-input>
      </b-field>
      <b-button type="is-primary" native-type="submit" id="submit" >Submit</b-button>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      inputAnswer: {
        content: ''
      }
    }
  },
  methods: {
    addAnswer () {

    }
  }
}
</script>

<style lang="scss" scoped>
  $primary : #311B92;
  #answer-form-container {
    margin: auto;
    // padding: 40px;
    width: 60%;
    height: 60%;
    border: 2px solid black;
    background-color: white;
  }

  form {
    text-align: center;
  }
  #submit {
    margin-top: 80px;
    font-size: 18px;
  }
  #add-container {
    width: 40%;
    margin: 50px auto;
    border: 5px solid $primary;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    padding: 40px;
  }
  .label {
    font-weight: bold;
    margin-top: 40px;
    font-size: 24px;
  }
</style>
