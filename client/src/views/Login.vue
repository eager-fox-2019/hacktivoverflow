<template>
  <div id="form-login" class="animated fadeIn columns">
    <div id="sidebar" class="column is-5">
    </div>
    <form @submit.prevent="userLogin" class="column">
      <div v-if="isRegister" id="successRegister">{{successRegisterMsg}}</div>
      <div class="field">
        <b-field label="Email">
            <b-input placeholder="Email" rounded class="text-input" v-model="inputLogin.email"></b-input>
        </b-field>
      </div>
      <div class="field">
        <b-field label="Password">
            <b-input placeholder="Password" type="password" rounded password-reveal class="text-input" v-model="inputLogin.password"></b-input>
        </b-field>
      </div>
      <p id="note">Don't have an account ? <router-link to="/register">Register</router-link></p>
      <button type="submit" id="button-login">Login</button>
    </form>
  </div>
</template>
<script>
export default {
  name: 'login',
  data () {
    return {
      inputLogin: {
        email: '',
        password: ''
      },
      isRegister: false,
      successRegisterMsg: 'Successfully created an account !'
    }
  },
  methods: {
    userLogin () {
    }
  }
}
</script>

<style scoped>
  #successRegister {
    color: #311B92;
    font-size: 24px;
  }
  #sidebar {
    border-right: 2px solid rgba(49, 27, 146, 0.671);
    margin-right: 20px;
  }
  #note {
    font-size: 14px;
  }
  h1 {
    font-size: 30px;
    color: #37474F;
  }
  #form-login {
    /* background-color: #FAFAFB; */
    /* display: flex;
    align-items: center;
    justify-content: center; */
    width: 500px;
    /* height: 400px; */
    padding: 25px 8px;
    margin: 90px 0;
    /* border: 1px solid #37474F; */
  }
  .text-input {
    color: green;
    width: 400px;
    /* width: 30%; */
  }
  .field {
    margin-top: 30px;
  }

  #button-login {
    background-color: #311B92;
    border-radius: 20px;
    width: 120px;
    color: white;
    height: 40px;
    margin: auto;
    text-align: center;
    margin-top: 30px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }

  #button-login:hover{
    cursor: pointer;
  }

  a {
    color: #311B92;
    text-decoration: none;
  }
</style>
