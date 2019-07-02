<template>
  <div v-if="islogin">
    <h2 class="header">Ask a Question</h2>
    <Ask>
    </Ask>
  </div>
</template>
<script>
import Ask from '@/components/Ask.vue'
export default {
  name: 'ask-view',
  props: ['islogin'],
  data () {
    return {
    }
  },
  computed: {
  },
  components: {
    Ask
  },
  methods: {
  }
}
</script>

<style>
.header {
  text-align: center;
  margin-top: 50px;
  font-weight: 600;
}
</style>
