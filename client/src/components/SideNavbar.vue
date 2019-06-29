<template>
  <div class="pl-0 pr-0" id="nav-side">
    <QuestionFilter style="width: 80%; margin: 0 auto" class="mt-3 mb-3" v-if="$route.name == 'home'"/>
    <b-nav class="d-flex flex-column">
      <hr style="margin: 0" v-if="$route.name == 'home'"/>
      <b-nav-item :to="'/question/create'" :active="$route.name == 'question-create'">Ask Question</b-nav-item>
      <hr style="margin: 0" v-if="($route.name == 'question-detail' && $store.state.selectedQuestion.user.email == $store.state.user.email) || $route.name == 'question-edit'"/>
      <b-nav-item :to="`/question/${$route.params.id}/edit`" :active="$route.name == 'question-edit'" v-if="($route.name == 'question-detail' && $store.state.selectedQuestion.user.email == $store.state.user.email) || $route.name == 'question-edit'">Edit Question</b-nav-item>
      <hr style="margin: 0" v-if="$route.name == 'question-detail' || $route.name == 'answer-post'"/>
      <b-nav-item :to="`/question/${$route.params.id}/answer/post`" v-if="$route.name == 'question-detail' || $route.name == 'answer-post'" :active="$route.name == 'answer-post'">Post Answer</b-nav-item>
      <hr style="margin: 0" v-if="$route.name == 'answer-edit'"/>
      <b-nav-item :to="`/question/${$route.params.id}/answer/edit/${$route.params.answerId}`" :active="$route.name == 'answer-edit'" v-if="$route.name == 'answer-edit'">Edit Answer</b-nav-item>
      <hr style="margin: 0"/>
    </b-nav>
  </div>
</template>

<script>
import QuestionFilter from '@/components/QuestionFilter'
export default {
  name: 'SideNavbar',
  components: {
    QuestionFilter
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
  background: rgba(255, 206, 163, 0.233);
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
