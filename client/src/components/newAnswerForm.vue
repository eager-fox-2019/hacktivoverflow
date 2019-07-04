<template>
     <div class="card">  
    <div class="card-content">
        <b>ANSWER THIS QUESTION</b> 
        <br>
        <br>
        <label for="title">Title : </label>
        <input v-model="form.title" type="text">
        <br>
        <br>
        <label for="description">Answer : </label>
        <br>
        <textarea v-model="form.description" name="description" id="" cols="30" rows="5"></textarea>
        <br>
        <a @click.prevent="createAnswer" class="button is-success">SUBMIT</a>
    </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            form : {}
        }
    },
    methods : {
        createAnswer(){
            this.$emit('submitNewAns', this.form)
            this.form = {}
        }
    }
}
</script>

<style>

</style>

