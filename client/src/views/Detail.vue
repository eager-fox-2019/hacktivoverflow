<template>
    <div class="ans container is-fullhd is-fullheight">
        <div class="columns is-gapless">
            <div class="column">
                <div class="card" style="background-color: rgba(255, 255, 255, 0.9)">
                <div class="card-content">
                    <div class="media">
                    <div class="media-left has-text-centered" style="justify-content-centered">
                        <button @click="upvote(dataDetails._id)"><i class="fas fa-chevron-up"></i></button>
            
                        <br>
                            {{(dataDetails.upvote.length) - dataDetails.downvote.length}}
                        <br>
                        <button @click="downvote(dataDetails._id)"><i class="fas fa-chevron-down"></i></button>
                    </div>
                    <div class="media-content" >
                        

                        <p class="is-size-6 has-text-info">
                            <a><b>{{dataDetails.title}}</b></a>
                            <small style="float:right; color:grey;"><span>{{ new Date(dataDetails.createdAt) | moment("from", "now") }}</span></small><br>
                        </p>
                        
                        <p class="is-size-7 green">@{{dataDetails.userId.username}}</p>
                        <small class="subtitle is-6">{{dataDetails.description}}</small>
                        <br>
                        <small class="subtitle is-7">answers : {{dataDetails.answers.length}}</small>
                    </div>
                    </div>
                    <div class="content" >
                        <div v-for="(data, i) in dataDetails.answers" :key="i">
                            <aCard :data="data" style="background-color: rgba(40, 160, 219, 0.2)"/>
                        </div>
                    </div>
                        <newAnsCard @submitNewAns="submit"/>
                </div>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>

import {mapState} from 'vuex'
import aCard from '../components/answerCard'
import newAnsCard from '../components/newAnswerForm'

export default {
    computed : {
        ...mapState(['problem', 'dataDetails']),
        
    },
    created(){
        this.$store.dispatch('getDetail', this.$route.params.id)
            .then(res => {
                console.log(this.dataDetails)
                
            })
            .catch(err => {
                console.log(err)
                
            })
    },
    components : {
        aCard,
        newAnsCard
    },
    methods : {
        submit(value){
            this.$store.dispatch('createAnswers', [this.dataDetails._id, value])
                .then(success => {
                    console.log(success)
                    return this.$store.dispatch('getDetail', this.dataDetails._id)
                })
                .then(data => {
                    console.log(data)
                    this.$router.push(`/${this.dataDetails._id}`)
                })
                .catch(err => {
                    console.log(err)
                })
        },
         upvote(input){
            
            this.$store.dispatch('upvote', ['questions',input])
                .then(res => {
                    
                    // this.$router.push('/')
                })
                .catch(err => {
                    console.log(err);
                    // this.$router.push('/')
                })
        },
        downvote(input){
            
            this.$store.dispatch('downvote', ['questions',input])
                .then(res => {
            
                    // this.$router.push('/')
                })
                .catch(err => {
                    console.log(err);
                    // this.$router.push('/')
                })
        },
    }
}
</script>



<style scoped>
/* a {
    background-color: rgba(40, 160, 219, 0.5)
} */
</style>

