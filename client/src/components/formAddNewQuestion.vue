<template>
  <v-container>
    <v-layout justify-center>
      <v-flex xs7>
        <template>
          <v-form v-model="valid">
            <v-container>
              <v-layout>
                <v-flex xs12>
                  <v-text-field color="orange" v-model="title" :rules="nameRules" :counter="50" label="Question Title" required></v-text-field>
                    <v-select v-model="category" :items="category"  label="Category" required ></v-select>
                       <v-textarea v-model="question" name="input-7-1" label="Your Question"></v-textarea>
                       <v-btn @click="postQ" block color="#FB7E51">Submit Question</v-btn>
                </v-flex>
             
              </v-layout>
            </v-container>
          </v-form>
        </template>
      </v-flex>
    </v-layout>
  </v-container>
</template>
            


<script>
export default {
  data: () => ({
    valid: false,
    question : "",
    title : "",
    firstname: "",
    category: ["JavaScript","C++","Python","Pascal","Golang","CSS","Vuetify","BootSrap","React","Jquery"],
    lastname: "",
    nameRules: [
      v => !!v || "Title is required",
      v => v.length <= 50 || "Name must be less than 50 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ]
  }),
  methods : {
    postQ(){
      this.$store.dispatch('addNewPost',{
          title : this.title,
          content :this.question, 
          category :this.category
        })
        .then((data)=>{
            this.$router.push('post')
        })
        .catch((data)=>{
            console.log(data);
            
        })
    }
  }
};
</script>