<template>
    <div id="addModal" class="modal fade" role="dialog" >
        <div class="modal-dialog" >

            <!-- Modal content-->
            <div class="modal-content" style="width: 700px; height:500px" >
            <div class="modal-header">
                <h4 class="modal-title">Add New Question</h4>
                <p>{{error}}</p>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body row">
                <form @submit.prevent="addQuestion" class="form-inline">
                    <div class="form-group col-lg-12">
                        <label class="col-lg-3" for="name">Title: </label>
                        <input type="text" class="form-control col-lg-9"  v-model="title" style="margin-bottom: 10px;">
                        <label for="description" class="col-3">Description: </label>
                        <textarea class="form-control col-9" v-model="description" style="height: 250px"></textarea>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <input @click="addQuestion" class="btn btn-success d-flex justify-content-end" type="submit" value="Save" />
            </div>
            </div>

        </div>
    </div>
</template>

<script>
import axios from '@/api/axios.js'

export default {
    name: 'formAddQuestion',
    data(){
        return{
            title:'',
            description:'',
            error:''
        }
    },
    methods:{
        addQuestion(){
            if(this.title== '' || this.description== ''){
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: 'All field must be filled!'
                })
            }else{
                axios({
                    method: "POST",
                    url: `/questions`,
                    data: {
                        title: this.title,
                        description: this.description
                    },
                    headers:{
                    'token': localStorage.token
                    }
                })
                .then(({data}) =>{
                     Swal.fire(
                    'Your question have been post!',
                    'Success!',
                    'success'
                    )
                    this.title=''
                    this.description=''
                    this.error=''
                    this.$store.dispatch('getAllQuestion'),
                    this.$store.dispatch('getMyQuestion')
                    this.$router.push('/home')
                })
                .catch(err =>{
                    console.log('error add question')
                    console.log(err)
                    this.error= err.message
                })
            }
        }
    }
}
</script>

<style>

</style>
