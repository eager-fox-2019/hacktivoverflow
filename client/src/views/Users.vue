<template>
  <div class="row">
    <router-view />
    <NavBar></NavBar>
    <div class="col s12 l3 m3">
      <!-- MENU LEFT BAR -->
      <MenuLeftBar></MenuLeftBar>
    </div>
    <div class="col m6 l6 s12">
      <!-- QUESTION FORM -->
      <div class="">
      </div>
      <SearchForm></SearchForm>
      <hr>
        <span>Users</span>
      <hr>
    </div>
    <!-- MENU RIGHT BAR -->
    <div class="col m3 l3 s12">
      <!-- WATCH TAG -->
      <WatchTagCard></WatchTagCard>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import MenuLeftBar from '@/components/MenuLeftBar'
import SearchForm from '@/components/SearchForm'
import WatchTagCard from '@/components/WatchTagCard'

export default {
  components: {
    NavBar,
    MenuLeftBar,
    SearchForm,
    WatchTagCard
  }
}
</script>

<style>
</style>
