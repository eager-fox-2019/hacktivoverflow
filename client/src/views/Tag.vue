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
            <hr>
            <div>
                <form @submit.prevent="submitSearchTag">
                    <div class="form-group" style="width: 35%;">
                        <input 
                            type="search" 
                            class="form-control"
                            placeholder="Filter by tag name"
                        >
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'

export default {
    components: {
        Sidebar
    }
}
</script>

<style>

</style>
