<template>
  <div>
    <q-card style="width: 100%;" class="q-mb-sm">
          <div class="row" style="max-height: 300px; min-height: 180px;">
          <q-card-section class="col-1 bg-grey-3">
            <div class="column items-center">
              
              <q-icon @click="upvote(post._id)" name="expand_less" style="font-size: 40px;" v-bind:style="{color: [upvoted ? '#2979FF' : 'grey']}" class="upvote q-pt-md"/>
              <div class="text-h5">{{upvotes}}</div>
              <q-icon @click="downvote(post._id)" name="expand_more" style="font-size: 40px;" v-bind:style="{color: [downvoted ? 'red' : 'grey']}" class="downvote q-pb-md"/>
            </div>
          </q-card-section>
   
          <q-card-section class="col-11 q-mt-lg">
            
            <span caption style="color: grey;">{{post.author.username}} <span class="q-ml-sm">{{dateDifference}}</span>
            <q-icon v-if="post.author.username === $store.state.main.username" class="delete q-ml-sm" name="delete" style="font-size: 18px;" @click="del"/>
            </span>
            <div class="text-h6 q-pb-xl">{{post.title}}</div>

            <q-separator />
          <q-card-actions>
            <q-btn flat no-caps @click="viewPost"><q-icon name="comment" color="grey-8" class="q-pr-sm"/>{{post.comments.length}} Comments</q-btn>
          </q-card-actions>
          </q-card-section>

          </div>
              <q-separator/>
        </q-card>






    <q-dialog v-model="dialog">
      <q-layout container class="bg-white" style="max-width: 1500px;width:1200px;">
        <q-header class="bg-black">
          <q-toolbar>
            <q-toolbar-title>
              <div class="row">
              <q-icon @click="upvote(post._id)" name="expand_less" style="font-size: 40px;" v-bind:style="{color: [upvoted ? '#2979FF' : 'grey']}" class="upvote"/>
              <div class="text-h5">{{upvotes}}</div>
              <q-icon @click="downvote(post._id)" name="expand_more" style="font-size: 40px;" v-bind:style="{color: [downvoted ? 'red' : 'grey']}" class="downvote"/>
              <p class="text-subtitle1 q-ml-sm q-mt-sm"><q-icon name="comment"/>{{post.title}}</p>
              </div>

            </q-toolbar-title>
            <q-btn flat v-close-popup round dense icon="close" />
          </q-toolbar>
        </q-header>
          


        <q-page-container>
          <q-page padding>
            <span caption style="color: grey;">Posted by {{post.author.username}} <span class="q-ml-sm">{{dateDifference}}</span> </span>
            <p class="text-h5">{{post.title}}</p>
            <q-card class="q-mb-md shadow-0">
              <q-card-section v-html="post.description" />
            </q-card>
             <q-editor v-model="comment" min-height="5rem" />
             <q-expansion-item label="Preview your comment before posting">
             <q-card style="background-color: #f5f5f5; border-radius: 6px;">
              <q-card-section v-html="comment"/>
             </q-card>
             </q-expansion-item>
             <div class="row">
              <q-btn class="col-1 offset-11" color="blue" @click="submitComment(post._id)">Submit</q-btn>

             </div>
              <q-separator class="q-mt-sm"/>

            <q-list>
              <comment @refresh="refreshPost" v-for="comment in $store.state.main.comments" :key="comment._id" :comment="comment"></comment>
            </q-list>
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>

  </div> 
</template>

