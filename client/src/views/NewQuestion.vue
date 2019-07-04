<template>
  <div v-if="islogin">
    <h2 class="header">Ask a Question</h2>
    <div id="newQuestion">
      <form @submit.prevent="sendQuestion">
        <div class="form-group">
          <label for="askTitle">Title: </label>
          <input type="text" class="form-control" placeholder="Enter Title" v-model="title">
        </div>
        <div class="form-group">
          <label for="askQuestion">Description: </label>
          <textarea
            class="form-control" rows="6" placeholder="Describe your question in detail" v-model="description">
          </textarea>
        </div>
        <div class="form-group">
          <label for="askCategory">Tags: </label>
          <input type="text" class="form-control" placeholder="Enter comma-seperated tags" v-model="tags">
        </div>
        <button type="submit" class="btn btn-primary btnb">Submit</button>
        <p class="erroralert" v-show="error">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'new-question',
  props: ['islogin'],
  data() {
    return {
      title: '',
      description: '',
      tags: '',
      error: '',
    }
  },
  created() {
  },
  methods: {
    sendQuestion() {
      axios({
        method: 'POST',
        url: `${this.url}/question`,
        data: {
          title: this.title,
          tags: this.tagArray,
          description: this.description
        },
        headers: { token: localStorage.getItem('token') }
      })
        .then(({ data }) => {
          this.clearAll()
          this.$router.push('/questions')
        })
        .catch(err => {
          console.log(err)
          this.error = err.response.data.message
          setTimeout(() => {
            this.error = ''
          }, 2000);
        })
    },
    clearAll() {
      this.title = '';
      this.description = '';
      this.tags = '';
    }
  },
  computed: {
    url() {
      return this.$store.state.url
    },
    tagArray() {
      let str = this.tags.toLowerCase().trim()
      let str2 = ''
      // ignore (spaces after commas) and (spaces after spaces)
      for(let i = 0; i < str.length; i ++) {
        if(!(str[i] === ' ' && (str[i-1] === ',' || str[i-1] === ' '))) {
          str2 += str[i]
        }
      }
      // unique values only
      return str2.split(',').filter((val, index, self) => {
        if(val === '') {
          return false;
        }
        return self.indexOf(val) === index;
      });
    },
  },
}
</script>

<style>
.header {
  text-align: center;
  margin-top: 2rem;
}
#newQuestion {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}
form {
  width: 36rem;
}
@media only screen and (max-width: 600px) {
  form {
    width: 95%;
  }
}
.btnb {
  background-color: #2b7bb1;
  border-color: #2b7bb1;
}
</style>
