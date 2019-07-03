<template>
    <div class="myProfile">
        <!-- <h1>this is your profile</h1> -->
    </div>
</template>

<script>
export default {
    created(){
        if(localStorage.page = 'profile'){
            this.$router.push('/myProfile')
            this.$store.dispatch('fetchUserQuestion')
        }
    }
}
</script>
