<template>
    <q-item>
        <div class="row">
            <div class="col-1">
                <div class="column items-center justify-center">
            
                <q-icon name="expand_less" style="font-size: 20px;" v-bind:style="{color: [upvoted ? '#2979FF' : 'grey']}" @click="upvote(comment._id)" class="upvote q-pt-md"/>
                    <div class="text-subtitle1">{{upvotes}}</div>
                <q-icon name="expand_more" style="font-size: 20px;" v-bind:style="{color: [downvoted ? 'red' : 'grey']}" @click="downvote(comment._id)" class="downvote q-pb-md"/>
                </div>
            </div>
            <div class="col-11">
                <q-item-label caption>{{comment.author.username}} {{dateDifference}} 
                    <q-icon v-if="comment.author.username === $store.state.main.username" class="edit q-mr-xs q-ml-xs" style="font-size: 18px;" name="edit" @click="edit"/>
                    <q-icon v-if="comment.author.username === $store.state.main.username" class="delete" name="delete" style="font-size: 18px;" @click="del"/>
                </q-item-label>
                <p class="q-ml-sm" style="width: 1000px;" v-html="comment.description"></p>
        <!-- <q-item-section side top style="position: absolute;">asd</q-item-section> -->
                
            </div>
        </div>
    </q-item>
</template>

<script>
import wysiwyg from "./wysiwyg"

export default {
    name: "comment",
    props: ["comment"],
    components: {
        wysiwyg
    },
    created () {
        this.upvotes = this.comment.upvotes.length - this.comment.downvotes.length
        var found = this.comment.upvotes.indexOf(`${this.$store.state.main.userId}`)
        if(found !== -1) {
            this.upvoted = true
        }
        var found2 = this.comment.downvotes.indexOf(`${this.$store.state.main.userId}`)
        if(found2 !== -1) {
            this.downvoted = true
        }
    },
    data () {
        return {
            upvoted: false,
            downvoted: false,
            upvotes: 0,
            baseUrl: this.$store.state.main.baseUrl ,
            description: this.comment.description
        }
    },
    methods: {
        upvote: function (commentId) {
            if(this.upvoted) {
                this.upvotes --
                this.upvoted = false
                var found = this.comment.upvotes.indexOf(this.$store.state.main.userId)
                if(found !== -1) {
                    console.log(sessionStorage.getItem("jwt"))
                    this.comment.upvotes.splice(found, 1)
                    this.$axios.request({
                        method: "PUT",
                        url: `${this.baseUrl}/comments/unvote`,
                        headers: {
                            token: sessionStorage.getItem("jwt")
                        },
                        data: {
                            commentId: commentId,
                            upvotes: this.comment.upvotes,
                            downvotes: this.comment.downvotes
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
                if(this.downvoted) {
                    this.upvotes += 2
                    this.upvoted = true
                    this.downvoted = false
                }else if(!this.upvoted) {
                    this.upvoted = true
                    this.downvoted = false
                    this.upvotes ++
                }
                this.$axios.request({
                    method: "PUT",
                    url: `${this.baseUrl}/comments/upvote`,
                    headers: {
                        token: sessionStorage.getItem("jwt")
                    },
                    data: {
                        commentId: commentId,
                        userId: this.$store.state.main.userId
                    }
                })
                .then(upvoted =>{
                    console.log(upvoted.data)
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

            

        },
        downvote: function (commentId) {
            if(this.downvoted) {
                this.upvotes ++
                this.downvoted = false
                var found = this.comment.downvotes.indexOf(this.$store.state.main.userId)
                if(found !== -1) {
                    console.log(sessionStorage.getItem("jwt"))
                    this.comment.downvotes.splice(found, 1)
                    this.$axios.request({
                        method: "PUT",
                        url: `${this.baseUrl}/comments/unvote`,
                        headers: {
                            token: sessionStorage.getItem("jwt")
                        },
                        data: {
                            commentId: commentId,
                            upvotes: this.comment.upvotes,
                            downvotes: this.comment.downvotes
                        }
                    })
                    .then(unvoted =>{
                        console.log(unvoted.data)
                    })
                    .catch(err =>{
                        console.log(err.response)
                    })
                }
            }else{
                if(this.upvoted) {
                    this.upvotes -=2
                    this.upvoted = false
                    this.downvoted = true
                }
                else if(!this.downvoted){
                    this.upvoted = false
                    this.downvoted = true
                    this.upvotes --
                }
                this.$axios.request({
                    method: "PUT",
                    url: `${this.baseUrl}/comments/downvote`,
                    headers: {
                        token: sessionStorage.getItem("jwt")
                    },
                    data: {
                        commentId: commentId,
                        userId: this.$store.state.main.userId
                    }
                })
                .then(upvoted =>{
                    console.log(upvoted.data)
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
        },
        del: function() {
            this.$axios.request({
                method: "DELETE",
                url: `${this.baseUrl}/comments/delete?commentid=${this.comment._id}&post=${this.comment.post}`,
                headers: {
                    token: sessionStorage.getItem("jwt")
                }
            })
            .then(deleted =>{
                this.$emit("refresh")
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
        edit: function () {
            this.$q.dialog({
                component: wysiwyg,
                text: this.description
            }).onOk(data =>{
                this.$axios.request({
                    method: "PUT",
                    url: `${this.baseUrl}/comments/edit?commentid=${this.comment._id}`,
                    headers: {
                        token: sessionStorage.getItem("jwt")
                    },
                    data: {
                        description: data
                    }
                })
                .then(updated =>{
                    this.comment.description = updated.description
                    this.$emit("refresh")
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
            })
        }
    },
    computed: {
        dateDifference: function () {
            var now = new Date()
            var date = new Date(this.comment.createdAt)

            var diff = now - date
            if(diff < (1000 * 60 * 60)) {
               return `${Math.floor(diff/ (1000 * 60))} mins ago`
            } else if (diff < (1000 * 60 * 60 * 24)) {
                return `${Math.floor(diff/(1000 * 60 * 60))} hours ago`
            } else {
                return `${Math.floor(diff/(1000 * 60 * 60 * 24))} days ago`
            }
        }
    }

}
</script>

<style>
.delete:hover{
    color: red;
    cursor: pointer;
}
.edit:hover{
    color: orange;
    cursor: pointer;
}
</style>
