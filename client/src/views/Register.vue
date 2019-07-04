<template>
  <div class="home">
    <router-view />
    <NavBar></NavBar>
    <div class="row">
      <div class="col s12 l3 m3">
          <MenuLeftBar></MenuLeftBar>
      </div>
      <div class="col m6 l6 s12">
        <RegisterForm></RegisterForm>
      </div>
      <div class="col m3 l3 s12">
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import MenuLeftBar from '@/components/MenuLeftBar'
import RegisterForm from '@/components/RegisterForm'

export default {
  name: 'login',
  components: {
    NavBar,
    MenuLeftBar,
    RegisterForm
  }
}
</script>
