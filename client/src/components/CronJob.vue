<template>
  <div class="row">
    <div class="col s12 m6">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">CronJob</span>
          <!-- <p>{{ jobs.data.attachments[0].text }}</p> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import jobApi from '../api/jobApi'

export default {
  data() {
    return {
      // jobs: ""
    };
  },
  methods: {
    // loadCronJob() {
    //   const CronJob = require("cron").CronJob;
    //   new CronJob(
    //     "*/5 * * * * *",
    //     () => {
    //       // console.log('TES')
    //       jobApi
    //         .get("/")
    //         .then(job => {
    //           this.jobs = job;
    //           console.log(job, " job--------");
    //           // console.log(`${joke.attachments[0]}`)
    //         })
    //         .catch(err => {
    //           // console.log(err)
    //         });
    //     },
    //     null,
    //     true,
    //     "America/Los_Angeles"
    //   );
    // }
  },
  created() {
    // this.loadCronJob();
  }
};
</script>
