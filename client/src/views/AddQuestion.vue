<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm10 offset-sm1>
        <v-container>
          <v-text-field
            v-model="title"
            label="What do you want to ask?"
            required
          ></v-text-field>
          <v-textarea
            outline
            v-model="content"
            name="content"
            label="Explain more detail here"
          ></v-textarea>

          <v-btn @click="submit">submit</v-btn>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'addQuestion',
  data () {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    submit () {
      let newQuestion = {
        title: this.title,
        content: this.content,
        user_id: this.$store.state.loginUser._id
      }
      this.$store.dispatch('sendNewQuestion', newQuestion)
    }
  }
}
</script>

<style>

</style>
