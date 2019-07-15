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
                    <button @click.prevent="logout" type="submit" class="button is-danger"  style="margin-top : 100px"> LogOut </button>
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
    components : {
        QuestionCard
    },
    computed : {
        ...mapState(['registerState'])
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
    }

}
</script>

<style>

</style>
