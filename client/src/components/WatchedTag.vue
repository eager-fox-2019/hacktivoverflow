<template>
    <div class="container">
            <form v-on:submit.prevent="addTag">
            <tags-input element-id="tags" v-model="mytag" :existing-tags="allTags" :typeahead="true">
            </tags-input>
            <br>
            <button type="submit" class="btn btn-dark" style="margin-left:46%;">Submit</button>
            </form>
            <br>
             <p style="text-align:center;">My Watched Tags</p>
            <div style="border:solid #e8e8e8 1px;border-radius: 10px;text-align:center;" v-if="mytags.length !== 0">
                 <a href class="badge badge-primary mx-1" v-for="tag in mytags" :key="tag" @click.prevent="findQuestion(tag)" style="text-align:center;">
                {{tag}}
                </a>
            </div>
    </div>
</template>

<script>
import VoerroTagsInput from '@voerro/vue-tagsinput';
import { mapState } from 'vuex';

export default {
    data(){
        return{
            mytag:[],
            tagsCreated:[
            {
                key:"web development",
                value:"web development"
            },
            {
                key:"javascript",
                value:"javascript"
            }]
        }
    },
    methods:{
        addTag(){
            this.$store.dispatch('addTag', this.mytag)
            this.mytag = []
        },
        findQuestion(tag){
            this.$store.dispatch('getQuestions',tag)
        }
    },
    computed:{
        ...mapState(['tags','mytags']),
        allTags(){
            let allTag = []
            for(let tag of this.tags){
                let object = { }
                object["key"] = tag
                object["value"] = tag
                allTag.push(object)
            }
            return allTag
        }
    },
    components: {
        "tags-input": VoerroTagsInput
    },
    mounted(){
        this.$store.dispatch('getUserTag')
    }
}
</script>

<style>

</style>
