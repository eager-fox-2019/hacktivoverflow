<template>
    <div class="card">  
    <div class="card-content">
        <div class="media">
        <div class="media-left has-text-centered" style="justify-content-centered">
            <button @click="upvote(data._id)"><i class="fas fa-chevron-up"></i></button>
            <br>
                {{data.upvote.length - data.downvote.length}}
            <br>
            <button @click="downvote(data._id)"><i class="fas fa-chevron-down"></i></button>
        </div>
        <div class="media-content">
             <p class="is-size-6 has-text-info">
                <a><b>{{data.title}}</b></a>
                <small style="float:right; color:grey;"><span>{{ new Date(data.createdAt) | moment("from", "now") }}</span></small><br>
                <button v-if="data.userId._id == user._id" style="float:right;" class="button" @click="isActive2 = !isActive2"><i  class="fas fa-edit has-text-success" style=" cursor:pointer"></i></button>    
            </p>
            <p class="is-size-7 green">@{{data.userId.username}}</p>
            <small class="subtitle is-6">{{data.description}}</small>
        </div>
        </div>

        <div class="content">
            <b-notification
                :active.sync="isActive2"
                type="is-info"
                has-icon
                aria-close-label="Close notification"
                role="alert">
                <label for="title"><b>Title : </b></label>
                <input type="text" v-model="form.title">
                <br>
                <br>
                <label for="title"><b>Answers : </b></label>
                <br>
                <br>
                <textarea name="description" id="" cols="30" rows="3" v-model="form.description"></textarea> 
                <button @click="edit" class="button is-success" style="margin:2px; float : right;">SUBMIT</button>             
            </b-notification>
        </div>
    </div>
    </div>
</template>

<script>

import {mapState} from 'vuex'

export default {
    data(){
        return {
            user : {
                _id : localStorage.getItem('userId')
            },
            isActive2 : false,
            form : {
                title : this.data.title,
                description : this.data.description
            }
        }
    },
    props : ['data'],
    methods : {
        upvote(input){
            
            this.$store.dispatch('upvote', ['answers', input, this.$route.params.id])
                .then(res => {
                    
                    // this.$router.push('/')
                })
                .catch(err => {
                    console.log(err);
                    // this.$router.push('/')
                })
        },
        downvote(input){
            
            this.$store.dispatch('downvote', ['answers', input, this.$route.params.id])
                .then(res => {
            
                    // this.$router.push('/')
                })
                .catch(err => {
                    console.log(err);
                    // this.$router.push('/')
                })
        },
        edit(){
            this.$store.dispatch('editAns', [this.data._id, this.form, this.$route.params.id])
                .then(data => {
                    this.isActive2 = false
                })
                .catch(err => {
                    console.log(err);
                })
        },
    }
}
</script>

<style>

</style>
