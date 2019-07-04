<template>
    <div>
        <div class="columns">
            <div class="column">
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
export default {
    data(){
        return{
            doingEdit : '',
            title : '',
            description : ''
        }
    },
    computed : {
        ...mapState(['oneQuestion'])
    },
    methods : {
        showFormEdit(){
            this.doingEdit = 'go'
        },
        anserQ(){
            this.$router.push(`/formAns/${this.$route.params.Qid}`)
        },
        goDelete(questId, UserId){
            this.$store.dispatch('storeEdit', {Qid : questId , Uid : UserId})
        },
        goEdit(questId, UserId){
            this.$store.dispatch('storeDelete',{Qid : questId, Uid : UserId, title : this.title, description : this.description})
        }
    }
}
</script>

<style>

</style>
