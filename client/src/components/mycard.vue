<template>
    <div class="card col-12" style="padding: 0px;">
        <div class="card-body col-12 row">
            <div class="col-12" style="padding: 0px;">
                <p class="card-text" style="color: gray; font-size: 12px; float:right;">{{new Date(data.createdAt) | moment('from', 'now')}}</p>
                <h4 class="card-title text-truncate">{{data.title}}</h4>
                <p class="card-text text-truncate">{{data.desc}}</p>
                <a style="float: left;">Comments : {{data.answer.length}}</a>
                <a class="card-link pointer" style="color: black; float:right; margin-left: 5%;" @click="remove(data._id)"><i class="fas fa-trash fa-1x"></i></a>
                <a class="card-link pointer" style="color: black; float:right;" data-toggle="modal" :data-target="'#editMyPostModal'+data._id" @click="gotoEdit(data)"><i class="fas fa-edit fa-1x"></i></a>
                <a class="card-link pointer" style="color: black; float:right;" @click="gotoDetail(data._id)"><i class="fas fa-info-circle fa-1x"></i></a>
            </div>
            <!-- EDIT MODALS -->
            <div class="modal fade" :id="'editMyPostModal'+data._id">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <!-- Modal Header -->
                        <div class="modal-header">
                            <h4 class="modal-title" style="margin-left: 1%">Edit Post</h4>
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
                                    <button class="btn btn-dark" type="submit" style="margin-top: 3%; width: 100%; background-color: black;">Edit Post</button>
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
export default {
    name: 'mycard',
    props: {
        data: Object
    },
    data () {
        return {
            post: {
                answer: [],
                desc: '',
                downvotes: [],
                title: '',
                upvotes: [],
            }
        }
    },
    methods: {
        remove (id) {
            this.$store.dispatch('deletePost', id)
        },
        gotoEdit (data) {
            this.post = data
        },
        editPost () {
            this.$store.dispatch('editPost', this.post)
        },
        gotoDetail (id) {
            localStorage.setItem('idPost', id)
            this.$router.push(`/detail`)
        }
    },
    created () {
        this.$store.dispatch('retrieveMyPosts')
    }
}
</script>

<style>
    .pointer {cursor: pointer;}
</style>
