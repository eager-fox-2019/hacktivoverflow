<template>
  <div class="question">
    <NavbarQuestion />
    <el-row :gutter="10">
      <el-col :span="16" :offset="2">
        <div class="grid-content">
          <el-row>
            <el-col :span="1">
              <div class="grid-content">
                <p></p>
              </div>
            </el-col>
            <el-col :span="22">
              <div class="grid-content">
                <el-row>
                  <el-col :span="4">
                    <div class="grid-content" style="border: 1px solid black">
                      <div v-if="thisQuestion.upVote && thisQuestion.downVote">
                        <i class="el-icon-caret-top" @click="onQuestionUpVote()"></i>
                        {{ thisQuestion.upVote.length - thisQuestion.downVote.length }}
                        <i
                          class="el-icon-caret-bottom"
                          @click="onQuestionDownVote()"
                        ></i>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="19">
                    <div class="grid-content" style="border: 1px solid black">
                      <a @click="editDeleteQuestion">
                        <h1>{{ thisQuestion.title }}</h1>
                      </a>
                      <h2 @click="editDeleteQuestion">{{ thisQuestion.description }}</h2>
                    </div>
                  </el-col>
                </el-row>

                <el-row v-if="editableQuestion == true">
                  <el-col :span="19" :offset="4">
                    <div class="grid-content bg-purple-light" style="border: 1px solid blue">
                      <p></p>
                      <el-form ref="editQuestion" :model="editQuestion" label-width="120px">
                        <el-form-item label="Title: ">
                          <el-input v-model="editQuestion.title"></el-input>
                        </el-form-item>
                        <el-form-item label="Description: ">
                          <el-input type="textarea" v-model="editQuestion.description"></el-input>
                        </el-form-item>
                        <el-button type="warning" @click="onUpdateQuestion">Update</el-button>
                      </el-form>
                    </div>
                  </el-col>
                </el-row>

                <el-row v-if="deletableQuestion == true">
                  <el-col :span="19" :offset="4">
                    <el-button type="danger" @click="onDeleteQuestion">Delete</el-button>
                  </el-col>
                </el-row>

                <el-row v-for="(answer,i) in thisQuestion.answers" :key="i">
                  <el-col :span="4" :offset="2">
                    <div class="grid-content" style="border: 1px solid black">
                      <p>
                        <i class="el-icon-caret-top" @click="onAnswerUpVote(answer._id)"></i>
                        {{ answer.upVote.length - answer.downVote.length }}
                        <i
                          class="el-icon-caret-bottom"
                          @click="onAnswerDownVote(answer._id)"
                        ></i>
                      </p>
                    </div>
                  </el-col>
                  <el-col :span="17">
                    <div class="grid-content" style="border: 1px solid black">
                      <a @click="editDeleteAnswer"><h5>{{ answer.title }}</h5></a>
                      <a @click="editDeleteAnswer"><h2>{{ answer.description }}</h2></a>
                    </div>
                  </el-col>
                </el-row>

                <el-row v-if="editableAnswer == true">
                  <el-col :span="19" :offset="4">
                    <div class="grid-content bg-purple-light" style="border: 1px solid blue">
                      <p></p>
                      <el-form ref="editAnswer" :model="editAnswer" label-width="120px">
                        <el-form-item label="Title: ">
                          <el-input v-model="editAnswer.title"></el-input>
                        </el-form-item>
                        <el-form-item label="Description: ">
                          <el-input type="textarea" v-model="editAnswer.description"></el-input>
                        </el-form-item>
                        <el-button type="warning" @click="onUpdateAnswer">Update</el-button>
                      </el-form>
                    </div>
                  </el-col>
                </el-row>

                <h1>Answer this Question</h1>
                <el-form ref="answerForm" :model="answerForm" label-width="120px">
                  <el-form-item label="Title">
                    <el-input v-model="answerForm.title"></el-input>
                  </el-form-item>
                  <el-form-item label="Description">
                    <el-input type="textarea" v-model="answerForm.description"></el-input>
                  </el-form-item>
                  <el-button @click="postAnAnswer">Comment</el-button>
                </el-form>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content">
          <p></p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import NavbarQuestion from "../components/navbar.vue";

