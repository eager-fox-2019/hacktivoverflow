<template>
    <div>
        <div class="card" v-for="each in allQuestion" :key="each" style="margin-bottom : 10px">
            <div class="notification is-primary">
                <h1 style="font-size : 20px"><b>{{each.title}}</b></h1>
                <small>author : {{each.userId.username}}</small>
            </div>
            <div class="buttons">
                <b-button @click="upButton(each._id)" type="is-success"><i class="fas fa-angle-double-up"></i></b-button>
             </div>
            <div class="card-content">
                <h1 style="display : flex; flex : column">{{valueUp - valueDown}}</h1>
                <p>{{each.description}}</p>
            </div>
            <div class="buttons">
                <b-button @click="downButton(each._id)" type="is-danger"><i class="fas fa-angle-double-down"></i></b-button>
             </div>
            <div class="notification is-primary">
                <b-button @click="getDetail(each._id)" type="is-primary"
                    inverted
                    outlined>
                    Invert Outlined
                </b-button>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    computed : {
        ...mapState(['allQuestion', 'valueUp', 'valueDown', 'valueAll'])
    },
    methods : {
        getDetail(questionId){
            console.log(questionId, 'idnya')
            this.$store.dispatch('getQuestionOne', questionId)
            this.$router.push(`/detail/${questionId}`)
        },
        upButton(Qid){
            console.log('kalo ini up', Qid)
            this.$store.dispatch('voteUp', Qid)
        },
        downButton(Qid){
            console.log('ini id', Qid)
            this.$store.dispatch('voteDown', Qid)
        }
    },
    created(){
        this.$store.dispatch('getQuestion')
    }

}
</script>

<style>

</style>
