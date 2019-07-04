<template>
    <div class="card">
        <h5 class="card-header">Question Title</h5>
        <div class="card-body">
            <p class="card-text">Question Description</p>
            <a href="#" class="btn btn-primary">Question Details</a>
        </div>
    </div>
</template>

<script>

export default {
  name: 'loginChecker',
  props: ['loggedIn'],
  data(){
    return{
        dummy : ['1','2','3']
        // question : []
    }
  },
  components: {
  },
  methods: {
  }
}
</script>