export default {
  components: {
    NavbarQuestion
  },
  data() {
    return {
      thisQuestion: {},
      answerForm: {
        title: "",
        description: "",
        questionId: this.$route.params.questionId
      },
      editQuestion: {
        title: "",
        description: "",
        questionId: this.$route.params.questionId
      },
      editAnswer: {
        title: "",
        description: ""
      },
      editableQuestion: false,
      editableAnswer: false,
      deletableQuestion: false,
    };
  },
  methods: {
    postAnAnswer() {
      console.log(this.answerForm, "hiniii dineaaaaa");
      this.$store
        .dispatch("onMakeAnAnswer", this.answerForm)
        .then(res => {
          console.log("huehuehuheuheu");
          this.$store
            .dispatch("getAQuestion", this.$route.params.questionId)
            .then(result => {
              console.log(result, "hulhulhulhlul");
              this.thisQuestion = result;
              this.answerForm.title = "";
              this.answerForm.description = "";
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    onAnswerUpVote(answerId) {
      console.log("upVote nichhh====>", answerId);
      this.$store
        .dispatch("answerUpVote", answerId)
        .then(result => {
          this.$store
            .dispatch("getAQuestion", this.$route.params.questionId)
            .then(result => {
              console.log(result, "hulhulhulhlul");
              this.thisQuestion = result;
              this.answerForm.title = "";
              this.answerForm.description = "";
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    onAnswerDownVote(answerId) {
      console.log("downVote nichhh====>");
      this.$store
        .dispatch("answerDownVote", answerId)
        .then(result => {
          this.$store
            .dispatch("getAQuestion", this.$route.params.questionId)
            .then(result => {
              console.log(result, "hulhulhulhlul");
              this.thisQuestion = result;
              this.answerForm.title = "";
              this.answerForm.description = "";
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    onQuestionUpVote() {
      let questionId = this.$route.params.questionId;
      console.log("question upvote", questionId);
      this.$store
        .dispatch("questionUpVote", questionId)
        .then(result => {
          this.$store
            .dispatch("getAQuestion", this.$route.params.questionId)
            .then(result => {
              console.log(result, "hulhulhulhlul");
              this.thisQuestion = result;
              this.answerForm.title = "";
              this.answerForm.description = "";
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    onQuestionDownVote() {
      let questionId = this.$route.params.questionId;
      console.log("question downvote", questionId);
      this.$store
        .dispatch("questionDownVote", questionId)
        .then(result => {
          this.$store
            .dispatch("getAQuestion", this.$route.params.questionId)
            .then(result => {
              console.log(result, "hulhulhulhlul");
              this.thisQuestion = result;
              this.answerForm.title = "";
              this.answerForm.description = "";
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    editDeleteQuestion() {
      console.log("edit and deleteable");
      if (this.editableQuestion === false) {
        this.editableQuestion = true;
        this.deletableQuestion = true;
      } else {
        this.editableQuestion = false;
        this.deletableQuestion = false;
      }
    },
    editDeleteAnswer() {
      console.log('huehuehuehue')
      if (this.editableAnswer === false) {
        this.editableAnswer = true;
      } else {
        this.editableAnswer = false;
      }
    },
    onUpdateQuestion() {
      console.log("bersiaip mengedit question", this.editQuestion);
      this.$store
        .dispatch("patchUpdateQuestion", this.editQuestion)
        .then(result => {
          this.editableQuestion = false;
          this.deletableQuestion = false;
          this.$store
            .dispatch("getAQuestion", this.$route.params.questionId)
            .then(result => {
              console.log(result, "hulhulhulhlul");
              this.thisQuestion = result;
              this.answerForm.title = "";
              this.answerForm.description = "";
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    onDeleteQuestion() {
      console.log('akan didelete')
      this.$store.dispatch('deleteOnDelete',this.editQuestion)
        .then(result2 => {
          console.log(result2,'==>')
          this.editableQuestion = false;
          this.deletableQuestion = false;
          this.$store
            .dispatch("getAQuestion", this.$route.params.questionId)
            .then(result => {
              console.log(result, "hulhulhulhlul");
              this.thisQuestion = result;
              this.answerForm.title = "";
              this.answerForm.description = "";
              this.$route.push('/home')
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    onUpdateAnswer(answerId) {
      console.log(answerId,'iinininadvbskajlfb kd')
    },
  },
  created() {
    this.$store
      .dispatch("getAQuestion", this.$route.params.questionId)
      .then(result => {
        console.log(result);
        this.thisQuestion = result;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style>
</style>
