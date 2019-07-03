<template>
  <div class="logform">
    <NavBar/>
    <RegLog/>
  </div>
</template>

<script>
import RegLog from '@/components/RegLog.vue'
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'logform',
  components: {
    RegLog,
    NavBar
  }
}
</script>
