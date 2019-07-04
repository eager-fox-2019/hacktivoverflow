<template>
<div class="row q-mt-md">
    <div class="col-6 offset-3">
        <q-card style="background-color: white;">
            <q-form class="q-pa-md">
                <q-input 
                v-model="title"
                outlined
                label="Post Title"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Your title cannot be empty']"
                >

                </q-input>

                <q-editor v-model="description" min-height="5rem" />
                <q-expansion-item label="Preview your comment before posting">
                    <q-card style="background-color: #f5f5f5; border-radius: 6px;">
                        <q-card-section v-html="description"/>
                    </q-card>
                </q-expansion-item>
            </q-form>


            <q-card-actions class="row justify-end">
                <q-btn @click="submitPost" label="Submit" type="submit" color="primary"  class="pull-right" style=""/>
            </q-card-actions>
            
        </q-card>
    </div>
</div>
</template>

<script>
export default {
name: "addPost",
data () {
    return {
        title: "",
        description: "",
        baseUrl: this.$store.state.main.baseUrl
    }
},
methods: {
    onSubmit () {
      if (!this.title || !this.description) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'error',
          message: 'Please fill in all the required fields before submiting',
          position: 'top'
        })
      }
      else {
        this.$q.notify({
          color: 'green-6',
          textColor: 'white',
          icon: 'done',
          message: 'Submitted'
        })
      }
  },
  submitPost: function () {
    this.$axios.request({
      method: "POST",
      url: `${this.baseUrl}/posts/add`,
      headers: {
        token: sessionStorage.getItem("jwt")
      },
      data: {
        userId: this.$store.state.main.userId,
        title: this.title,
        description: this.description
      }
    })
    .then(created =>{
      this.$q.notify({
        color: 'green-6',
        textColor: 'white',
        icon: 'done',
        message: `Post ${created.data.title} created.`,
        position: 'top'
      })
      this.$router.push("/")
      this.$store.dispatch("GET_POSTS")
    })
    .catch(err =>{
      this.$q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'error',
        message: err.response.data,
        position: 'top'
     })
    })
  }
}
}
</script>

<style>

</style>
