<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a @click.prevent="home" class="navbar-brand" href="#">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Stack_Overflow_logo.svg/1280px-Stack_Overflow_logo.svg.png" alt="" srcset="">
            </a>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto" />
                <h5 @click="logout">Logout</h5>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    methods: {
        logout () {
            localStorage.clear()
            this.$router.push('/login')
        },
        home () {
            this.$router.push('/home')
        }
    }
}
</script>

<style scoped>
img {
    width: 175px;
    height: 35px;
    margin-left: 20px;
}
h5 {
    color: rgb(0, 0, 0);
    cursor: pointer;
    font-size: 15px;
    margin-right: 20px;
    color: blue
}
nav {
    -webkit-box-shadow: 0px 1px 5px -1px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 1px 5px -1px rgba(0,0,0,0.75);
    box-shadow: 0px 1px 5px -1px rgba(0,0,0,0.75);
}
</style>
