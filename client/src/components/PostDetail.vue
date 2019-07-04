<template>
  <div id="detail-container">

  </div>
</template>

<script>
export default {
  name: 'detail',
  props: ['title', 'content', 'createdAt', 'poster'],
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  $primary: #311B92;
  #detail-container {
    width: 80%;
    height: 100%;
    border: 2px solid $primary;
    margin: auto;
  }
</style>
