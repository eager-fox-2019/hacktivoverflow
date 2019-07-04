<template>
    <div class="card col-12" style="max-height: 148px;"> 
        <div class="card-body col-12 row">
            <div class="col-2" style="background-color:lightgray; max-height: 105px;">
                <a class="nav-link pointer" style="color: black; margin-top:5%; margin-left: 30%;" v-show="$store.state.isLogin" @click="upvote(data._id)"><i class="fas fa-chevron-up"></i></a>
                <a class="nav-link pointer" style="color: black; margin-top:5%; margin-left: 30%;" v-show="!$store.state.isLogin" data-toggle="modal" data-target="#signinModal"><i class="fas fa-chevron-up"></i></a>
                <h5 class="nav-link" style="color: black; margin-top:-10%; margin-bottom:-10%; margin-left: 29%;">{{ data.upvotes.length - data.downvotes.length }}</h5>
                <a class="nav-link pointer" style="color: black; margin-left: 30%;" v-show="$store.state.isLogin" @click="downvote(data._id, status)"><i class="fas fa-chevron-down"></i></a>
                <a class="nav-link pointer" style="color: black; margin-left: 30%;" v-show="!$store.state.isLogin" data-toggle="modal" data-target="#signinModal"><i class="fas fa-chevron-down"></i></a>
            </div>
            <div class="col-9">                
                <p class="card-text" style="color: gray; font-size: 12px; float:right;" > {{new Date(data.createdAt) | moment('from', 'now')}} </p>
                <h4 class="card-title">{{data.title}}</h4>
                <p class="card-text text-truncate">{{data.desc}}</p>
                <a class="card-link pointer" style="color: blue;" v-show="status" @click="gotoDetail(data._id)">Detail</a>
            </div>
            <div class="col-1" style="background-color: lightgray" v-if="data.userId == $store.state.userId && $store.state.isLogin == true">
                <a class="nav-link pointer" style="color: black; margin-left:-15%;" @click="gotoEdit(data)" data-toggle="modal" :data-target="'#editModal'+data._id"><i class="fas fa-edit fa-2x"></i></a>
                <a class="nav-link pointer" style="color: black; margin-left:-15%;"  v-show="status" @click="remove(data._id)"><i class="fas fa-trash fa-2x"></i></a>
            </div>
            <!-- EDIT MODALS -->
            <div class="modal fade" :id="'editModal'+data._id">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <!-- Modal Header -->
                        <div class="modal-header">
                            <h4 class="modal-title" style="margin-left: 1%">Edit</h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                        <!-- Modal body -->
                        <div class="modal-body" style="text-align: left;">
                            <form @submit.prevent="editPost()">
                                <div class="form-group" style="margin-left:1%; margin-right: 1%;">
                                    <label for="title">Title:</label>
                                    <input type="text" class="form-control" v-model="post.title">
                                </div>
                                <div class="form-group" style="margin-left:1%; margin-right: 1%;">
                                    <label for="desc">Description:</label>
                                    <textarea type="text" class="form-control" v-model="post.desc" />
                                    <button class="btn btn-dark" type="submit" style="margin-top: 3%; width: 100%; background-color: black;">Edit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name: 'card',
    props: {
    data: Object,
    status: Boolean
    },
    data () {
        return {
            post: {
                answer: [],
                desc: '',
                downvotes: [],
                title: '',
                upvotes: [],
            },
        }
    },
    created () {
        this.$store.dispatch('retrievePosts')
    },
    computed: {
      ...mapState(['name','posts','mypost','isLogin','upvotePost','downvotePost'])
    },
    methods : {
        remove (id) {
            this.$store.dispatch('deletePost', id)
        },
        gotoEdit (data) {
            console.log(data)
            this.post = data
            console.log(this.post)
        },
        editPost () {
            this.$store.dispatch('editPost', this.post)
        },
        gotoDetail (id) {
            localStorage.setItem('idPost', id)
            this.$router.push('/detail')
        },
        upvote(id, status) {
            if (status) { 
                this.$store.dispatch('upvotePost', id)
                console.log('upPost')
            } else if (!status) {
                this.$store.dispatch('upvoteComment', id)
                console.log('upCom')
            }
        },
        downvote(id, status) {
            if (status)  {
                this.$store.dispatch('downvotePost', id)
                console.log('dwnPost')
            } else if (!status) {
                this.$store.dispatch('downvoteComment', id)
                console.log('dwnCom')
            }
        }
    }
}
</script>

<style>
    .pointer {cursor: pointer;}
</style>
