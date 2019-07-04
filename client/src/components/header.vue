<template>
    <nav class="navbar navbar-expand-lg fixed-top" style="height: 50px">
        <!-- Brand/logo -->
        <a class="navbar-brand" href="">
            <a  href="/" id="logo" style="text-decoration: none; font-size: 35px; color: white; font-family: 'DM Sans', sans-serif">
                <img src="https://image.flaticon.com/icons/png/512/1874/1874683.png" alt="Logo" style="height: 35px">
                 Hacktivoverflow</a>
        </a>
        
        <!-- Links -->
        <ul class="navbar-nav ml-auto">
            <li >
                <a class="btn nav-link" ><router-link to="/login" style="color:white; font-weight: bold">Login </router-link></a>
            </li>
            <li>
                <a class="btn nav-link"><router-link to="/register" style="color:white; font-weight: bold">Register </router-link></a>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'headerPage',

}
</script>

<style scoped>
    .btn:hover{
        color: black;
        background-color: lightgreen;
        font-weight: bold;
        border-radius: 25px;
        
    }

</style>
