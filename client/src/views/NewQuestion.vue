<template>
  <div class="about" style="background-color: rgba(255,255,255,0.5); height: 100vh">

    <section style="margin-right:100px;">
      <br>
        <b-field horizontal label="Title">
            <b-input v-model="form.title" name="title" expanded></b-input>
        </b-field>
        <b-field horizontal label="Question">
            <b-input v-model="form.description" type="textarea"></b-input>
        </b-field>

        <b-field horizontal><!-- Label left empty for spacing -->
            <p class="control">
                <button v-if="!loading" @click="addQuestion" class="button is-primary">
                  Send Question
                </button>
            </p>
        </b-field>

    </section>


  </div>
</template>

<script>
export default {
  data(){
    return {
      form : {},
      loading : false
    }
  },
  methods : {
    addQuestion(){
      this.loading = true
      this.$store.dispatch('addQuestion', this.form)
        .then(data => {
          this.loading = false
          this.$router.push('/')
        })
        .catch(err => {
          this.loading = false
        })
    }
  }
}
</script>

