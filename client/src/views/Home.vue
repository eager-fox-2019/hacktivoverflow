<template>
  <div class="hello mt-2">
    <h1>Welcome to HacktivOverflow</h1>
    <img src="https://cdn.dribbble.com/users/3281732/screenshots/6552930/ef066617-ce4e-45c9-ae22-1af21711119c.jpeg" width="550" height="450">
    <p>
      HacktivOverflow is a question and answer site for professional and enthusiast programmers. It is a privately held website.
    </p>
    <h3 v-if="!isLoggedIn">Lets register</h3>
    <ul>
      <li><router-link to="/login" v-if="!isLoggedIn">login</router-link></li>
      <li><router-link to="/register" v-if="!isLoggedIn">register</router-link></li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed:{
    ...mapState(['isLoggedIn'])
  }
};
</script>

<style scoped>
.hello{
  background-color: white;
  text-align: center;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #007BFF;
}
</style>
