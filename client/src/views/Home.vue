<template>
  <div style="display:flex">
    <div class="col-9" v-if="islogin">
      <h2 style="text-align:center">Questions</h2>
      <br />
      <div style="display:flex;flex-direction:row;flex-wrap:wrap;">
        <div class="col-4" v-for="question in questions" :key="question._id">
          <HomeCard :question="question"></HomeCard>
        </div>
      </div>
    </div>
    <div class="col-3">
      <h2 style="text-align:center">Categories</h2>
      <br />
      <div class="card text-white bg-dark mb-3" style="width: 18rem;">
        <ul class="list-group list-group-flush" style="padding:20px">
          <div v-for="category in categories" :key="category">
            <li class="list-group-item" style="border-radius:10px;margin-bottom:5px;">
              <Category :category="category">
                <div
                  style="cursor:pointer;color:black"
                  v-on:click="FETCHQUESTIONS(category)"
                >{{ category }}</div>
              </Category>
            </li>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import HomeCard from '@/components/HomeCard.vue'
import Category from '@/components/Category.vue'
import { mapActions } from 'vuex'
export default {
  name: 'home',
  props: ['islogin'],
  data () {
    return {}
  },
  components: {
    HomeCard,
    Category
  },
  computed: {
    url () {
      return this.$store.state.url
    },
    questions () {
      return this.$store.state.questions
    },
    categories () {
      return this.$store.state.categories
    }
  },
  methods: {
    ...mapActions(['FETCHQUESTIONS'])
  },
  created () {
    localStorage.setItem('currentPage', JSON.stringify({ name: 'home' }))
    this.FETCHQUESTIONS()
  }
}
</script>
<style>
.card {
  margin-bottom: 15px;
  margin-right: 5px;
}
</style>
