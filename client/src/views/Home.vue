<template>

  <v-layout id="mainApp">
  <v-flex md6>
     <v-img
          :src="require('../assets/LandingImage.svg')"
          contain
          height="300"
          style="margin-top:15%"
          
        ></v-img>
  </v-flex>
  <v-flex md6>
    <v-layout justify-center>
      <v-flex md8 offset-md2 style="margin-top: 23%">
      <h1 id="bigTitle">GOT STUCK ?</h1>
      <h2 id="medTitle">dont worry, your are not alone, we gonna <br> help you, just <span @click="login">Ask..</span></h2>
      </v-flex>
    </v-layout>
  </v-flex>

  </v-layout>
  
</template>

<script>
  

  export default {
    components: {
      
    },
    methods : {
      login(){
        alert("test button")
      }
    }
  }
</script>

<style scoped>
  #mainApp{
    background-color: rgb(224, 220, 221);
    height: 100%;
  }
  #bigTitle{
    font-family: 'Knewave', cursive;
    color: #FB7E51;
    font-size: 60px;
  }
  #medTitle{
    font-family: 'Chewy', cursive;
    color: #393A3A;
    font-size: 20px;
  }
  #medTitle span{
    font-family: 'Chewy', cursive;
    color:  #FB7E51;
    font-size: 20px;
    cursor: pointer;
  }
</style>

