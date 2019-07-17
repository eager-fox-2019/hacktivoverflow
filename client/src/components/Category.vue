<template>
<div>
  <slot></slot>
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
