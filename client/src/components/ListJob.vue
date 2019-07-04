<template>
    <ul class="list-group mt-3">
        <li class="list-group-item title">JOB LIST</li>
        <li v-for="(job, index) in getJob" :key="index" class="list-group-item">
            <ul class="list-group list-group-flush">
                <li class="list-group-item text">Type : {{ job.type }}</li>
                <li class="list-group-item text">Company: {{ job.company }}</li>
                <li class="list-group-item text">Location : {{job.location  }}</li>
                <li class="list-group-item text">Title : {{ job.title }} </li>
                <li class="list-group-item visit"><a :href="job.company_url" target="_blank">Visit website</a></li>
            </ul>
        </li>
    </ul>
</template>

<script>
export default {
    methods: {
    },
    computed: {
        getJob() {
           return this.$store.state.jobs
        }
    }
}
</script>

<style scoped>
.title {
    background-color: rgb(195, 162, 122);
    font-weight: bold;
    color: rgb(65, 35, 15)
}
.visit {
    cursor: pointer;
    color: blue;
}
.text {
    font-size: 15px;
}
</style>
