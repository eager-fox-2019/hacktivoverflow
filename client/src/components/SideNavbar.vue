<template>
  <div class="pl-0 pr-0" id="nav-side">
    <b-nav class="d-flex flex-column">
      <b-nav-item :to="'/question/create'" :active="$route.name == 'question-create'">Ask Question</b-nav-item>
      <hr style="margin: 0" v-if="this.checkAuhor()"/>
      <b-nav-item :active="$route.name == 'question-edit'" v-if="this.checkAuhor()">Edit Question</b-nav-item>
      <hr style="margin: 0" v-if="$route.name == 'question'"/>
      <b-nav-item :to="`/question/${$route.params.id}/answer/post`" v-if="$route.name == 'question'">Post Answer</b-nav-item>
      <hr style="margin: 0" v-if="$route.name == 'answer-edit'"/>
      <b-nav-item :active="$route.name == 'answer-edit'" v-if="$route.name == 'answer-edit'">Edit Answer</b-nav-item>
      <hr style="margin: 0"/>
      <b-nav-item>Test</b-nav-item>
    </b-nav>
  </div>
</template>

<script>
export default {
  name: 'SideNavbar',
  methods: {
    checkAuhor () {
      return false  
    }
  }
}
</script>

<style>
#nav-side a {
  font-weight: bold;
  font-size: 15px;
  color: black;
}

#nav-side a:hover {
  opacity: 0.7;
}

#nav-side a.router-link-exact-active {
  color: #38af79;
  background: rgba(255, 160, 77, 0.644);
}

#nav-side {
  border-right: 2px dashed #FFA14D;
  text-align: right;
}

hr {
  width: 100%;
  border: 1px dashed #FFA14D !important;
}
</style>
