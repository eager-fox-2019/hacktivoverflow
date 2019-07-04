<template>
    <div class="list-group">
        <button @click="home" type="button" class="list-group-item list-group-item-action">Home</button>
        <!-- <button @click="tags" type="button" class="list-group-item list-group-item-action">Tags</button> -->
    </div>
</template>

<script>
export default {
    methods: {
        home () {
            this.$router.push('/home')
        },
        tags () {
            this.$router.push('/tags')
        }
    }
}
</script>

<style scoped>
.list-group-item {
    border: 0 ;
    background-color: rgb(247, 236, 208);
    margin-bottom: 5px;
}
</style>
