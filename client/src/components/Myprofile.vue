<template>
  <v-container>
    <v-layout>
      <v-flex >

        <v-card v-for="question in this.$store.state.MyQuestion" :key="question._id"  flat style="border-top: 1px solid lightgrey;">
          <v-flex xs12>
            <v-card flat color="#FAFAFA" >
              <v-layout row>
                <v-flex xs1>
                  <cardCounter types="answer" :jumlah="question.AnswerId.length" > </cardCounter >
                  <cardCounter types="likes" :jumlah="question.upVote.length - question.downVote.length" ></cardCounter>
                </v-flex>
                <v-flex xs11>
                  <v-card-title style="margin-bottom:-1px;">
                    <div>
                      <div @click="moveToDetails(question._id)" class="headline">{{question.title}}</div>
                      <span>{{question.content}}</span>
                      
                    </div>
                  </v-card-title>
                  <v-card-actions>
                    <v-layout row justify-end >
                      <v-flex xs1>
                        <small><i   class="material-icons  tambah">delete</i></small>&nbsp;&nbsp;
                        <small> <i  class="material-icons tambah"> edit</i></small>
                       <!-- <small>{{question.createdAt.substring(0,10)}}</small>&nbsp;
                       <small>{{question.UserId.first_name}} {{question.UserId.last_name}}</small>&nbsp;
                         <a><small>{{question.category}}</small></a> -->
                             
                      </v-flex>
                    </v-layout>
                  </v-card-actions>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-card>


      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import cardCounter from "../components/cardCounter";
export default {
  data() {
    return {};
  },
  methods:{
    moveToDetails(id){
      this.$router.push(`/question/${id}`)
      // alert(id)
    }
  },
  components: {
    cardCounter
  },
  created(){
    this.$store.dispatch('fetchMyQuestion')
  }
};
</script>

<style scoped>
  .headline:hover{
    cursor: pointer;
  }
  .tambah {
      color: #FB7E51;
  }
</style>



