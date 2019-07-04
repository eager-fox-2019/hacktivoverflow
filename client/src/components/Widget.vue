<template>
    <div>
        <div v-if="isLogin">
            <WatchedTags />
            <JobsInfo />
        </div>
        <div style="width: 14em;">

        </div>
    </div>
</template>

<script>
import WatchedTags from '@/components/WatchedTags'
import JobsInfo from '@/components/JobsInfo'

export default {
    components: {
        WatchedTags
    },
    computed: {
        isLogin() {
            return this.$store.getters.isLogin
        }
    },
}
</script>

<style>

</style>
