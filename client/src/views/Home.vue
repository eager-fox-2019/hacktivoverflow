<template>
  <div class="home columns">
    <div class="column is-1 sidebar"></div>
    <div class="column is-10" id="post-container">
      <div id="topbar">
        <div id="search">
          <b-input placeholder="Search..."
            type="search"
            v-model="searchInput"
            icon="magnify" rounded>
          </b-input>
        </div>
        <div id="question-options">
          <p :class="[ questionState === 'all' ? 'option-button-active' : 'option-button']" @click="openAllQuestions">All Questions</p>
          <p :class="[ questionState === 'my' ? 'option-button-active' : 'option-button']" style="margin-left: 20px;" @click="openMyQuestions">My Questions</p>
        </div>
      </div>
      <div id="post-container">
        <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="true"></b-loading>
        <Post v-for="question in filteredQuestions" 
        :key="question._id" 
        :title="question.title" 
        :user="question.user"
        :createdAt="question.createdAt"
        :state="questionState"
        />
      </div>
    </div>
    <div class="column is-1 sidebar"></div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Post from '@/components/Post.vue'
export default {
  name: 'home',
  data() {
    return {
      isLoading: true,
      searchInput: '',
      questionState: 'all'
    }
  },
  components: {
    Post
  },
  created() {
    this.$store.dispatch('fetchQuestions')
    .then(({data}) => {
      this.$store.commit('STOREQUESTIONS', data)
      this.isLoading = false
    })
  },
  computed: {
    filteredQuestions() {
      return this.questions.filter(question => {
        return question.title.toLowerCase().includes(this.searchInput.toLowerCase())
      })
    },
    ...mapState(['questions', 'isLogin'])
  },
  methods : {
    openMyQuestions () {
      if(!this.isLogin) {
        this.$toast.open({ message: 'You have to login first !', type: 'is-danger'})
      } else {
        this.$store.commit('STOREMYQUESTIONS')
        this.questionState = 'my'
      }
    },
    openAllQuestions () {
      this.isLoading = true
      this.$store.dispatch('fetchQuestions')
      .then(({data}) => {
        this.$store.commit('STOREQUESTIONS', data)
        this.isLoading = false
        this.questionState = 'all'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  $primary: #311B92;
  #question-options {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
  .option-button {
    transition-duration: 0.3s;
    border: 1px solid $primary;
    border-radius: 10px;
    padding: 6px 15px;
    font-size: 16px;
    
  }
  .option-button:hover{
    transition-duration: 0.3s;
    cursor: pointer;		
    background-color: #311B92;
    color: white;
  }
  .option-button-active {
    transition-duration: 0.3s;
    border: 1px solid $primary;
    border-radius: 10px;
    padding: 6px 15px;
    font-size: 16px;
    background-color: #311B92;
    color: white;
  }
  #search {
    width: 50%;
    margin: 0 auto;
  }
  .home {
    height: 100%;
    padding: 12px;
  }
  .sidebar {
    height: 100%;
    background-color: #FAFAFB;
    border-right: 1px solid rgba(0, 0, 0, 0.404);
    border-left: 1px solid rgba(0, 0, 0, 0.404);
    z-index: -99999;
  }
  #post-container {
    height: 100%;
    overflow-y: auto;
  }
  #post-container::-webkit-scrollbar {
    width: 10px;
  }

  #post-container::-webkit-scrollbar-track {
    background: #f1f1f1
  }

  #post-container::-webkit-scrollbar-thumb {
    background: $primary  ;
  }
</style>
