<template>
  <form id="form-edit" @submit.prevent="edit">
    <div class="modal-card" style="width: 100%;">
      <header class="modal-card-head">
          <p class="modal-card-title">Edit</p>
      </header>
      <section class="modal-card-body">
          <b-field label="Content">
              <b-input
                  type="textarea"
                  placeholder="Content"
                  v-model="inputEdit.contentEdit">
              </b-input>
          </b-field>
      </section>
      <footer class="modal-card-foot">
          <button class="button" type="button" @click="$parent.close()">Close</button>
          <input type="submit" class="button is-primary" native-type="submit" value="Edit">
      </footer>
    </div>
  </form>
</template>

<script>
export default {
  name: 'edit',
  props: ['answer', 'state', 'questionId'],
  data () {
    return {
      inputEdit: {
        contentEdit: ''
      }
    }
  },
  created () {
    this.inputEdit.titleEdit = this.answer.title
    this.inputEdit.contentEdit = this.answer.content
  },
  methods: {
    edit () {
      let input = {
        id: this.answer._id,
        ...this.inputEdit
      }
      this.$store.dispatch('editAnswer', input)
        .then(({ data }) => {
          this.$toast.open({ message: 'Answer edited !', type: 'is-success' })
          this.$parent.close()
          return this.$store.dispatch('fetchAnswers', this.questionId)
        })
        .then(({ data }) => {
          this.$store.commit('STOREANSWERS', data)
        })
        .catch(err => this.$toast.open({ message: err.response.data.message, type: 'is-danger' }))
    }
  }
}
</script>

<style lang="scss" scoped>
  #form-edit {
    width: 1000px;
  }
</style>
