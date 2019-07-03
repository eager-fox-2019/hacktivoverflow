<template>
  <div class="homepage" style="height : 100%">
    <v-container fluid style=" margin : 0; margin-top : -65px ; background-color : #260101 ;height : auto">
    <navbar/>
      <v-layout row justify-center style="margin-top: 75px">
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
          <v-layout column align-center lg12 style="">
            <v-card v-for="i in 6" :key="i" class="ma-2" color="#8C7672" dark width="800" min-height="150px" height="auto">
              <v-card-title>
               <a href="" style="text-decoration : none; color : white"><h2><b>Question Title</b></h2></a>
              </v-card-title>
              <v-card-text style ="padding : 10px; font-size : 20px" class="text-truncate">
                <span style="text-align : justify">
                  lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet
                </span>
              </v-card-text>
              <v-card-actions>
                <v-layout row align-center>
                  <v-btn>Answer 5</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn><i class="fas fa-thumbs-up fa-lg mr-3"></i> 5</v-btn>
                  <v-btn><i class="fas fa-thumbs-down fa-lg mr-3"></i> 10</v-btn>
                </v-layout>
              </v-card-actions>
            </v-card>
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
  export default {
    components: {
      navbar
    }
  }
</script>
