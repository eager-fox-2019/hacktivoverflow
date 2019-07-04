<template>
  <div class="center d-flex flex-column justify-content-center text-center">
    <h2 class="center mb-3">Question Filter</h2>
    <form id="filter" class='center align-middle' @submit.prevent="filterByTitle(titleFilter)">
      <div class="row">
          <div class="col">
            <div class="input-group input-group-md">
              <input type="text" name="filter" v-model="titleFilter" class="form-control form-control-md input-md" placeholder="Filter By Question Title">
              <span class="input-group-append">
                <button class="btn btn-success btn-md" type="submit">Search</button>
              </span>
            </div>
          </div>
      </div>
      <div class="row"  style="margin-top: 15px">
        <div class="col">
          <div class="input-group input-group-md d-flex justify-content-center">
            <button class="btn btn-success btn-md mr-3" type="button" @click="getAll">Get All Question</button>
          </div>
        </div>
    </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'QuestionFilter',
  data () {
    return {
      titleFilter: ''
    }
  },
  methods: {
    getAll () {
      this.$store.dispatch('getAllQuestion')
        .then(({ data }) => {
          this.$store.commit('ALL_QUESTION', data)
          this.$store.commit('FILTER_NONE')
        })
        .catch(err => {
          console.log(err)
          if (!err.response) {
            this.$swal({
              type: 'error',
              title: `Connection to Server Error`,
              showConfirmButton: true
            })
          } else {
            this.$swal({
              type: 'error',
              title: `${err.response.data.message}`,
              showConfirmButton: true
            })
          }
        })
    },
    filterByTitle (title) {
      this.$store.dispatch('getAllQuestion')
        .then(({ data }) => {
          this.$store.commit('ALL_QUESTION', data)
          this.$store.commit('FILTER_TITLE', title)
        })
        .catch(err => {
          console.log(err)
          if (!err.response) {
            this.$swal({
              type: 'error',
              title: `Connection to Server Error`,
              showConfirmButton: true
            })
          } else {
            this.$swal({
              type: 'error',
              title: `${err.response.data.message}`,
              showConfirmButton: true
            })
          }
        })
    }
  }
}
</script>

<style>

</style>
