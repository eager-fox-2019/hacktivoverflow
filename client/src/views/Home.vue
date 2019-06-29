<template>
<div v-if="islogin">
    <h1>HOME</h1>
  </div>
</template>
<script>
export default {
  name: 'home',
  props: ["islogin"],
  data () {
    return {
    }
  },
  components: {
  },
  methods: {

  }
}
</script>