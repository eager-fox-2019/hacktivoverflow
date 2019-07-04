<template>
    <div id="fullscreen"  > 
        <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-2">
              <v-toolbar dark color="#FB7E51" height="45" >
                <v-toolbar-title style="color:#393A3A" >Register</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                   <v-text-field  v-model="first_name" prepend-icon="person" name="firstname" label="First Name" type="text"></v-text-field>
                   <v-text-field  v-model="last_name" prepend-icon="person" name="lastname" label="Last Name" type="text"></v-text-field>
                  <v-text-field  v-model="email" id="email" prepend-icon="lock" name="email" label="email" type="text"></v-text-field>
                  <v-text-field v-model="username" prepend-icon="person" name="username" label="Username" type="text"></v-text-field>
                  <v-text-field  v-model="password" id="password" prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="register" color="#FB7E51">Register</v-btn>
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
      first_name : "",
      last_name : "",
      username : "",
      email : "",
      password: "",

    }
  },
  methods : {
    register(){
      this.$store.dispatch('register',{
          first_name:this.first_name,
          last_name: this.last_name,
          username: this.username,
          email: this.email,
          password: this.password,
      })
      .then((data)=>{
          this.$router.push('/post')
      })
      .catch((err)=>{
          console.log(err);
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
