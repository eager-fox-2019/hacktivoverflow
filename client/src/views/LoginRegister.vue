<template>
  <div v-if="!islogin">
    <h1 class="header">HacktivOverflow</h1>
    <div style="text-align: center; margin: 0.8rem 0 0 0;">
      Register for a new account / login to an existing account.
    </div>
    <div id="loginRegister">
      <div class="rlcont">
        <register-form/>
      </div>
      <div class="rlcont">
        <login-form/>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue'
import RegisterForm from '@/components/RegisterForm.vue'

export default {
  name: 'login-register',
  props: ['islogin'],
  components: { LoginForm, RegisterForm },
  data() {
    return {}
  },
  created() {
    if(this.islogin) {
      this.$router.push('/questions')
    }
  },
}
</script>

<style>
.header {
  margin-top: 2rem;
  text-align: center;
  font-weight: bold;
}
#loginRegister {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}
.form1 {
  min-width: 18rem;
  margin: 1rem;
  padding: 1rem 1.2rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.7rem #555;
}
.f1title {
  font-size: 1.25rem;
  margin-bottom: 0.8rem;
  text-align: center;
}
.rlcont {
  margin: 0 1rem;
}

</style>
