<template>
  <div class="home">
    <router-view />
    <NavBar></NavBar>
    <div class="row">
      <div class="col s12 l3 m3">
        <!-- MENU LEFT BAR -->
        <MenuLeftBar></MenuLeftBar>
      </div>
      <div class="col m6 l6 s12">
        <!-- SEARCH -->
        <SearchForm></SearchForm>
        <hr />
        <!-- LIST QUESTION -->
        <span>All Question</span>
        <hr>
        <QuestionCard></QuestionCard>
      </div>
      <!-- MENU RIGHT BAR -->
      <div class="col m3 l3 s12">
        <!-- WATCH TAG -->
        <WatchTagCard></WatchTagCard>
      </div>
    </div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar'
import MenuLeftBar from '@/components/MenuLeftBar'
import SearchForm from '@/components/SearchForm'
import QuestionCard from '@/components/QuestionCard'
import QuestionForm from '@/components/QuestionForm'
import WatchTagCard from '@/components/WatchTagCard'

export default {
  name: 'home',
  components: {
    NavBar,
    MenuLeftBar,
    SearchForm,
    QuestionCard,
    QuestionForm,
    WatchTagCard
  }
}
</script>
