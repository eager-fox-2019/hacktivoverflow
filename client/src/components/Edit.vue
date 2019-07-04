<template>
  <form id="form-edit" @submit.prevent="edit">
    <div class="modal-card" style="width: 100%;">
      <header class="modal-card-head">
          <p class="modal-card-title">Edit</p>
      </header>
      <section class="modal-card-body">
          <b-field label="Title">
              <b-input
                  placeholder="Title"
                  v-model="inputEdit.titleEdit">
              </b-input>
          </b-field>

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
  props: ['question', 'state'],
  data() {
    return {
      inputEdit: {
        titleEdit: '',
        contentEdit: ''
      }
    }
  },
  created () {
    this.inputEdit.titleEdit = this.question.title
    this.inputEdit.contentEdit = this.question.content
  },
  methods: {
    edit() {
      let input = {
        id: this.question._id,
        ...this.inputEdit
      }
      this.$store.dispatch('editQuestion', input)
      .then(({data}) => {
        this.$toast.open({ message: 'Question edited !', type: 'is-success'})
        this.$parent.close()
        return this.$store.dispatch('fetchQuestions')
      })
      .then(({data}) => {
        this.$store.commit('STOREMYQUESTIONS', data)
      })
      .catch(err => this.$toast.open({ message: err.response.data.message, type: 'is-danger'}))
    }
  }
}
</script>

<style lang="scss" scoped>
  #form-edit {
    width: 1000px;
  }
</style>

