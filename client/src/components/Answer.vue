<template>
  <div id="post-card">
    <div id="arrow-vote">
      <div @click="upvote">
        <b-icon
            pack="fas"
            icon="arrow-up"
            class="arrow"
            :class="{'arrow-upvoted' : upvoted}"
            >
        </b-icon>
      </div>
      <div id="score">{{answer.upvote.length - answer.downvote.length}}</div>
      <div @click="downvote">
        <b-icon
            pack="fas"
            icon="arrow-down"
            class="arrow"
            :class="{'arrow-downvoted' : downvoted}"
            @click="downvote"
            >
        </b-icon>
      </div>
    </div>
    <div id="answer">
      <p id="poster">Answered by: {{answer.user.username}} at {{answer.createdAt}}</p>
      <p id="post"  @click="toDetail">{{answer.content}}</p>
      <div id="option-container" v-if="answer.user._id === loggedUser._id">
        <p class="option" @click="deleteThis(answer._id)">delete</p>
        <p class="option" style="margin-left: 15px;" @click="editThis(answer._id)">edit</p>
      </div>
    </div>
    <b-modal :active.sync="isComponentModalActive"
      has-modal-card full-screen :can-cancel="false">
    </b-modal>
  </div>
</template>

<script>
import EditAnswer from '@/components/EditAnswer.vue'
import { mapState } from 'vuex'
export default {
  name: 'post',
  props: ['answer', 'questionId'],
  data () {
    return {
      isComponentModalActive: false,
      upvoted: false,
      downvoted: false
    }
  },
  created () {
    if (this.answer.upvote.includes(this.loggedUser._id)) {
      this.upvoted = true
    }
    if (this.answer.downvote.includes(this.loggedUser._id)) {
      this.downvoted = true
    }
  },
  computed: {
    ...mapState(['loggedUser', 'answers', 'isLogin'])
  },
  methods: {
    toDetail () {
      let id = this.answer._id
      this.$router.push(`/answer/${id}`)
      this.$store.commit('STOREDETAIL', id)
    },
    deleteThis (id) {
      this.$dialog.confirm({
        message: 'Delete this post ?',
        confirmText: 'Delete Post',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.$store.dispatch('deleteAnswer', id)
            .then(({ data }) => {
              this.$toast.open({ message: 'Post deleted !', type: 'is-success' })
              return this.$store.dispatch('fetchAnswers', this.questionId)
            })
            .then(({ data }) => {
              this.$store.commit('STOREANSWERS', data)
            })
            .catch(err => {
              this.$toast.open({ message: err.response.data.message, type: 'is-danger' })
            })
        }
      })
    },
    editThis (id) {
      this.$modal.open({
        parent: this,
        component: EditAnswer,
        hasModalCard: true,
        props: {
          answer: this.answer,
          questionId: this.questionId,
          state: 'answer'
        }
      })
    },
    upvote () {
      if (!this.isLogin) {
        this.$toast.open({ message: 'You have to login first !', type: 'is-danger' })
      } else {
        let userId = this.loggedUser._id
        if (!this.upvoted) {
          this.upvoted = true
          this.answer.upvote.push(userId)
          if (this.downvoted) {
            this.downvoted = false
            let index = this.answer.downvote.indexOf(userId)
            this.answer.downvote.splice(index, 1)
          }
        } else {
          this.upvoted = false
          let index = this.answer.upvote.indexOf(userId)
          this.answer.upvote.splice(index, 1)
        }
        this.$store.dispatch('voteUpdateAnswer', this.answer)
          .then(result => {
            this.downvoted = false
            console.log('berhasil upvote')
          })
          .catch(err => {
            this.$toast.open({ message: err.response.data.message, type: 'is-danger' })
          })
      }
    },
    downvote () {
      if (!this.isLogin) {
        this.$toast.open({ message: 'You have to login first !', type: 'is-danger' })
      } else {
        let userId = this.loggedUser._id
        if (!this.downvoted) {
          this.downvoted = true
          this.answer.downvote.push(userId)
          if (this.upvoted) {
            this.upvoted = false
            let index = this.answer.upvote.indexOf(userId)
            this.answer.upvote.splice(index, 1)
          }
        } else {
          this.downvoted = false
          let index = this.answer.downvote.indexOf(userId)
          this.answer.downvote.splice(index, 1)
        }
        this.$store.dispatch('voteUpdateAnswer', this.answer)
          .then(result => {
            this.upvoted = false
            console.log('berhasil downvote')
          })
          .catch(err => {
            this.$toast.open({ message: err.response.data.message, type: 'is-danger' })
          })
      }
    }
  },
  components: {

  }

}
</script>

<style lang="scss" scoped>
  $primary: #311B92;
  #option-container {
    display: flex;
  }
  .option {
    margin-left: 5px;
    margin-top: 10px;
    font-size: 14px;
    color: $primary;
  }
  .option:hover{
    cursor: pointer;
    color: black;
  }
  #post-card {
    width: 100%;
    border-bottom: 2px solid $primary;
    // height: 120px;
    padding: 10px 20px;
    display: flex;
    margin: 10px auto;
    // align-items: center;
  }

  #arrow-vote {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }

  #answer {
    margin: auto 30px;
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .arrow:hover{
    cursor: pointer;
  }

  .arrow-upvoted {
    color: skyblue;
  }
  .arrow-downvoted {
    color: red;
  }

  #poster {
    font-size: 12px;
    // align-self: flex-end;
    color: $primary;
  }
  #post {
    border: 1px solid $primary;
    border-radius: 8px;
    padding: 15px;
  }
  #post:hover{
    cursor: pointer;
  }
</style>
