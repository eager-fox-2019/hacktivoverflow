<template>
    <div>
        <div v-for="(tag, index) in watchedTags" :key="index">
            {{ tag }}
        </div>
        <form 
            @submit.prevent="submitWatchTag"
        >
            <input v-model="tagName" type="text">
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tagName : ''
        }
    },
    computed: {
        watchedTags() {
            return this.$store.getters.getWatchedTags
        }
    },
    methods: {
        submitWatchTag() {
            this.$store.dispatch('addWatchedTags', this.tagName)
            this.tagName = ''
        }
    },
}
</script>

<style>

</style>
