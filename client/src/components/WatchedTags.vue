<template>
    <div class="watched-tags-container watched-tags-card">
        <div class="watched-head" style="position: relative;">
            <h6><i class="fas fa-tags" style="margin-right: 7px;"></i>Watched Tags</h6>
            <span @click="toggleInput" class="edit-watch" style="position: absolute;">Edit</span>
        </div>
        <div>
            <div class="watched-tags-list">
                <ul
                    class="tags mt-2" 
                >
                    <li
                        v-for="(tag, index) in watchedTags"
                        :key="index"
                        style="padding: 3px 10px;"
                    >{{tag}} <span @click="removeTag(tag)" class="close-tags" v-if="isTagInputActive"><i class="fas fa-times-circle"></i></span></li>
                </ul>
            </div>
            <form 
                @submit.prevent="submitWatchTag"
            >
                <input 
                    v-model="tagName" 
                    type="text"
                    class="form-control"
                    v-if="isTagInputActive"
                    placeholder="input tag"
                >
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tagName : '',
            isTagInputActive: false
        }
    },
    computed: {
        watchedTags() {
            return this.$store.getters.watchedTags
        }
    },
    methods: {
        submitWatchTag() {
            this.$store.dispatch('addWatchedTags', this.tagName)
            .then(() => {
                if(!this.$store.getters.error) {
                    this.tagName = ''
                    this.$store.dispatch('getWatchedTagsQuestions')
                }
            })
        },
        removeTag(tagName) {
            this.$store.dispatch('removeWatchedTags', tagName)
            .then(() => {
                if(!this.$store.getters.error) {
                    this.tagName = ''
                    this.$store.dispatch('getWatchedTagsQuestions')
                }
            })
        },
        toggleInput() {
            this.isTagInputActive = !this.isTagInputActive
        }
    },
}
</script>

<style>
.watched-tags-container {
    width: 15em;
}
/* .watched-tags-card {
    border: 1px solid rgba(0,0,0,.125);
} */
.watched-tags-list {
    display: flex;
    flex-wrap: wrap;
}
.watched-head {
    text-align: center;
    padding: .5em .5em;
    background-color: #fff;
    border-bottom: 1px solid rgba(0,0,0,.125);
}
.close-tags:hover {
    cursor: pointer;
}
.edit-watch {
    position: absolute;
    bottom: 2.3em;
    right: 0em;
    font-size: 14px;
    color: #0584ff;
    font-weight: 500;
}
.edit-watch:hover {
    cursor: pointer;
    text-decoration: underline;
}
</style>
