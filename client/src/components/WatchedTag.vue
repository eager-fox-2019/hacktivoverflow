<template>
    <div class="container">
            <h1 style="text-align:center;font-size:25px;" v-if="this.$route.name == 'dashboard'">Input Watched Tags</h1>
            <small style="text-align:center;margin-left:18%;color:gray;" v-if="this.$route.name == 'dashboard'">Please input spesific tags to subscribe on your favorite subject, Press Enter to input your watched tag.</small>
            <br>
            <br>
            <div class="row">
                <div class="col-6 offset-3">
                    <form v-on:submit.prevent="addTag">
                        <tags-input element-id="tags" v-model="mytag" :existing-tags="allTags" :typeahead="true">
                        </tags-input>
                    <br>
                    <button type="submit" class="btn btn-dark" style="margin-left:43%;">Submit</button>
                    </form>
                </div>
            </div>
            <br>
            <div class="row">
                <div class="col-6">
                    <p style="text-align:center;" v-if="mytags.length !== 0">My Watched Tags</p>
                        <div style="border-radius: 10px;text-align:center;" v-if="mytags.length !== 0">
                        <a href class="badge badge-primary mx-1" v-for="tag in mytags" :key="tag" @click.prevent="findQuestion(tag)" style="text-align:center;">
                        {{tag}}
                        </a>
                        <a href class="badge badge-primary mx-1" style="text-align:center;" @click.prevent="findQuestion('AllWatchedTags')" v-if="mytags.length !== 0">
                            AllWatchedTags
                        </a>
                        </div>
                </div>
                <div class="col-6">
                        <p style="text-align:center;" v-if="mytags.length !== 0">Delete Tags(click for deleting watched tags)</p>
                        <div style="border-radius: 10px;text-align:center;" v-if="mytags.length !== 0">
                        <a href class="badge badge-danger mx-1" v-for="tag in mytags" :key="tag" @click.prevent="deleteTag(tag)" style="text-align:center;">
                            {{tag}}
                        </a>
                </div>
                <br>
                </div>
                <div class="col-12" v-if="filter" style="text-align:center;">
                    <p>filter question on &nbsp;<span style="color:#0062CC;">'{{filter}}'</span>&nbsp; topic</p>
                </div>   
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
            }],
            filter:''
        }
    },
    methods:{
        addTag(){
            this.$store.dispatch('addTag', this.mytag)
            this.mytag = []
        },
        deleteTag(tag){
            this.$store.dispatch('deleteTag',tag)
            this.$store.dispatch('getQuestions')
            this.filter = ''
            console.log(tag)
        },
        findQuestion(tag){
            this.filter = tag
            console.log(tag)
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

<style scoped>
.container{
    background-color:blanchedalmond;
}
</style>
