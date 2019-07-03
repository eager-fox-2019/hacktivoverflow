<template>
  <div class="homepage" style="height : 100%">
    <v-container fluid style=" margin : 0;background-color : #260101 ;height : 100%">
    <navbar/>
    <v-container></v-container>
      <v-layout row justify-center>
        <v-flex lg9 md12 xs12 mr-2 style="justify-content:center; text-align : center;background-color : #735451; height : 100%">
          <h1>List of Question</h1>
          <v-flex lg6 offset-lg3>
            <v-text-field
              append-icon="mic"
              class="mx-5"
              width="300"
              flat
              label="Search"
              prepend-inner-icon="search"
              solo-inverted
            ></v-text-field>
          </v-flex>
          <router-view/>
          <v-layout column align-center lg12 style="">
            <card v-for="question in allQuestion" :key="question._id" :question="question"/>
          </v-layout>
        </v-flex>
        <v-flex lg3 md12 xs6 ml2 style="background-color : #D9D9D9">
          <!-- <h1>gimana</h1> -->
        </v-flex>
      </v-layout>
    </v-container>
  </div>
  
  
</template>

<script>
  import navbar from '../components/navbar'
  import card from '../components/card'
  import { mapState } from 'vuex'
  export default {
    components: {
      navbar,
      card
    },
    data(){
      return{

      }
    },
    computed : {
      ...mapState(['allQuestion'])
    },
    watch : {
      '$route'(){
          console.log(this.$route)
          if(this.$route.name === 'home'){
            localStorage.page = 'home'
            this.$store.dispatch('fetchAllQuestion')
          }else if(this.$route.name === 'profile'){
            this.$store.dispatch('fetchUserQuestion')
          }
        }
      },
    created(){
      if(localStorage.page === 'profile'){
        this.$router.push('/myProfile')
      }else{
        this.$store.dispatch('fetchAllQuestion')

      }

    }
  }
</script>
