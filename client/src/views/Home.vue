<template>
  <div class="home">
    <section class="hero is-fullheight-with-navbar">
      <div class="hero-body">
        <div v-if="!isLogin" class="container is-fullhd is-fullheight">
          <div class="columns">
            <div class="column-6">
              <formInput />
            </div>            
          </div>
        </div>
        <div v-if="isLogin" class="que container is-fullhd is-fullheight">
          <div class="columns is-gapless" v-for="data in dataQuestions" :key="data._id">
            <!-- {{dataQuestions}} -->
            <qCard :data="data" class="column"></qCard>  
          </div>
        </div>
      </div>
    </section>
    <!-- <div class="container">
      
    </div> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import formInput from '../components/form'
import {mapState} from 'vuex'
import questionCard from '../components/questionCard'

export default {
  name: 'home',
  components: {
    formInput,
    qCard : questionCard
  },
  computed : {
    ...mapState(['isLogin', 'dataQuestions'])
  },
  created(){
    this.$store.dispatch('getAllQuestions')
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Yatra+One&display=swap');

.columns{
  /* border: 1px solid blue; */
  /* align-content: center; */
  justify-content: center;
}
.column-6{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-content: center;
  /* border: 1px solid black; */
}
.home {
  background-image: url('https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80');
  background-size: cover;
  background-position-y: -80px;
  
}

</style>

