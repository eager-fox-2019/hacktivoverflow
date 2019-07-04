<template>
  <div id="questionPage">
    <div v-if="loaded">
      <div v-if="showEditForm">
        <EditQuestionForm :originalQuestion="loaded"
        @hideQuestionForm="toggleQuestionForm"/>
      </div>

      <div v-if="showEditForm==false">
      	<div class="question d-flex flex-column justify-content-left">
          <div class="d-flex flex-row">
        		<VoteButtons :selected="userVoted" :totalVotes="totalVotes" @upvote="upvote" @downvote="downvote"/>
        	  <div class="questionDetailArea text-justify">
      		    <h1>{{title}}</h1>
              <p>{{name}}</p>
      		    <p>{{description}}</p>
      		  </div>
          </div>

          <div v-if="isOwner" class="text-left">
            <span>
              <a href="#" @click.prevent="editForm" class="text-primary">Edit This Question</a> |
              <a href="#" @click.prevent="delForm" class="text-danger">Delete</a>
            </span>
          </div>
        </div>

        <!-- Add your own answer -->
        <AnswerForm v-if="showAnswerForm" :questionId="questionId" @hideForm="toggleAnswerForm" />

        <div v-if="showAnswerForm==false">
          <b-button  variant="success" @click="toggleAnswerForm">Add Answer</b-button>

          <!-- answers to the question listed here -->
          <AnswerList/>
        </div>
      </div>
    </div>

    <h3 v-if="loaded==false">loading...</h3>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import VoteButtons from '@/components/VoteButtons.vue'
import AnswerList from '@/components/AnswerList.vue'
import AnswerForm from '@/components/AnswerForm.vue'
import EditQuestionForm from '@/components/EditQuestionForm.vue'

export default {
  name: 'Question',
  data () {
    return {
      showAnswerForm: false,
      showEditForm: false
    }
  },
  components: {
  	VoteButtons,
    AnswerList,
    AnswerForm,
    EditQuestionForm
  },
  created () {
    if (!this.isLoggedin) {
      this.$router.push('/user/login')
    }
  },
  mounted () {
    this.$store.dispatch('getQuestionDetail', this.$route.params.id)
  },
  computed: {
    userVoted () {
      if (!this.currentQuestion) return 'none'
      let userId = this.user.id
      if (this.currentQuestion.upvotes.includes(userId)) {
        return 'up'
      } else if (this.currentQuestion.downvotes.includes(userId)) {
        return 'down'
      } else {
        return 'none'
      }
    },
    isOwner () {
      if (!this.currentQuestion) return false
      // console.log(this.currentQuestion)
      return this.currentQuestion.owner.email == this.$store.state.user.email
    },
    loaded () {
      return (this.currentQuestion)
    },
    name () {
      if (!this.currentQuestion) return 'loading'
      return 'by ' + this.currentQuestion.owner.name
    },
    totalVotes () {
      if (!this.currentQuestion) return 'loading'
      return this.currentQuestion.upvotes.length - this.currentQuestion.downvotes.length
    },
    title () {
    	if (!this.currentQuestion) return 'loading'
    	return this.currentQuestion.title
    },
    description () {
    	if (!this.currentQuestion) return 'loading'
    	return this.currentQuestion.description
    },
    questionId () {
    	if (!this.currentQuestion) return 'loading'
    	return this.currentQuestion._id
    },
  	...mapState(['currentQuestion', 'isLoggedin', 'user'])
  },
  methods: {
    upvote () {
      this.$store.dispatch('voteQuestion', { question: this.currentQuestion, type: 'up' })
    },
    downvote () {
      this.$store.dispatch('voteQuestion', { question: this.currentQuestion, type: 'down' })
    },
    toggleAnswerForm () {
      this.showAnswerForm = !this.showAnswerForm
    },
    toggleQuestionForm () {
      this.showEditForm = !this.showEditForm
    },
    delForm () {
      let { state, commit, dispatch } = this.$store

      dispatch('deleteQuestion', this.questionId)
        .then(deleted => {
          let tempArray = state.questionList
          for (let i = 0; i < tempArray.length; i++) {
            if (tempArray[i]._id == this.questionId) {
              tempArray.splice(i, 1)
            }
          }

          commit('UPDATEQUESTIONLIST', [])
          commit('UPDATEQUESTIONLIST', tempArray)

          this.$router.push('/')
        })
        .catch(({ response }) => {
          // console.log(response.data)
          commit('SHOWMSG', {
            message: response.data,
            type: 'danger'
          })
        })
    },
    editForm () {
      this.showEditForm = !this.showEditForm
    }
  }
}
</script>

<style scoped>
.question {
  padding: 1em;
  margin-bottom: 1em;
  border-bottom: dotted 1px;
}
.questionDetailArea {
  margin-left: 1em;
}
.question button {
  margin: 0.2em;
}
#questionPage {
  background-color: #DCC7AA;
  padding-bottom: 1em;
}
</style>
