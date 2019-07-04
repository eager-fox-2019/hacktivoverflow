<template>
    <div class="homepage" style="height : 100%">
    <v-container fluid style=" margin : 0;background-color : #260101 ;height : 100%">
    <navbar/>
    <v-container></v-container>
      <v-layout row justify-center style="min-height : 100vh">
        <v-flex lg9 md12 xs12 mr-2 style="justify-content:center; text-align : center;background-color : #735451; min-height : 100%">
          <h1>Question Detail</h1>
          <v-layout row justify-center>
              <v-card class="ma-2" color="#8C7672" dark width="800" min-height="150px" height="auto" hover>
              <v-card-title>
                  <h1>Question : {{detailQuestion.title}}</h1>
              </v-card-title>
              <v-card-text style ="padding : 10px; font-size : 20px" class="text-truncate">
                <span style="text-align : justify">
                  {{detailQuestion.description}}
                </span>
                <v-layout>
                    <v-btn color="#D9D9D9" style="color : black" round v-for="(tag,index) in detailQuestion.tags" :key="index">
                        {{tag}}
                    </v-btn>
                </v-layout>
              </v-card-text>
              <v-card-actions>
                <v-layout row align-center>
                  <v-btn @click="dialog = true">click here to input Answer</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="success" @click.prevent="upvote" ><i class="fas fa-thumbs-up fa-lg mr-3"></i> : {{detailQuestion.upVotes.length}}</v-btn>
                  <v-btn color="warning" @click.prevent="downvote" ><i class="fas fa-thumbs-down fa-lg mr-3"></i> : {{detailQuestion.downVotes.length}}</v-btn>
                </v-layout>
              </v-card-actions>
        </v-card>
          </v-layout>
          <v-layout column align-end lg12 style="">
            <cardAnswer v-for="answer in detailQuestion.answerList" :key="answer._id" :answer="answer"/>
          </v-layout>
        </v-flex>
        <v-flex lg3 md12 xs6 ml2 style="background-color : #D9D9D9">
          <!-- <h1>gimana</h1> -->
        </v-flex>
      </v-layout>
    </v-container>
    <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                <span class="headline">add Answer</span>
                </v-card-title>
                <v-card-text>
                <v-container grid-list-md>
                    <v-layout row wrap>
                        <v-flex xs12 sm12 md12>
                            <v-text-field v-model="newAnswer.title" label="title" required></v-text-field>
                        </v-flex><br>
                        <v-flex xs12 sm12 md12>
                            <v-textarea v-model="newAnswer.description" label="description" type="text" hint="example of helper text only on focus"></v-textarea>
                        </v-flex>
                    </v-layout>
                </v-container>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="dialog = false, clearFormCreate()">Close</v-btn>
                <v-btn color="blue darken-1" flat @click="dialog = false, doCreate()">create</v-btn>
                </v-card-actions>
            </v-card>
    </v-dialog>
  </div>
</template>

<script>
import cardAnswer from '../components/cardAnswer'
import navbar from '../components/navbar'
import { mapState } from 'vuex'

export default {
    data(){
        return {
            dialog : false,
            newAnswer : {
                title : '',
                description : ''
            }
        }
    },
    methods : {
        upvote(){
            console.log('upvote trigger');
            this.$store.dispatch('upvote',this.detailQuestion._id)
        },
        downvote(){
            console.log('downvote trigger');
            this.$store.dispatch('downvote',this.detailQuestion._id)
        },
        clearFormCreate(){
            this.newAnswer = {
                title : '',
                description : ''
            }
            this.selectedTags = []
        },

        doCreate(){
            let data = {}
            data = this.newAnswer
            data.id = this.detailQuestion._id
            
            this.$store.dispatch('createAnswer',data)
            this.clearFormCreate()
            setTimeout(()=>{
                this.$swal('successfully add answer', '', 'success')
            },1000)
        }
    },
    components : {
        cardAnswer,
        navbar
    },
    computed : {
        ...mapState(['detailQuestion'])
    },
    created(){

    }
}
</script>
