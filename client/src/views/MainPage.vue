<template>
    <div>
        <div class="columns is-mobile is-centered">
        </div>
        <div class="columns">
            <div class="column is-one-quarter" >
            </div>
            <div class="column" >
                <h1><b>allQuestion</b></h1>
            </div>
        </div>
        <div class="columns">
            <div class="column is-one-quarter" >
                <h1>
                    <button @click.prevent="fillForm" type="submit" class="button is-primary"> Add Question </button>
                </h1>
                <div class="card" style="margin-top : 20px">
                    <div class="card">
                    <div class="card-image">
                        <figure class="image is-4by3">
                        <img src="https://www.uni-bremen.de/fileadmin/_processed_/4/9/csm_blank-profile-picture-973460_1280_01caf5e745.png" alt="Placeholder image">
                        </figure>
                    </div>
                    <div class="card-content">
                        <div class="media-content">
                            <p class="title is-4">{{this.theUsername}}</p>
                        </div>
                         <button @click.prevent="logout" type="submit" class="button is-danger"  style="margin-top : 100px"> LogOut </button>
                        </div>
                    </div>
                </div>
                   
            </div>
            <div class="column" >
                <QuestionCard/>
            </div>
        </div>
    </div>
</template>

<script>
import QuestionCard from '@/components/QuestionCar.vue'
import {mapState, mapActions} from 'vuex'
export default {
    data(){
        return{
            theUsername : localStorage.getItem("username")
        }
    },
    components : {
        QuestionCard
    },
    computed : {
        ...mapState(['registerState', 'allQuestion'])
        // disini bisa dapet data dari state yang ada store
    },
    methods : {
        fillForm(){
            this.$router.push('/formAdd')
        },
        logout(){
            localStorage.clear()
            this.$router.push('/')
        }
    },
    created(){
        this.$store.dispatch('getQuestion')
    }

}
</script>

<style>

</style>
