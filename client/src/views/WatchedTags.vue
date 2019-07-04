<template>
    <div class="my-container__small">
        <Sidebar />

         <div style="width: 740px;">
            <div class="heads">
                <h5 slot="header">Watched Tags</h5>
            </div>
            <small>
                Watched tags like subscribe to topic of question that you interest
            </small>
            <div v-if="loginUser.watchedTags">
                <QuestionList
                    :questions="watchedTagsQuestions"
                />
            </div>
        </div>

        <Widget />
    </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'
import Widget from '@/components/Widget';
import QuestionList from '@/components/QuestionList'

export default {
    components: {
        Sidebar,
        Widget,
        QuestionList
    },
    computed: {
        watchedTags() {
            return this.$store.getters.watchedTags
        },
        loginUser() {
            return this.$store.getters.loginUser
        },
        watchedTagsQuestions() {
            return this.$store.getters.watchedTagsQuestions
        }
    }
}
</script>

<style>

</style>
