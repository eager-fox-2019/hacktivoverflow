<template>
    <div>
        <div class="columns">
            <div v-if="whoLogin == oneQuestion.userId.username" class="column">
                <button @click.prevent="anserQ" type="submit" class="button is-primary"> Add Answer </button>
                <div class="buttons">
                    <b-button @click.prevent="goDelete(oneQuestion._id, oneQuestion.userId._id)" type="is-danger">Delet</b-button>
                    <b-button @click.prevent="showFormEdit" type="is-warning">Edit</b-button> 
                </div>
                <div v-if="doingEdit == 'go'">
                    <section>
                        <form>
                            <b-field label="Title">
                                <b-input v-model="title"></b-input>
                            </b-field>
                            <b-field label="Description">
                                <b-input v-model="description" maxlength="200" type="textarea"></b-input>
                            </b-field>
                            <button @click.prevent="goEdit(oneQuestion._id, oneQuestion.userId._id)" type="submit" class="button is-primary"> Submit </button>
                        </form>
                    </section> 
                </div>
            </div>
            <div v-if="whoLogin !== oneQuestion.userId.username" class="column">
                <button @click.prevent="anserQ" type="submit" class="button is-primary"> Add Answer </button>
                
            </div>
            <div class="column">
                <h1>QUESTION</h1>
                <b-message>
                    <b style="font-size : 20px">{{oneQuestion.title}}</b>
                    <br>
                    <small>author : {{oneQuestion.userId.username}}</small>
                    <br><br> "{{oneQuestion.description}}"
                </b-message>
            </div>
            <div class="column">
                <h1>ANSWERS</h1>
                <b-message v-for="each in oneQuestion.answer" :key="each">
                    <small>answered by : {{each.userId.username}}</small>
                    <h2><b>{{each.title}}</b></h2>
                   <p>{{each.description}}</p>
                </b-message>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import Swal from 'sweetalert2'
export default {
    data(){
        return{
            doingEdit : '',
            title : '',
            description : '',
            whoLogin : localStorage.getItem("username")
        }
    },
    computed : {
        ...mapState(['oneQuestion', 'getQuestionOne'])
    },
    methods : {
        showFormEdit(){
            this.doingEdit = 'go'
        },
        anserQ(){
            this.$router.push(`/formAns/${this.$route.params.Qid}`)
        },
        goDelete(questId, UserId){
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                if (result.value) {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                    this.$store.dispatch('storeDelete', {Qid : questId , Uid : UserId})
                    this.$store.dispatch('getQuestion')
                    this.$router.push(`/MainPage`)
                }
            })
           
        },
        goEdit(questId, UserId){
            this.$store.dispatch('storeEdit',{Qid : questId, Uid : UserId, title : this.title, description : this.description})
            .then(result => {
                this.$store.dispatch('getQuestionOne', questId)
                this.$router.push(`/detail/${questId}`)
                Swal.fire({
                    position: 'top-end',
                type: 'success',
                title: 'Your question has been edited',
                showConfirmButton: false,
                timer: 1500
                })
                 this.doingEdit = ''
            })
        }
    }
}
</script>

<style>

</style>
