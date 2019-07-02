<template>
  <div
      style="cursor:pointer"
      v-on:click="FETCHQUESTIONS(category)"
    >{{ category }}
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'category-component',
  props: ['category'],
  data () {
    return {}
  },
  components: {},
  computed: {},
  methods: {
    ...mapActions(['FETCHQUESTIONS'])
  },
  created () {
  }
}
</script>
