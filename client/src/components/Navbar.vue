<template>
  <div>
    <div class="topstripe"></div>
    <nav>
      <div class="sflex">
        <a class="ologo" @click="goToQuestions">HacktivOverflow</a>
        <router-link to="/ask" v-if="islogin">
          <button class="btn btn-primary btnll" type="button">Ask a Question</button>
        </router-link>
      </div>
      <div class="sflex" v-if="islogin">
        <button class="btn btn-primary yy btnl" type="button" @click="goToQuestions">Browse Questions</button>
        <router-link to="/">
          <button class="btn btn-dark btnl" type="button" @click="logout">Logout</button>
        </router-link>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'navbar',
  props: ['islogin'],
  methods: {
    goToQuestions() {
      if(this.islogin) {
        this.$router.push('/questions');
        this.FETCHQUESTIONS;
      }
      return
    },
    logout() {
      this.$store.commit('USERLOGOUT');
      localStorage.clear();
    },
    ...mapActions(['FETCHQUESTIONS'])
  }
}
</script>

<style scoped>
.topstripe {
  width: 100%;
  height: 0.2rem;
  background-color: #ff8d23;
  z-index: 5;
}
nav {
  display: flex;
  justify-content: space-between;
  padding: 0.4rem 1rem 0.5rem 1rem;
  border-bottom: 1px solid #bbb;
  box-shadow: 0 0rem 0.3rem #999;
  font-size: 0.9rem;
  z-index: 1;
}
.sflex {
  display: flex;
  align-items: center;
}
.ologo {
  cursor: pointer;
  color: black;
  font-size: 1.25rem;
}
.btn {
  font-size: 0.9rem;
  padding: 0.3rem 0.6rem;
}
.btnll {
  margin-left: 1.1rem;
}
.btnl {
  margin-left: 0.8rem;
}
.btn-primary {
  background-color: #2b7bb1;
}
.yy {
  background-color: #cc9a12;
  border-color: #cc9a12;
}
@media only screen and (max-width: 580px) {
  .ologo {
    display: none;
  }
  .btnll, .btnl {
    font-size: 0.8rem;
    padding: 0.1rem 0.3rem;
  }
  .btnll {
    margin-left: 0;
  }
  nav {
    padding: 0.4rem 0.6rem 0.4rem 0.6rem;
  }
}
</style>

