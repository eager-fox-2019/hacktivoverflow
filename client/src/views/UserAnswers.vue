<template>
  <v-container id="userAnswersContainer">
    <v-layout justify-center align-center>
      <v-flex>
        <UserAnswerCard v-if="myAnswers.length !== 0"/>
        <div v-else class="container">
          <div class="row">
            <div class="col-8">
              <img
                src="https://cdn.dribbble.com/users/2440722/screenshots/6289858/pop05.jpg"
                alt
                srcset
                height="500"
              />
            </div>
            <div class="col-4 text-center mt-5">
              <h5>You have never answer any question before</h5>
              <p>Dont mind to give a little help to others.</p>
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
import { mapState } from "vuex";
import UserAnswerCard from "../components/UserAnswerCard";
export default {
  methods:{
        goQuestion(){
          this.$router.push('/')
        }
  },
  computed: mapState(["myAnswers"]),
  components: {
    UserAnswerCard
  },
  created(){
     if(!localStorage.getItem('token')){
      this.$router.push('/')
    }
  }
};
</script>

<style scoped>
#userAnswersContainer {
  width: 100% !important;
}
</style>
