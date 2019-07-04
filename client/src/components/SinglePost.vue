<template>
  <v-container>
    <v-layout column justify-center>
      <v-flex xs8 mt-5>
        <v-flex xs12>
          <v-card flat style="border: 1px solid lightgrey;">
            <v-toolbar height="30" color="#FB7E51" dark>
              <v-toolbar-title style="font-size:15px">Question</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-title style="font-size:15px">{{this.$store.state.singleQuestion ? this.$store.state.singleQuestion.createdAt : ""}}</v-toolbar-title>
            </v-toolbar>
            <v-layout row>
              <v-flex xs1>
                <v-layout align-center justify-center column fill-height>
                  <v-flex>
                    <h1 style="color:#FB7E51;">
                      <i @click="upVote" class="fas fa-chevron-up"></i>
                    </h1>
                  </v-flex>
                  <v-flex>
                    <h1 style="color:#FB7E51;">{{jumlah}}</h1>
                  </v-flex>
                  <v-flex>
                    <h1 style="color:#FB7E51;">
                      <i @click="downVote" class="fas fa-chevron-down"></i>
                    </h1>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs11>
                <v-card-title primary-title>
                  <div>
                    <div style="margin-top:-10px" class="headline">{{this.$store.state.singleQuestion.title}}</div>
                    <v-divider></v-divider>
                    <v-divider></v-divider>
                    <span>{{this.$store.state.singleQuestion.content}}.</span>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-layout row justify-end>
                    <v-flex>
                      <span style="font-size:10px;margin-left:80%">Question By : {{this.$store.state.singleQuestion.UserId.first_name}} {{this.$store.state.singleQuestion.UserId.last_name}}</span>
                    </v-flex>
                  </v-layout>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>

        <!-- ANSWER -->

        <v-flex    xs12 mt-5 >
          <v-card flat style="border: 1px solid lightgrey;">
            <v-toolbar height="30" color="#FB7E51" dark>
              <v-toolbar-title style="font-size:15px">Answer</v-toolbar-title>
            </v-toolbar>

            <v-layout v-for="comment in this.$store.state.singleQuestion.AnswerId" :key="comment._id" row>
              <v-flex xs1>
                <v-layout align-center justify-center column fill-height>
                  <v-flex>
                    <h1 style="color:#FB7E51;">
                      <i   class="fas fa-chevron-up"></i>
                    </h1>
                  </v-flex>
                  <v-flex>
                    <h1  style="color:#FB7E51;">{{comment.upVote - comment.downVote}}</h1>
                  </v-flex>
                  <v-flex>
                    <h1 style="color:#FB7E51;">
                      <i class="fas fa-chevron-down"></i>
                    </h1>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs11>
                <v-layout column>
                  <v-flex xs12>
                    <v-card-title primary-title>
                      <div>
                        <span>{{comment.content}}</span>
                      </div>
                    </v-card-title>
                  </v-flex>
                  <v-flex mt-3>
                    <v-card-actions>
                      <span style="font-size:10px;margin-left:80%">Answered by: : {{comment.UserId.first_name}} {{comment.UserId.last_name}}</span>
                    </v-card-actions>
                  </v-flex>
                  <v-divider></v-divider>
                    <v-divider color="#FB7E51"></v-divider>
                </v-layout>
              </v-flex>
              
            </v-layout>
            <v-divider></v-divider>
            <v-divider></v-divider>
        

           

          </v-card>
        </v-flex>



        <v-flex xs12 mt-5>
          <v-card flat style="border: 1px solid lightgrey;">
            <v-toolbar height="30" color="#FB7E51" dark>
              <v-toolbar-title style="font-size:15px"> Post New Answer</v-toolbar-title>
            </v-toolbar>

            <v-layout column>
              <v-flex xs12>
              <v-textarea
          solo
          name="input-7-4"
          v-model="textArea"
        ></v-textarea>
              </v-flex>
              <v-flex xs12 style="margin-top:-20px">
                  <div>
                   <v-btn @click="submitNewQ" block color="#FB7E51" dark>Submit</v-btn>
                  </div>
              </v-flex>
              
            </v-layout>
            <v-divider></v-divider>
            <v-divider></v-divider>
        

           

          </v-card>
        </v-flex>



      </v-flex>
    </v-layout>
  </v-container>
</template>



<script>
export default {
    data(){
        return {
            question : null,
            textArea : ''

        }
    },
    methods : {

        submitNewQ(){
            
            this.$store.dispatch('createNewAnswer',{
                content : this.textArea,
                questionId : this.$route.params.questionId
                
            })
            this.textArea = ""
            this.$store.dispatch('findOneQuestion',this.$route.params.questionId)
            
        },

        upVote(){
            this.$store.dispatch('upVoteQuestion',{
                questionId : this.$route.params.questionId
            })
            this.$store.dispatch('findOneQuestion',this.$route.params.questionId)
            
        },

        downVote(){
            this.$store.dispatch('downVoteQuestion',{
                questionId : this.$route.params.questionId
            })
            this.$store.dispatch('findOneQuestion',this.$route.params.questionId)
            
        }

    },
    created () {
        this.$store.dispatch('findOneQuestion',this.$route.params.questionId)
    },
    computed : {
      jumlah(){
        return  this.$store.state.singleQuestion.upVote.length - this.$store.state.singleQuestion.downVote.length
      }
    }
};
</script>
