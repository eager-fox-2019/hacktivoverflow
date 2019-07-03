<template>
  <div>
    <h2 class="m-5">New Question</h2>
    <div class="m-5 d-flex flex-row justify-content-center">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group
          id="input-group-1"
          label="Title:"
          label-for="input-1"
        >
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
  export default {
    name: 'questionform',
    props: ['registerSuccess'],
    data() {
      return {
        form: {
          title: '',
          description: '',
        },
        showError: false,
        showRegister: false,
        loginError: '',
        show: true
      }
    },
    methods: {
      async onSubmit(evt) {
        evt.preventDefault()
        let res = await this.$store.dispatch('postQuestion', {
          title: this.form.title,
          description: this.form.description
        })
        if (res) {
          this.$router.push({path: '/'})
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
  }
</script>