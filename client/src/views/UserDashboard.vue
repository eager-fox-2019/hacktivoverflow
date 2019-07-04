<template>
  <v-container id="userDashboardContainer">
    <v-layout justify-center align-center>
      <v-flex>
        <UserQuestionCard v-if="myQuestions.length !== 0" />
        <div v-else class="container">
          <div class="row">
            <div class="col-8">
              <img
                src="https://cdn.dribbble.com/users/94598/screenshots/3133393/bbc_focus_olstein_ask_an_astronaut_01.jpg"
                alt
                srcset
                height="500"
              />
            </div>
            <div class="col-4 text-center mt-5">
              <h5>You have never ask any question</h5>
              <p>Dont be shy to asking for help!</p>
              <button type="button" class="btn btn-outline-dark" @click="goQuestion">
                <i class="fas fa-shopping-cart"></i> Tell Now
              </button>
            </div>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import UserQuestionCard from "../components/UserQuestionCard";
import { mapState } from "vuex";
export default {
  components: {
    UserQuestionCard
  },
  methods:{
        goQuestion(){
          this.$router.push('/createQuestion')
        }
  },
  computed: mapState(["myQuestions"]),
  created() {
     if(!localStorage.getItem('token')){
      this.$router.push('/')
    }
  }
};
</script>

<style scoped>

#userDashboardContainer {
  background-color: white;
  width: 100% !important;
}
</style>
