<template>
  <v-container id="dashboardContainer" style="margin:0 !important;">
    <v-layout justify-space-between>
      <v-flex xs10>
        <p style="text-align:center;">Please input spesific tags to subscribe on your favorite subject, Press Enter to input your watched tag.</p>
        <div data-src="" width="" height="" alt="" uk-img="target: .my-class"></div>
        <WatchedTag/>
        <div v-if="this.$route.path == '/dashboard' && allQuestions.length">
          <QuestionCard
          v-bind:search="search"
          ></QuestionCard>
        </div>
        <router-view/>
      </v-flex>
      <v-flex xs2>
        <v-container grid-list-xs class="mt-5" style="padding: 0px">
          <div style="border-bottom: 1px solid #eeeeee" class="text-xs-center">
              <i class="fas fa-briefcase px-2 pb-4"></i>Looking for a jobs?
          </div>
           <v-layout
                row
                style="border-bottom: 1px solid #eeeeee"
                v-for="(job, index) in jobs"
                :key="index"
                class="card-layout"
              >
                <v-flex xs2>
                  <v-avatar size="30px">
                    <img :src="job.company_logo" alt>
                  </v-avatar>
                </v-flex>
                <v-flex xs10 class="px-3">
            <a :href="job.url" target="_blank" style="text-decoration:none">
                  <div class="caption" style="color: black">{{job.title}}</div>
                  <h5 class="caption type font-weight-regular">{{job.type}}</h5>
            </a>
                </v-flex>
              </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import QuestionCard from "../components/QuestionCard";
import WatchedTag from "../components/WatchedTag"
import { mapState } from "vuex";
export default {
  props: ['search'],
  data() {
    return {
      jobs: [],
      socket : io('http://localhost:3000')
    };
  },
  components: {
    QuestionCard,
    WatchedTag
  },
  computed: {
    ...mapState(["allQuestions"])
  },
  mounted(){
    if(!localStorage.getItem('token')){
      this.$router.push('/')
    }
    this.$store.dispatch("getTags")
    this.socket.on('getJobs', data => {
          console.log('cron is triggered?')
          this.jobs = data
    })
  }
};
</script>

<style scoped>
#dashboardContainer {
  width: 100% !important;
}
</style>
