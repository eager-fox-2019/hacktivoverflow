<template>
    <div>
        <!-- Card My Question -->
        <div class="card bg-light text-dark" style="margin-bottom: 10px;">
            <div class="card-body" style="line-height: 0.75">
                <h6 style="font-weight: bold">{{question.title}}</h6>
                <p></p>
                <p style="font-size:14px">{{question.description}}</p>
                <p style="font-size:14px">Total Up votes: {{question.upvotes.length}}</p>
                <p style="font-size:14px">Total Down votes: {{question.downvotes.length}}</p>
                <div>
                    <a class="btn" @click="toEdit()" data-toggle="modal" :data-target="'#editModal'+question._id"><i class="fas fa-edit"></i></a> | 
                    <a @click="remove(question._id)"> <i class="fas fa-trash-alt"></i></a>
                </div>
            </div>
        </div>

        <!-- Modal Edit -->
        <div :id="'editModal'+question._id" class="modal fade" role="dialog" >
            <div class="modal-dialog" >

                <!-- Modal content-->
                <div class="modal-content" style="width: 700px; height:500px" >
                <div class="modal-header">
                    <h4 class="modal-title">Edit Question</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body row">
                    <form @submit.prevent="save" class="form-inline">
                        <div class="form-group col-lg-12">
                            <label class="col-lg-3" for="name">Title: </label>
                            <input type="text" class="form-control col-lg-9"  v-model="edited.title" style="margin-bottom: 10px;">
                            <label for="description" class="col-3">Description: </label>
                            <textarea class="form-control col-9" v-model="edited.description" style="height: 250px"></textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <input @click="save" class="btn btn-success d-flex justify-content-end" type="submit" value="Save" />
                </div>
                </div>

            </div>
        </div>
     </div>
</template>

<script>
import axios from '@/api/axios.js'

export default {
    name: 'cardMyPost',
    props: ['question'],
    data(){
        return {
            edited:{
                title:'',
                description:''
            }
        }
    },
    methods:{
        toEdit(question){
            this.edited.title= this.question.title
            this.edited.description= this.question.description
        },
        save(){
            axios({
                method: 'patch',
                url:`/questions/${this.question._id}`,
                data:{
                    title: this.edited.title,
                    description: this.edited.description
                },
                headers:{
                    'token': localStorage.token
                }
            })
            .then(question =>{
                Swal.fire(
                'Success Delete Your Question!',
                'success'
                )
            })
            .catch(err=>{
                console.log('error save edit')
                console.log(err)
            })
        },
        remove(id){
        Swal.fire({
                title: 'Are you sure to remove this question?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes!'
                })
            .then((result) => {
                if (result.value) {
                    axios({
                        method:'delete',
                        url:`/questions/${id}`,
                        headers:{
                            'token': localStorage.token
                        }
                    })
                    .then(data =>{
                         Swal.fire(
                        'Success Delete Your Question!',
                        'success'
                        )
                        this.edited.title=''
                        this.edited.description=''
                        this.$router.push('/home')
                    })
                    .catch(err =>{
                        console.log('error delete answer');
                        console.log(err);
                        
                        
                    })
                }
            })
        }
    }
}
</script>

<style scoped>

</style>
