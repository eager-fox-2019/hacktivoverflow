<template>
    <div>
        <div class="card bg-light text-dark" style="margin-bottom: 10px;">
            <div class="card-body row" style="line-height: 0.75">
                <div class="col-1">
                    <a @click="upvote"><i class="fas fa-caret-up" style="font-size: 30px"></i></a>
                    <h4 style="margin-left:3px; margin-top:3px">{{question.upvotes.length-question.downvotes.length}}</h4>
                    <a @click="downvote"><i class="fas fa-caret-down" style="font-size: 30px"></i></a>
                </div>
                <div class="col-11">
                    <h6 style="font-weight: bold">{{question.title}}</h6>
                    <p>{{question.description}}</p>
                    <p>Post by: {{question.userId.name}}</p>
                    <p style="font-size:12px">{{new Date(question.createdAt).toLocaleDateString('en-US',
                        { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}}</p>
                    <div class="row">
                        <div class="col-12 d-flex justify-content-between">
                            <a href="" @click.prevent="toAnswer">Answer</a>
                            <div v-if="question.userId._id == myId">
                                <a class="btn" @click="toEdit()" data-toggle="modal" :data-target="idtrigger"><i class="fas fa-edit"></i></a> | 
                                <a class="btn" @click="remove(question._id)"><i class="fas fa-trash-alt"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Edit -->
        <div :id="idModal" class="modal fade" role="dialog" >
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
    name:'cardQuestion',
    props:['question'],
    components:{
    },
    data(){
        return {
            edited:{
                title:'',
                description:''
            },
            myId:'',
            idtrigger:'',
            idModal:''
        }
    },
    methods:{
        toAnswer(){
            // console.log('masuk toEdit', this.question._id);
            this.$router.push(`/answer/${this.question._id}`)
        },
        toEdit(question){
            console.log('masuk toedit')
            this.edited.title= this.question.title
            this.edited.description= this.question.description
        },
        upvote(){
            console.log('masuk upvote question');
            
            axios({
                method: 'patch',
                url: `/questions/upvotes/${this.question._id}`,
                headers:{
                    'token': localStorage.token
                }
            })
            .then(({data}) => {
                console.log(data)
                Swal.fire(
                'Success vote the question!',
                'success'
                )
                this.$store.dispatch('getAllQuestion'),
                this.$store.dispatch('getMyQuestion')
            })
            .catch(err =>{
                Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'You have vote this question!',
                })
            })
        },
        downvote(){
            axios({
                method: 'patch',
                url: `/questions/downvotes/${this.question._id}`,
                headers:{
                    'token': localStorage.token
                }
            })
            .then(({data}) => {
                Swal.fire(
                'Success vote the question!',
                'success'
                )
                console.log(data)
                this.$store.dispatch('getAllQuestion'),
                this.$store.dispatch('getMyQuestion')
            })
            .catch(err =>{
                Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'You have vote this question!',
                })
            })
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
                        // this.edited.title=''
                        // this.edited.description=''
                        this.$router.push('/home')
                    })
                    .catch(err =>{
                        console.log('error delete answer');
                        console.log(err);
                        
                        
                    })
                }
            })
        }
    },
    created(){
        this.myId= localStorage.userId
        this.idtrigger= '#edit'+ this.question._id
        this.idModal= 'edit'+this.question._id
    }
}
</script>

<style scoped>
    p{
        font-size: 14px;
    }
</style>