<script>
import comment from "./comment"
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
name: "MainCard",
components: {
  comment
},
props: ["post"],
created () {
  this.upvotes = this.post.upvotes.length - this.post.downvotes.length
  var found = this.post.upvotes.indexOf(`${this.$store.state.main.userId}`)
  if(found !== -1) {
    this.upvoted = true
  }
  var found2 = this.post.downvotes.indexOf(`${this.$store.state.main.userId}`)
  if(found2 !== -1) {
    this.downvoted = true
  }
  // console.log(this.$store.getters.GET_UPVOTES("post", this.post._id))
  // .then(comments =>{
  //   this.comments = comments
  // })
  // .catch(err =>{
  //   console.log(err)
  // })
},
data () {
  return {
    upvoted: false,
    downvoted: false,
    dialog: false,
    upvotes: 0,
    comment: "",
    baseUrl: this.$store.state.main.baseUrl,
    comments: []
  }
},
methods: {
  upvote: function (postId) {
  
      if(this.upvoted) {
        this.upvotes --
        this.upvoted = false
        var found = this.post.upvotes.indexOf(this.$store.state.main.userId)
        if(found !== -1) {
            console.log(sessionStorage.getItem("jwt"))
            this.post.upvotes.splice(found, 1)
            this.$axios.request({
                method: "PUT",
                url: `${this.baseUrl}/posts/unvote`,
                headers: {
                    token: sessionStorage.getItem("jwt")
                },
                data: {
                    postId: postId,
                    upvotes: this.post.upvotes,
                    downvotes: this.post.downvotes
                }
            })
            .then(unvoted =>{
                console.log(unvoted.data)
            })
            .catch(err =>{
                console.log(err.response)
            })
        }
    } else {
      if(!this.upvoted) {
        if(this.downvoted) {
          this.upvotes += 2
          this.upvoted = true
          this.downvoted = false
        }else {
          this.upvoted = true
          this.downvoted = false
          this.upvotes ++
        }
        this.$axios.request({
          method: "PUT",
          url: `${this.baseUrl}/posts/upvote`,
          headers: {
            token: sessionStorage.getItem("jwt")
          },
          data: {
            postId: postId,
            userId: this.$store.state.main.userId
          }
        })
        .then(upvoted =>{
          this.$store.dispatch("GET_POSTS")
          // .then(posts =>{
          //   // this.upvotes = this.$store.getters.GET_UPVOTES("post", this.post._id)
          // })
        })
        .catch(err =>{
            this.upvotes --
            this.upvoted = false
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


  },
  downvote: function (postId) {
    if(this.downvoted) {
      this.upvotes ++
      this.downvoted = false
      var found = this.post.downvotes.indexOf(this.$store.state.main.userId)
      if(found !== -1) {
          console.log(sessionStorage.getItem("jwt"))
          this.post.downvotes.splice(found, 1)
          this.$axios.request({
              method: "PUT",
              url: `${this.baseUrl}/posts/unvote`,
              headers: {
                  token: sessionStorage.getItem("jwt")
              },
              data: {
                  postId: postId,
                  upvotes: this.post.upvotes,
                  downvotes: this.post.downvotes
              }
          })
          .then(unvoted =>{
              console.log(unvoted.data)
          })
          .catch(err =>{
              console.log(err.response)
          })
      }
  } else {
    if(!this.downvoted) {
      if(this.upvoted) {
        this.upvotes -=2
        this.upvoted = false
        this.downvoted = true
      }
      else {
        this.upvoted = false
        this.downvoted = true
        this.upvotes --
      }
      this.$axios.request({
        method: "PUT",
        url: `${this.baseUrl}/posts/downvote`,
        headers: {
          token: sessionStorage.getItem("jwt")
        },
        data: {
          postId: postId,
          userId: this.$store.state.main.userId
        }
      })
      .then(downvoted =>{
        this.$store.dispatch("GET_POSTS")
        // this.upvotes = this.$store.getters.GET_UPVOTES("post", this.post._id)
      })
      .catch(err =>{
        this.upvotes ++
        this.downvoted = false
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


  },
  viewPost: function () {
    this.dialog = true
  },
  refreshPost: function () {
      this.$store.dispatch("GET_COMMENTS", this.post._id)
  },
  submitComment: function (id) {
    this.$axios.request({
      method: "POST",
      url: `${this.baseUrl}/comments/add`,
      headers: {
        token: sessionStorage.getItem("jwt")
      },
      data: {
        description: this.comment,
        userId: this.$store.state.main.userId,
        postId: id
      }
    })
    .then(comments =>{
      this.$store.dispatch("GET_COMMENTS", this.post._id)
      this.description = ""
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
  },
  del : function () {
    this.$axios.request({
      method: "DELETE",
      url: `${this.baseUrl}/posts/delete?postid=${this.post._id}`,
      headers: {
        token: sessionStorage.getItem("jwt")
      }
    })
    .then(deleted =>{
      // this.$emit("refresh")
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
},
computed: {
  ...mapGetters(['GET_LOGIN_STATUS']),
  dateDifference: function () {
    var now = new Date()
    var date = new Date(this.post.createdAt)

    var diff = now - date
    if(diff < (1000 * 60 * 60)) {
      return `${Math.floor(diff/ (1000 * 60))} mins ago`
    } else if (diff < (1000 * 60 * 60 * 24)) {
      return `${Math.floor(diff/(1000 * 60 * 60))} hours ago`
    } else {
      return `${Math.floor(diff/(1000 * 60 * 60 * 24))} days ago`
    }
  }

},
watch: {
  GET_LOGIN_STATUS: function () {
    if(this.post.upvotes !== undefined) {
      var found = this.post.upvotes.indexOf(`${this.$store.state.main.userId}`)
      if(found !== -1) {
        this.upvoted = true
      } else {
        this.upvoted = false
      }
      var found2 = this.post.downvotes.indexOf(`${this.$store.state.main.userId}`)
      if(found2 !== -1) {
        this.downvoted = true
      } else {
        this.downvoted = false
      }
    }
  },
  dialog: function () {
      this.$store.dispatch("GET_COMMENTS", this.post._id)
  }
}
}
</script>

<style>
.upvote, .downvote{
  cursor: pointer;
}

</style>
