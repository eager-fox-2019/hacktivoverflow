<template>
  <div class="row">
    <router-view />
    <NavBar></NavBar>
    <div class="col s12 l3 m3">
      <MenuLeftBar></MenuLeftBar>
    </div>
    <div class="col m6 l6 s12">
      <SearchForm></SearchForm>
      <hr>
      <span>Tags</span>
      <hr>
      <TagCard></TagCard>
    </div>
    <div class="col m3 l3 s12">
      <WatchTagCard></WatchTagCard>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import MenuLeftBar from '@/components/MenuLeftBar'
import TagCard from '@/components/TagCard'
import SearchForm from '@/components/SearchForm'
import WatchTagCard from '@/components/WatchTagCard'

export default {
  components: {
    NavBar,
    MenuLeftBar,
    TagCard,
    SearchForm,
    WatchTagCard
  }
}
</script>

<style>
</style>
