<template>
  <div id='login' class="container login">
    <h2 class="text-center mb-3 mt-4">Login Form</h2>
    <LoginForm/>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue'
export default {
  name: 'login',
  components: {
    LoginForm
  }
}
</script>
