<template>
  <div class="home">
  	<QuestionList />
  </div>
</template>

<script>
// @ is an alias to /src
import QuestionList from '@/components/QuestionList.vue'

export default {
  name: 'home',
  components: {
    QuestionList
  }
}
</script>
