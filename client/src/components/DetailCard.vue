<template>
  <div>
    <h2 v-if="type == 'question'" style="text-align: left" class="p-3">Question Title: {{detail.title}}</h2>
    <div class="d-flex flex-row" style="border-bottom: 1px solid grey; border-top: 1px solid grey">
      <div class="sides-info d-flex flex-column col-1 justify-content-center p-3" style="border-right: 1px solid grey">
        <div>
          <b-btn><i class="far fa-thumbs-up"></i></b-btn>
        </div>
        <div>
          <h4 class="p-2">{{detail.upvote.length - detail.downvote.length}}</h4>
        </div>
        <div>
          <b-btn><i class="far fa-thumbs-down"></i></b-btn>
        </div>
      </div>
      <div class="detail-info col d-flex flex-column justify-content-between p-3" style="text-align: left">
        <div>
          <p>Description: {{detail.desc}}</p>
        </div>
        <div>
          <div v-if="type == 'question'">
            <p v-if="detail.user.email != $store.state.user.email" style="margin: 0">Asked by: {{detail.user.name}}</p>
            <p v-else style="margin: 0">Asked by: You</p>
          </div>
          <div v-if="type == 'answer'">
            <p v-if="detail.user.email != $store.state.user.email" style="margin: 0">Answer by: {{detail.user.name}}</p>
            <p v-else style="margin: 0">Answer by: You</p>
          </div>
          <div v-if="detail.user.email == $store.state.user.email" class="mt-2">
            <b-btn variant="success" class="mr-2" v-if="type == 'question'">Edit</b-btn>
            <b-btn variant="success" class="mr-2" v-if="type == 'answer'">Edit</b-btn>
            <b-btn variant="danger">Delete</b-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    detail: Object,
    type: String
  }
}
</script>

<style>

</style>
