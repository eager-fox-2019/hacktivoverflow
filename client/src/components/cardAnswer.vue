<template>
    <div class="card">
        <v-card class="ma-2" color="#8C7672" dark width="700" min-height="70px" height="auto" hover>
            <h2>Answer</h2>
              <v-card-title row justify-center>
                <h2><b>
                {{answer.title}}
                </b></h2>
              </v-card-title>
              <v-card-text style ="padding : 10px; font-size : 20px" class="text-truncate">                
                    <v-card class="mb-2" style="display : flex; align-items : center;min-height : 50px;text-align : left; padding : 10px; background-color: #D9D9D9; color : black">
                        {{answer.description}}
                    </v-card>
              </v-card-text>
              <v-card-actions>
                <v-layout row align-center>
                  <v-spacer></v-spacer>
                  <v-btn color="success" @click.prevent="upvote" ><i class="fas fa-thumbs-up fa-lg mr-3"></i> : {{answer.upVotes.length}}</v-btn>
                  <v-btn color="warning" @click.prevent="downvote" ><i class="fas fa-thumbs-down fa-lg mr-3"></i> : {{answer.downVotes.length}}</v-btn>
                </v-layout>
              </v-card-actions>
              <v-layout v-show="answer.userId === userId">
                  <v-btn @click.prevent="doDelete" >Delete</v-btn>
                  <v-btn @click.prevent="doEdit" >Edit</v-btn>
              </v-layout>
        </v-card>
        <v-dialog v-model="dialog" persistent max-width="600px">
                <v-card>
                    <v-card-title>
                    <span class="headline">edit Answer</span>
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
                    <v-btn color="blue darken-1" flat @click="dialog = false, toEdit()">edit</v-btn>
                    </v-card-actions>
                </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data(){
        return{
            dialog : false,
            newAnswer : {
                title : '',
                description : ''
            },
            userId : localStorage.userId,
            page : localStorage.page
        }
    },
    props : ['answer'],
    methods : {
        upvote(){
            console.log('upvote trigger');
            this.$store.dispatch('upvoteAnswer',this.answer)
        },
        downvote(){
            console.log('downvote trigger');
            this.$store.dispatch('downvoteAnswer',this.answer)
        },
        doEdit(){
            this.$store.dispatch('getAnswerDetail', this.answer._id)
            setTimeout(()=>{
                this.newAnswer.title = this.answerEditData.title,
                this.newAnswer.description = this.answerEditData.description,
                this.dialog = true
            },1000)
        },
        toEdit(){
            let data = this.newAnswer
            data.id = this.answer._id
            console.log('==========',data);
            this.clearFormCreate()
            this.$store.dispatch('editAnswer',data)
        },
        doDelete(){
            this.$store.dispatch('deleteAnswer', this.answer)
        },
        clearFormCreate(){
            this.newAnswer = {
                title : '',
                description : ''
            }
        },
    },
    computed : {
      
        ...mapState(['answerEditData'])
    },
    watch : {
        '$route'(){
            console.log('trigerred=======================');
            if(this.$route.name === 'profile'){
                this.page = 'profile'
            }else if(this.$route.name === 'home'){
                this.page = 'home'
            }else if(this.$route.name === 'detailPage'){
                this.page = 'detail'
            }
            
        }
    }
}
</script>
