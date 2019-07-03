<template>
  <div class="questionform">
    <NavBar/>
    <QFComponent/>
  </div>
</template>

<script>
import QFComponent from '@/components/QFComponent.vue'
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'questionform',
  components: {
    QFComponent,
    NavBar
  }
}
</script>
