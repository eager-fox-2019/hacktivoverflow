<template>
    <div id="question" class="card">
    <div class="card-content">
        <div class="media">
        <div class="media-left has-text-centered" style="justify-content:center">
            <button v-if="!loadUpVote" @click="upvote(data._id)"><i class="fas fa-chevron-up"></i></button>
            
            <br>
                {{data.upvote.length - data.downvote.length}}
            <br>
            <button v-if="!loadDownVote" @click="downvote(data._id)"><i class="fas fa-chevron-down"></i></button>
            
        </div>
        <div class="media-content">
            <div>
                
                <p class="is-size-6 has-text-info">
                    <a @click="details"><b>{{data.title}}</b></a>
                    <small style="float:right; color:grey;"><span>{{ new Date(data.createdAt) | moment("from", "now") }}</span></small><br>
                    <button v-if="data.userId._id == user._id" style="float:right;" class="button" @click="isActive2 = !isActive2"><i  class="fas fa-edit has-text-success" style=" cursor:pointer"></i></button> 
                </p>
                
            </div>
            <p class="is-size-7 green">@{{data.userId.username}}</p>
            <small class="subtitle is-6">{{data.description}}</small>
            <br>
            <small class="subtitle is-7">answers : {{data.answers.length}}</small>
            <div v-if="data.userId._id == user._id" class="has-text-right">
                <button class="button" @click="isActive = !isActive"><i class="fas fa-trash has-text-danger" style="cursor:pointer"></i></button>
                
                <b-notification
                    :active.sync="isActive"
                    type="is-warning"
                    has-icon
                    aria-close-label="Close notification"
                    role="alert">

                    <button @click="deleting" class="button is-danger" style="margin:2px">DELETE</button>
                    
                    <button @click="isActive = !isActive" class="button is-success" style="margin:2px">CANCEL</button>
                </b-notification>
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
                    <label for="title"><b>Question : </b></label>
                    <br>
                    <br>
                    <textarea name="description" id="" cols="30" rows="3" v-model="form.description"></textarea> 
                    <button @click="edit" class="button is-success" style="margin:2px; float : right;">SUBMIT</button>             
                </b-notification>

            </div>
        </div>
        </div>
        

    </div>
    </div>
</template>

<script>
export default {
    props : ['data'],
    data(){
        return {
            user : {
                _id : localStorage.getItem('userId')
            },
            isActive : false,
            isActive2 : false,
            form : {
                title : this.data.title,
                description : this.data.description
            },
            loadUpVote : false,
            loadDownVote : false
        }
    },
    methods : {
        upvote(input){
            this.loadUpVote = true
            this.$store.dispatch('upvote', ['questions',input])
                .then(res => {
                    this.loadUpVote = false
                    this.$router.push('/')
                })
                .catch(err => {
                    console.log(err);
                    this.$router.push('/')
                })
        },
        downvote(input){
            this.loadDownVote = true
            this.$store.dispatch('downvote', ['questions',input])
                .then(res => {
                    this.loadDownVote = false
                    this.$router.push('/')
                })
                .catch(err => {
                    console.log(err);
                    this.$router.push('/')
                })
        },
        deleting(){
            this.$store.dispatch('delete', this.data._id)
                .then(data => {
                    this.$router.push('/')
                })
                .catch(err => {
                    console.log(err)
                    // this.$router.push('/')
                })
        },
        edit(){
            this.$store.dispatch('edit', [this.data._id, this.form])
                .then(data => {
                    this.isActive2 = false
                })
                .catch(err => {
                    console.log(err);
                })
        },
        details(){
            this.$router.push(`/${this.data._id}`)
        }
    }
}
</script>

<style>
.green{
    color: darkgreen;
}
#question{
    background-color: rgba(255, 255, 255, 0.9);
    border: none;
    border-radius: 20px;
}
figure {
    border : 1px black solid;
    align-content: center;
}
</style>
