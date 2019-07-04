<template>
    <div>
        <section>
            <form>
                <b-field label="Title">
                    <b-input v-model="title"></b-input>
                </b-field>

                <b-field label="Description">
                    <b-input v-model="description" maxlength="200" type="textarea"></b-input>
                </b-field>
                <button @click.prevent="fillForm" type="submit" class="button is-primary"> Submit </button>
            </form>
        </section> 
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data(){
        return{
            title : '',
            description : ''
        }
    },
    methods : {
        fillForm(){
            this.$store.dispatch('createAnswer', {
                title : this.title,
                description : this.description,
                QidS : this.$route.params.Qid
            })
            .then(result => {
                this.$store.dispatch('getQuestionOne', this.$route.params.Qid)
                this.$router.push(`/detail/${this.$route.params.Qid}`)
            })
        }
    }

}
</script>

<style>

</style>
