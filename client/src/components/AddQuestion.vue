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
import Swal from 'sweetalert2';
export default {
    data(){
        return{
            title : '',
            description : ''
        }
    },
    methods : {
        fillForm(){
            this.$store.dispatch('createQuestion', {
                title : this.title,
                description : this.description
            })
            .then(result => {
                Swal.fire({
                    position: 'top-end',
                    type: 'success',
                    title: 'Your Question has been saved',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.$router.push('/MainPage')
            })
        }
    }

}
</script>

<style>

</style>
