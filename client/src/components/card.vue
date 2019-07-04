<template>
    <div class="card">
        <v-card class="ma-2" color="#8C7672" dark width="800" min-height="150px" height="auto" hover>
              <v-card-title>
               <a href="#" @click="toDetailPage" style="text-decoration : none; color : white"><h2><b>{{question.title}}</b></h2></a>
              </v-card-title>
              <v-card-text style ="padding : 10px; font-size : 20px" class="text-truncate">
                <v-card class="mb-2" style="display : flex; align-items : center;min-height : 50px;text-align : left; padding : 10px; background-color: #D9D9D9; color : black">
                    <span v-html="question.description">
                    </span>
                </v-card>
                <v-layout>
                    <v-btn color="#D9D9D9" style="color : black; font-size : 10px; padding : 0px" round v-for="(tag,index) in question.tags" :key="index">
                        {{tag}}
                    </v-btn>
                </v-layout>
              </v-card-text>
              <v-card-actions>
                <v-layout row align-center>
                  <v-btn>Answer : {{question.answerList.length}}</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn class="success" @click.prevent="upvote" ><i class="fas fa-thumbs-up fa-lg mr-3"></i> : {{question.upVotes.length}}</v-btn>
                  <v-btn class="warning" @click.prevent="downvote" ><i class="fas fa-thumbs-down fa-lg mr-3"></i> : {{question.downVotes.length}}</v-btn>
                </v-layout>
              </v-card-actions>
              <v-layout v-show="page === 'profile'">
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
                                <!-- <v-textarea v-model="newQuestion.description" label="description" type="text" hint="example of helper text only on focus"></v-textarea> -->
                                <VueEditor v-model="newQuestion.description" />
                            </v-flex>
                            <v-flex>
                                <tags-input element-id="tags" v-model="selectedTags" :typeahead="true"></tags-input>
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
import { VueEditor } from 'vue2-editor'

export default {
    data(){
        return{
            selectedTags : [],
            dialog : false,
            newQuestion : {
                title : '',
                description : ''
            },
            userId : localStorage.userId,
            page : localStorage.page
        }
    },
    components : {
        VueEditor
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
        doEdit(){
            this.$store.dispatch('getQuestionDetail', this.question._id)
            setTimeout(()=>{
                this.newQuestion.title = this.questionEditData.title,
                this.newQuestion.description = this.questionEditData.description,
                this.questionEditData.tags.forEach(element => {
                    this.selectedTags.push({key : element, value : element})
                });
                this.dialog = true
            },1000)
        },
        toEdit(){
            let data = this.newQuestion
            data.tags = this.tags
            data.id = this.question._id
            console.log('==========',data);
            this.clearFormCreate()
            this.$store.dispatch('editQuestion',data)
        },
        doDelete(){
            this.$store.dispatch('deleteQuestion', this.question._id)
        },
        clearFormCreate(){
            this.selectedTags = []
            this.newQuestion = {
                title : '',
                description : ''
            }
        },

        toDetailPage(){
            this.$store.dispatch('getQuestionDetail', this.question._id)
            localStorage.page = 'detail'
            setTimeout(()=>{
                this.$router.push(`/detail/${this.question._id}`)
            },1000)

        }
    },
    computed : {
        tags(){
            let array = this.selectedTags.map(tag =>{
                return tag.value
            })
            return array
        },
        ...mapState(['questionEditData'])
    },
    watch : {
        '$route'(){
            console.log('trigerred=======================');
            if(this.$route.name === 'profile'){
                this.page = 'profile'
            }else if(this.$route.name === 'home'){
                this.page = 'home'
            }
            
        }
    }
}
</script>
