<template>
<div id="fullscreen">


    <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-2">
              <v-toolbar dark color="#FB7E51" height="45">
                <v-toolbar-title >Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field v-model="username" prepend-icon="person" name="username" label="Username" type="text"></v-text-field>
                  <v-text-field v-model="password" id="password" prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="login" color="#FB7E51">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      </div>
</template>

<script>
export default {
  data(){
    return {

      username : "",
      password: "",

    }
  },
  methods : {
    login(){
      this.$store.dispatch('login',{
          username: this.username,
          password: this.password,
      })
      .then((data)=>{
          this.$router.push('/post')
      })
      .catch((err)=>{
          this.$swal(err.response.data.message)
      })
    }
  }
}
</script>

<style scoped>
  #fullscreen{
    background-color: rgb(224, 220, 221);
    height: 100%;
  
  }
</style>
