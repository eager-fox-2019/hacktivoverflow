<template>
    <div>
    <q-item clickable @click="viewPost">
        <div class="row">
            <div class="col-1">
                <div class="column items-start justify-center">
            
                <q-icon name="expand_less" style="font-size: 20px;" v-bind:style="{color: [upvoted ? '#2979FF' : 'grey']}" @click="upvote(potd._id)" class="q-pt-md"/>
                    <div style="margin-left: 17%;" class="text-subtitle1">{{upvotes}}</div>
                <q-icon name="expand_more" style="font-size: 20px;" v-bind:style="{color: [downvoted ? '#944336' : 'grey']}" @click="downvote(potd._id)" class="q-pb-md"/>
                </div>
            </div>

            <div class="col-11">
            <q-item-section side top class="float-right">
                <q-item-label caption>{{dateDifference}}</q-item-label>
            </q-item-section>

            <q-item-section>
                <q-item-label>{{potd.title}}</q-item-label>
                <q-item-label caption><p class="ellipsis" style="width: 300px; max-height: 50px;" v-html="potd.description"></p></q-item-label>
            </q-item-section>

            </div>
        </div>
    </q-item>
    <q-separator/>


    <q-dialog v-model="dialog">
      <q-layout container class="bg-white" style="max-width: 1500px;width:1200px;">
        <q-header class="bg-black">
          <q-toolbar>
            <q-toolbar-title>
              <div class="row">
              <q-icon @click="upvote(potd._id)" name="expand_less" style="font-size: 40px;" v-bind:style="{color: [upvoted ? '#2979FF' : 'grey']}" class="upvote"/>
              <div class="text-h5">{{upvotes}}</div>
              <q-icon @click="downvote(potd._id)" name="expand_more" style="font-size: 40px;" v-bind:style="{color: [downvoted ? 'red' : 'grey']}" class="downvote"/>
              <p class="text-subtitle1 q-ml-sm q-mt-sm"><q-icon name="comment"/>{{potd.title}}</p>
              </div>

            </q-toolbar-title>
            <q-btn flat v-close-popup round dense icon="close" />
          </q-toolbar>
        </q-header>
          


        <q-page-container>
          <q-page padding>
            <span caption style="color: grey;">Posted by {{potd.author.username}} <span class="q-ml-sm">{{dateDifference}}</span></span>
            <p class="text-h5">{{potd.title}}</p>
            <q-card class="q-mb-md shadow-0">
              <q-card-section v-html="potd.description" />
            </q-card>
             <q-editor v-model="comment" min-height="5rem" />
             <q-expansion-item label="Preview your comment before posting">
             <q-card style="background-color: #f5f5f5; border-radius: 6px;">
              <q-card-section v-html="comment"/>
             </q-card>
             </q-expansion-item>
             <div class="row">
              <q-btn class="col-1 offset-11" color="blue" @click="submitComment(potd._id)">Submit</q-btn>

             </div>
              <q-separator class="q-mt-sm"/>

            <q-list>
              <comment v-for="comment in $store.state.main.comments" :key="comment._id" :comment="comment"></comment>
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
    name: "PotdCard",
    props: ["potd"],
    components:{
        comment
    },
    created () {
        this.upvotes = this.potd.upvotes.length - this.potd.downvotes.length
        var found = this.potd.upvotes.indexOf(`${this.$store.state.main.userId}`)
        if(found !== -1) {
            this.upvoted = true
        }
        var found2 = this.potd.downvotes.indexOf(`${this.$store.state.main.userId}`)
        if(found2 !== -1) {
            this.downvoted = true
        }
    },
    data () {
        return {
            upvoted: false,
            downvoted: false,
            upvotes: 0,
            dialog: false,
            comment: "",
            baseUrl: this.$store.state.main.baseUrl
        }
    },
    methods: {
        upvote: function (potdId) {
             if(this.upvoted) {
                this.upvotes --
                this.upvoted = false
                var found = this.potd.upvotes.indexOf(this.$store.state.main.userId)
                if(found !== -1) {
                    console.log(sessionStorage.getItem("jwt"))
                    this.potd.upvotes.splice(found, 1)
                    this.$axios.request({
                        method: "PUT",
                        url: `${this.baseUrl}/posts/unvote`,
                        headers: {
                            token: sessionStorage.getItem("jwt")
                        },
                        data: {
                            postId: potdId,
                            upvotes: this.potd.upvotes,
                            downvotes: this.potd.downvotes
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
                        postId: potdId,
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
        downvote: function (potdId) {
            if(this.downvoted) {
                this.upvotes ++
                this.downvoted = false
                var found = this.potd.downvotes.indexOf(this.$store.state.main.userId)
                if(found !== -1) {
                    console.log(sessionStorage.getItem("jwt"))
                    this.potd.downvotes.splice(found, 1)
                    this.$axios.request({
                        method: "PUT",
                        url: `${this.baseUrl}/posts/unvote`,
                        headers: {
                            token: sessionStorage.getItem("jwt")
                        },
                        data: {
                            postId: potdId,
                            upvotes: this.potd.upvotes,
                            downvotes: this.potd.downvotes
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
                        postId: potdId,
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
        }
    },
    computed: {
    ...mapGetters(['GET_LOGIN_STATUS']),
        dateDifference: function () {
            var now = new Date()
            var date = new Date(this.potd.createdAt)

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
        dialog: function () {
            this.$store.dispatch("GET_COMMENTS", this.potd._id)
        }
    }
}
</script>

<style>
.upvote, .downvote{
  cursor: pointer;
}

</style>