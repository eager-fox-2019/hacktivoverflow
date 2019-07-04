<template>
  <div>
    <b-card bg-variant="light" :header="dataquestion.title" class="text-center">
      <b-card-text>{{dataquestion.description}}</b-card-text>
      <b-card-text>by <small v-if="dataquestion.user_id.username !== undefined">{{dataquestion.user_id.username}}</small>
      <small v-if="dataquestion.user_id.username === undefined"> Owner</small>
      </b-card-text>
      <a href="" @click="showDetail(dataquestion._id)">see more</a>
          <b-button variant="outline-primary" v-if="checkAuth(dataquestion)" @click="deleteQuestion(dataquestion._id)">Delete</b-button>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'eachQ',
  props: ['dataquestion'],
  methods: {
    showDetail (id) {
      this.$router.push({ path: `/details/${id}` })
    },
    deleteQuestion(id){
      this.$store.dispatch('DELETEQUESTION',id)
    },
    checkAuth(data){
      if(localStorage.getItem('user') == data.user_id){
        return true
      }else{
        return false
      }
    }
  }
}
</script>

<style>
b-card{
    padding: 3rem;
}
</style>
