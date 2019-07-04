<template>
    <div>
        <!-- Navbar -->
        <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark" style="height: 50px">
            <!-- Brand/logo -->
            <a class="navbar-brand" href="">
                <a  id="logo" style="font-size: 35px; color: white; font-family: 'DM Sans', sans-serif">
                    <img src="https://image.flaticon.com/icons/png/512/1874/1874683.png" alt="Logo" style="height: 35px">
                    Hacktivoverflow</a>
            </a>
            
            <!-- Links -->
            <ul class="navbar-nav ml-auto" id="menu">
                 <li>
                    <a class="btn nav-link"><router-link to="/home">Home</router-link></a>
                </li>
                <li>
                    <a @click="logout" class="btn nav-link">Logout</a>
                </li>
            </ul>
        </nav>

        <!-- Content -->
        <div class="container">
            <!-- Question Section -->
            <div id="question">
                <div class="card" style="background-color: lightgreen; border-radius: 50px">
                    <div class="card-body row" style="margin-left: 30px">
                        <div class="col-1">
                            <a href="" @click.prevent="upvotesQ" ><i class="fas fa-caret-up" style="font-size: 40px"></i></a>
                            <h4 style="margin-left:3px; margin-top:-5px; margin-bottom: -8px">{{question.upvotes.length-question.downvotes.length}}</h4>
                            <a href="" @click.prevent="downvotesQ" ><i class="fas fa-caret-down" style="font-size: 40px"></i></a>
                        </div>
                        <div class="col-10">
                            <h6 style="font-weight: bold">{{question.title}}</h6>
                            <p>{{question.description}}</p>
                            <p style="font-size: 14px">Post by: {{question.userId.name}}</p>
                            <p style="font-size: 14px">{{new Date(question.createdAt).toLocaleDateString('en-US',
                                { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Answer Section -->
            <div class="row" id="answer">
                <h4 class="col-12" id="txt-answer">Answer: </h4>
                <div v-if="answers.length == 0" class="col-12">
                    <br><h3 style="text-align: center; font-weight: bold">No Answer</h3>
                </div>
                <div class="col-10 offset-1 card bg-light text-dark" v-for="answer in answers" :key="answer._id" style="border-radius: 25px; margin-bottom:10px">
                    <div class="card-body row" style="line-height: 0.5; margin-bottom: 10px;">
                        <div class="col-1">
                            <a href="" @click.prevent="upvotesAns(answer._id)"><i class="fas fa-caret-up" style="font-size: 40px"></i></a>
                            <h4 style="margin-left:3px; margin-top:-5px; margin-bottom: -8px">{{answer.upvotes.length-answer.downvotes.length}}</h4>
                            <a href="" @click.prevent="downvotesAns(answer._id)"><i class="fas fa-caret-down" style="font-size: 40px"></i></a>
                        </div>
                        <div class="col-11">
                            <h6 style="font-weight: bold">{{answer.title}}</h6>
                            <p>{{answer.description}}</p>
                            <p style="font-size:12px">Posted by: {{answer.userId.name}}</p>
                            <div class="col-12 d-flex justify-content-between">
                                <p style="font-size:12px">{{new Date(answer.createdAt).toLocaleDateString('en-US',
                                    { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}}</p>
                                <div v-if="answer.userId._id == myId">
                                    <a @click="toEdit(answer._id)" data-toggle="modal" :data-target="'#editModal'+answer._id"><i class="fas fa-edit" style="font-size: 20px"></i></a> | 
                                    <a @click="remove(answer._id)"><i class="fas fa-trash-alt" style="font-size: 20px"></i></a>
                                </div>
                            </div>
                            </div>
                    </div>
            </div>

                <!-- Modal Edit -->
                 <div :id="'editModal'+editAnswer.id" class="modal fade" role="dialog" >
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
                                        <input type="text" class="form-control col-lg-9"  v-model="editAnswer.title" style="margin-bottom: 10px;">
                                        <label for="description" class="col-3">Description: </label>
                                        <textarea class="form-control col-9" v-model="editAnswer.description" style="height: 250px"></textarea>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <input @click="save(editAnswer.id)" class="btn btn-success d-flex justify-content-end" type="submit" value="Save" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Form Add Answer -->
            <div id="formAdd">
                <h5>Input Your Answer</h5>
                <form @submit.prevent="addAnswer" style="width: 700px; margin-left: 20px">
                    <div class="form-group">
                        <label>Title:</label>
                        <input type="text" class="form-control" v-model="newAnswer.title">
                    </div>
                    <div class="form-group">
                        <label>Description:</label>
                        <textarea class="form-control col-9" v-model="newAnswer.description" ></textarea>
                    </div>
                    <button type="submit" class="btn btn-success btn-small">Save</button>
                </form> 
            </div>
        </div>
    </div>
</template>

<script>
import axios from '@/api/axios.js'
export default {
    name:'question-answer',
    data(){
        return{
            question:{},
            answers:[],
            editAnswer:{
                id:'',
                title:'',
                description:''
            },
            isEdit:'',
            myId:'',
            newAnswer:{
                title: '',
                description:''
            }
        }
    },
    methods:{
        getQuestion(){
            axios({
                method: 'get',
                url:`/questions/details/${this.$route.params.id}`,
                headers:{
                    'token': localStorage.token
                }
            })
            .then(({data})=> {
                // console.log(data)
                this.question= data
            })
            .catch(err =>{
                console.log('error get get question')
                console.log(err)
            })
        },
        getAnswer(){
            axios({
                method: 'get',
                url:`/answers/${this.$route.params.id}`,
                headers:{
                    'token': localStorage.token
                }
            })
            .then(({data}) => {
                console.log(data, 'data answer')
                this.answers= data
            })
            .catch(err =>{
                console.log('error get answers')
                console.log(err)
            })
        },
        toEdit(id){
            axios({
                method:'get',
                url:`/answers/details/${id}`,
                headers:{
                    'token': localStorage.token
                }
            })
            .then(({data}) =>{
                this.editAnswer.id= data._id
                this.editAnswer.title= data.title
                this.editAnswer.description= data.description
                // this.isEdit= 'edit'
            })
            .catch(err =>{
                console.log('edit find one answer');
                console.log(err);
                
            }) 
        },
        addAnswer(){
            axios({
                method:'post',
                url:`/answers`,
                data:{
                    title: this.newAnswer.title,
                    description: this.newAnswer.description,
                    questionId: this.$route.params.id
                },
                headers:{
                    'token': localStorage.token
                }
            })
            .then(({data}) => {
                 Swal.fire(
                    'Success Save Your Answer!',
                    'success'
                )
                this.newAnswer.title=''
                this.newAnswer.description=''
                this.$router.push(`/answer/${this.question._id}`)
            })
        },
        save(id){
            axios({
                method:'patch',
                url:`/answers/${this.id}`,
                data:{
                    title: this.editAnswer.title,
                    description: this.editAnswer.description
                },
                headers:{
                    'token': localStorage.token
                }
            })
            .then(({data}) =>{
                Swal.fire(
                    'Success Save Your Answer!',
                    'success'
                )
                this.editAnswer.id=''
                this.editAnswer.title=''
                this.editAnswer.description=''
                this.isEdit=''
            })
        },
        remove(id){
             Swal.fire({
                title: 'Are you sure remove this answer?',
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
                        url:`/answers/${id}`,
                        headers:{
                            'token': localStorage.token
                        }
                    })
                    .then(data =>{
                         Swal.fire(
                        'Success Delete Your Answer!',
                        'success'
                        )
                    })
                    .catch(err =>{
                        console.log('error delete answer');
                        console.log(err);
                        
                        
                    })
                }
            })
        },
        upvotesQ(){
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
        downvotesQ(){
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
        upvotesAns(id){
            axios({
                method: 'patch',
                url: `/answers/upvotes/${id}`,
                headers:{
                    'token': localStorage.token
                }
            })
            .then(({data}) => {
                console.log(data)
                Swal.fire(
                'Success vote the answer!',
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
        downvotesAns(id){
            axios({
                method: 'patch',
                url: `/answers/downvotes/${id}`,
                headers:{
                    'token': localStorage.token
                }
            })
            .then(({data}) => {
                Swal.fire(
                'Success vote the answer!',
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
        logout(){
        Swal.fire({
            title: 'Are you sure to sign out?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
            })
        .then((result) => {
            if (result.value) {
            localStorage.removeItem('userId')
            localStorage.removeItem('name')
            localStorage.removeItem('token')
            this.$router.push('/')
            }
        })
        }
    },
    created(){
        this.getQuestion()
        this.getAnswer()
        this.myId= localStorage.userId
    }

}
</script>

<style scoped>
    #question{
        margin-top: 75px;
        line-height:0.75;
    }
    #answer{
        border: 2px solid black;
        border-radius: 20px;
        margin-top: 20px;
        overflow: scroll;
    }
    #txt-answer{
        margin-top: 10px;
        text-align: center;
        font-weight: bold;
        text-decoration: underline blue;
    }
    #formAdd{
        border: 2px solid black;
        border-radius: 20px;
        margin-top: 20px;
    }
    #formAdd h5{
        text-align: center;
        font-weight: bold;
        margin-top: 10px;
    }
    #formAdd button{
        margin-left: 70%
    }
    #menu a{
        text-decoration: none;
        color: white;
        font-weight: bold;
        font-size: 14px;
    }
    #menu li a:hover{
        border-radius: 30px;
        background-color: lightgreen;
        color: black;
        
    }
</style>
