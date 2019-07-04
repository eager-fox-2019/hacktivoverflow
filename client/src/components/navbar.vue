<template>
    <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark" style="height: 50px; font-family: 'DM Sans', sans-serif;">
        <!-- Brand/logo -->
        <a class="navbar-brand" href="">
            <a  id="logo" style="font-size: 35px; color: white;">
                <img src="https://image.flaticon.com/icons/png/512/1874/1874683.png" alt="Logo" style="height: 35px">
                 Hacktivoverflow</a>
        </a>
        
        <!-- Links -->
        <ul class="navbar-nav ml-auto" >
            <li id="menu">
                <a @click="logout" class="btn nav-link">Logout</a>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name:'navbar',
    methods:{
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
    }
}
</script>

<style scoped>
    #menu a{
        text-decoration: none;
        color: white;
        font-weight: bold;
        font-size: 14px;
    }
    #menu a:hover{
        border-radius: 30px;
        background-color: lightgreen;
        color: black;
        
    }
</style>
