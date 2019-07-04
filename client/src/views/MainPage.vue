<template>
    <div>
        <div class="columns is-mobile is-centered">
        </div>
        <div class="columns">
            <div class="column is-one-quarter" style="border : 1px solid black">
                <h1>
                    halo
                </h1>
            </div>
            <div class="column" style="border : 1px solid blue">
                <h1>allQuestion</h1>
            </div>
        </div>
        <div class="columns">
            <div class="column is-one-quarter" style="border : 1px solid black">
                <h1>
                    <button @click.prevent="fillForm" type="submit" class="button is-primary"> Add Question </button>
                </h1>
                    <button @click.prevent="logout" type="submit" class="button is-primary"  style="margin-top : 100px"> LogOut </button>
            </div>
            <div class="column" style="border : 1px solid blue">
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
