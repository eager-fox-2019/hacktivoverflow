<template>
    <div class="jobCard">
        <v-card class="ma-3" style="min-height : 200px">
            <v-layout>
                <v-flex xs5>
                <!-- <v-img :src="job.company_logo" 
                height="100px"></v-img> -->
                <img :src="job.company_logo" height="100px" width="100px"  alt="">
                </v-flex>
                <v-flex xs7>
                <v-card-title primary-title>
                    <div>
                    <h3>{{job.company}}</h3><br>
                    <h3>{{job.title}}</h3>
                    <h5>{{job.location}}</h5>
                    <a :href="job.url">go to job</a>
                    </div>
                </v-card-title>
                </v-flex>
            </v-layout>
        </v-card>
    </div>
</template>


<script>
export default {
    data(){
        return {

        }
    },
    component : {

    },
    props : ['job']

}
</script>
