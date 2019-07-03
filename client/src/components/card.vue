<template>
    <div class="card">
        <v-card class="ma-2" color="#8C7672" dark width="800" min-height="150px" height="auto" hover>
              <v-card-title>
               <a href="" style="text-decoration : none; color : white"><h2><b>{{question.title}}</b></h2></a>
              </v-card-title>
              <v-card-text style ="padding : 10px; font-size : 20px" class="text-truncate">
                <span style="text-align : justify">
                  {{question.description}}
                </span>
                <v-layout>
                    <v-btn color="#D9D9D9" style="color : black" round v-for="(tag,index) in question.tags" :key="index">
                        {{tag}}
                    </v-btn>
                </v-layout>
              </v-card-text>
              <v-card-actions>
                <v-layout row align-center>
                  <v-btn>Answer : {{question.answerList.length}}</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn @click.prevent="upvote" ><i class="fas fa-thumbs-up fa-lg mr-3"></i> : {{question.upVotes.length}}</v-btn>
                  <v-btn @click.prevent="downvote" ><i class="fas fa-thumbs-down fa-lg mr-3"></i> : {{question.downVotes.length}}</v-btn>
                </v-layout>
              </v-card-actions>
              <v-layout>
                  <v-btn @click.prevent="doDelete" >Delete</v-btn>
                  <v-btn @click.prevent="doEdit" >Edit</v-btn>
              </v-layout>
        </v-card>
        <v-dialog v-model="dialog" persistent max-width="600px">
                <v-card>
                    <v-card-title>
                    <span class="headline">createPost</span>
                    </v-card-title>
                    <v-card-text>
                    <v-container grid-list-md>
                        <v-layout row wrap>
                            <v-flex xs12 sm12 md12>
                                <v-text-field v-model="newQuestion.title" label="title" required></v-text-field>
                            </v-flex><br>
                            <v-flex xs12 sm12 md12>
                                <v-textarea v-model="newQuestion.description" label="description" type="text" hint="example of helper text only on focus"></v-textarea>
                            </v-flex>
                            <v-flex>
                                <tags-input element-id="tags" v-model="questionTags" :typeahead="true"></tags-input>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="dialog = false, clearFormCreate()">Close</v-btn>
                    <v-btn color="blue darken-1" flat @click="dialog = false, toCreate()">Create</v-btn>
                    </v-card-actions>
                </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return{
            dialog : false
        }
    },
    props : ['question'],
    methods : {
        upvote(){
            console.log('upvote trigger');
            this.$store.dispatch('upvote',this.question._id)
        },
        downvote(){
            console.log('downvote trigger');
            this.$store.dispatch('downvote',this.question._id)
        },
        doDelete(){
            this.$store.dispatch('getQuestionDetail', this.question._id)
        }
    }
}
</script>
