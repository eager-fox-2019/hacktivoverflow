<template>
    <div class="my-container__small">
        <Sidebar />

        <div style="width: 740px;">
            <div class="heads">
                <h5 slot="header">Tags</h5>
            </div>
            <small>
                A tag is a keyword or label that categorizes your question with other, similar questions.
            </small>
            <div class="mt-4">
                <form @submit.prevent="submitSearchTag">
                    <div class="form-group" style="width: 35%;">
                        <input 
                            type="search" 
                            class="form-control"
                            v-model="searchValue"
                            placeholder="Filter by tag name"
                        >
                    </div>
                </form>
            </div>
            <div v-if="questionsByTag">
                <h5>{{questionsByTag.length}} questions</h5>
                <hr>
                <QuestionList
                    :questions="questionsByTag"
                />
            </div>
        </div>

        <Widget />
    </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import QuestionList from '@/components/QuestionList.vue'
import Widget from '@/components/Widget';

export default {
    components: {
        Sidebar,
        QuestionList,
        Widget
    },
    data() {
        return {
            searchValue: '',
            searchTags: []
        }
    },
    methods: {
        submitSearchTag() {            
            this.$store.dispatch('getQuestionByTags', this.searchValue)
        }
    },
    computed: {
        questionsByTag() {
            return this.$store.getters.questionsByTag
        }
    },
}
</script>

<style>

</style>
