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
import ax from '../api/server'
export default {
  name: 'QuestionFilter',
  data () {
    return {
      titleFilter: ''
    }
  },
  methods: {
    getAll () {
      this.products = []
      ax({
        method: 'get',
        url: '/product/list',
        headers: { access_token: localStorage.getItem('token') }
      })
        .then(({ data }) => {
          for (let i in data) {
            this.products.push(data[i])
          }
          this.$emit('getAll', this.products)
        })
        .catch((err) => {
          this.$swal({
            type: 'error',
            title: `${err.response.data.message}`,
            showConfirmButton: true
          })
        })
    },
    sortPrice () {
      this.products = []
      ax({
        method: 'get',
        url: '/product/list',
        headers: { access_token: localStorage.getItem('token') }
      })
        .then(({ data }) => {
          for (let i in data) {
            this.products.push(data[i])
          }
          if (this.sort === 'desc' || this.sort === '') {
            this.products.sort((a, b) => { return a.price - b.price })
            this.sortUpdate = 'asc'
          } else {
            this.products.sort((a, b) => { return b.price - a.price })
            this.sortUpdate = 'desc'
          }
          this.$emit('sortPrice', this.products, this.sortUpdate)
        })
        .catch((err) => {
          this.$swal({
            type: 'error',
            title: `${err.response.data.message}`,
            showConfirmButton: true
          })
        })
    },
    filterByName (name) {
      this.products = []
      let regex = new RegExp('(' + name + ')', 'i')
      ax({
        method: 'get',
        url: '/product/list',
        headers: { access_token: localStorage.getItem('token') }
      })
        .then(({ data }) => {
          for (let i in data) {
            if (regex.test(data[i].name)) {
              this.products.push(data[i])
            }
          }
          this.$emit('filterByName', this.products)
        })
        .catch((err) => {
          this.$swal({
            type: 'error',
            title: `${err.response.data.message}`,
            showConfirmButton: true
          })
        })
    }
  }
}
</script>

<style>

</style>
