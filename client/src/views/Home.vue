<template>
  <div class="detail">
    <Navbar></Navbar>
    <div class="row">
        <div class="col-2 side-nav">
          <SideNavbar></SideNavbar>
        </div>
        <div class="col-8 ">
          <QuestionList></QuestionList>
        </div>
        <div class="col-2">
          <WatchedTag></WatchedTag>
          <ListJob></ListJob>
        </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import WatchedTag from '@/components/WatchedTag.vue'
import SideNavbar from '@/components/SideNavbar.vue'
import QuestionList from '@/components/QuestionList.vue'
import ListJob from '@/components/ListJob.vue'
import { CronJob } from 'cron'
import axios from '@/api/server.js'

export default {
  name: 'home',
  components: {
    Navbar,
    WatchedTag,
    SideNavbar,
    QuestionList,
    ListJob
  },
  created () {
    new CronJob('*/1 * * * *' ,() => {
        axios.get('/jobs')
        .then(({ data }) => {
          console.log('cron job')
          console.log(data.slice(0,10))
          this.$store.commit("getJobs", data.slice(0,10))
        })
        .catch(err => {
          console.log(err)
        })
    }, null, true, 'America/Los_Angeles');
  }
}
</script>getJobs

<style scoped>
.row {
  margin : 0 0;
}
.col-2 {
  padding: 5px;
  max-height: 200vh;
  overflow: scroll;
}
.side-nav {
  text-align: center;
  border-right: 1px solid rgb(201, 196, 196);
  position: relative;
  left: 0;
  overflow-x: hidden;
  padding-top: 20px;
}
::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	background-color: #F5F5F5;
}

::-webkit-scrollbar
{
	width: 10px;
	background-color: #F5F5F5;
}

::-webkit-scrollbar-thumb
{
	background-color: #F90;	
	background-image: -webkit-linear-gradient(45deg,
rgba(255, 255, 255, .2) 25%,
  transparent 25%,
  transparent 50%,
  rgba(255, 255, 255, .2) 50%,
  rgba(255, 255, 255, .2) 75%,
  transparent 75%,
  transparent)
}
</style>

