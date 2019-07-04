<template>
    <div class="container-fluid row">
        <div class="col-9" style="height:710px; max-height: 710px; background-color: lightgray; overflow: auto;">
            <h3 style="margin-left: 2%; margin-top: 2%;">Post:</h3>
            <h5 v-if="posts.length < 1" style="margin-left: 5%; margin-top: 3%; color: gray;"> No post, lets add some... </h5>
            <div class="row" style="margin: 2%;" v-for="(post, index) in posts" :key="index">
                <card :data='post' :status='true'/>
            </div>
        </div>
        <div class="col-3" style="text-align: center;">
            <h2 class="text-truncate" style="margin-top: 5%;">{{name}}</h2>
            <button class="btn btn-secondary" data-toggle="modal" data-target="#addModal" v-show="isLogin">Create Post</button>
            <!-- ADD MODALS -->
            <div class="modal fade" id="addModal">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <!-- Modal Header -->
                        <div class="modal-header">
                            <h4 class="modal-title" style="margin-left: 1%">Add New Post</h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                        <!-- Modal body -->
                        <div class="modal-body" style="text-align: left;">
                            <form @submit.prevent="createPost()">
                                <div class="form-group" style="margin-left:1%; margin-right: 1%;">
                                    <label for="title">Title:</label>
                                    <input type="text" class="form-control" v-model="addPost.title">
                                </div>
                                <div class="form-group" style="margin-left:1%; margin-right: 1%;">
                                    <label for="desc">Description:</label>
                                    <textarea type="text" class="form-control" v-model="addPost.desc" />
                                    <button class="btn btn-dark" type="submit" style="margin-top: 3%; width: 100%; background-color: black;">Add New Post</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <hr>
            <h4 style="text-align:left; margin-left:3%" v-show="isLogin">My Post: </h4>
            <div class="row" style="margin: 3%; max-height: 510px; overflow: scroll;" v-show="isLogin">
                <h5 v-if="mypost.length < 1" style="margin-top: 5%; color: gray;"> You have no post.</h5>
                <h5 v-if="mypost.length < 1" style="margin-top: 5%; color: gray;"> Feel free to ask... </h5>
                <div class="col-12 row" style="margin: 2%; text-align: left;" v-for="(post, index) in mypost" :key="index">
                    <mycard :data='post'/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import card from '@/components/card'
import mycard from '@/components/mycard'
import {mapState} from 'vuex'
export default {
  name: 'home',
  data () {
    return {
        addPost: {
            title: '',
            desc: ''
        },
    }
  },
  components: {
    card,
    mycard
  },
  methods: {
    createPost () {
        let obj = {
            title: this.addPost.title,
            desc: this.addPost.desc,
            upvotes: [],
            answer: [],
            downvotes: []
        }
        this.$store.dispatch('newPost',obj)
        this.addPost.title = ''
        this.addPost.desc = ''
    },    
  },
  computed: {
      ...mapState(['name','posts','mypost','isLogin'])
  },
  created () {
    this.$store.dispatch('retrievePosts')
    this.$store.dispatch('retrieveMyPosts')
  }
}
</script>

<style>
</style>
