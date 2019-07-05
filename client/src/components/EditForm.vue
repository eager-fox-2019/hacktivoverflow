<template>
  <div class="row">
    <form class="col s12">
      <div class="row">
        <div class="input-field col s10">
          <i class="material-icons prefix">T</i>
          <input v-model="title" id="input_text" type="text"  class="validate"/>
          <label class="active" for="input_text">Title</label>
        </div>
      </div>
      <!-- {{ data_edit }} -->
      <div class="row">
          <wysiwyg v-model="myHTML" />
      </div>
    </form>
    <!-- TAGS -->
    <div class="row">
      <div class="input-field col s12 m12 l12">
        <i class="material-icons prefix">label</i>
        <input v-on:keyup.enter="add_tag_button" v-model="tag_input" id="tag_input" type="text" class="validate">
        <!-- <input v-model="tag_input" id="tag_input" type="text" class="validate" /> -->
        <label for="tag_input">Tags</label>
        <span class="helper-text">Enter a tag</span>
      </div>
      {{data_edit}}
              <div class="row">
          <div v-for="(tag, index) in tags" :key="index" class="list-tag col">
            <div class="chip2">
              <!-- <div class="chip-head"></div> -->
              <div class="chip2-content">{{ tag }}</div>
              <div class="chip2-close">
                <a @click.prevent="delete_tag(tag)">
                  <svg class="chip2-svg" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
    </div>
    <slot></slot>
    <a @click="update_question" class="waves-effect waves-light btn-small right grey darken-3">Post Your Question</a>
  </div>
</template>

<script>
import "vue-wysiwyg/dist/vueWysiwyg.css"

export default {
  props: ['data_edit'],
  data() {
    return {
      title: '',
      tag_input: '',
      myHTML: '',
      tags: ''
    };
  },
  methods: {
    delete_tag (tag) {
      let index = this.tags.indexOf(tag);
      if (index !== -1) this.tags.splice(index, 1);
    },
    add_tag_button () {
      if (
        this.tag_input !== "" &&
        this.tags.indexOf(this.tag_input.toLowerCase()) == -1
      ) {
        this.tags.push(this.tag_input.toLowerCase());
        this.tag_input = "";
      }
    },
    update_question () {
      this.$store.dispatch('UPDATE_QUESTION_ACTION', { id:this.id, title: this.title, description: this.myHTML, tags: this.tags })
      .then(() => {
        this.tags = '',
        this.myHTML = '',
        this.title = ''
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },
  mounted() {
    console.log('createdddddddddd')
    console.log(this.data_edit, "ini titleeeeeeee")
      this.title= this.data_edit.title,
      this.myHTML= this.data_edit.description,
      this.tags= this.data_edit.tags
  },
  created () {
  }
};
</script>

<style scope>
.chip2 {
  display: inline-flex;
  flex-direction: row;
  background-color: #e5e5e5;
  border: none;
  cursor: default;
  height: 36px;
  outline: none;
  padding: 0;
  font-size: 14px;
  font-color: #333333;
  font-family: "Open Sans", sans-serif;
  white-space: nowrap;
  align-items: center;
  border-radius: 16px;
  vertical-align: middle;
  text-decoration: none;
  justify-content: center;
}

.chip2-head {
  display: flex;
  position: relative;
  overflow: hidden;
  background-color: #32c5d2;
  font-size: 1.25rem;
  flex-shrink: 0;
  align-items: center;
  user-select: none;
  border-radius: 50%;
  justify-content: center;
  width: 36px;
  color: #fff;
  height: 36px;
  font-size: 20px;
  margin-right: -4px;
}

.chip2-content {
  cursor: inherit;
  display: flex;
  align-items: center;
  user-select: none;
  white-space: nowrap;
  padding-left: 12px;
  padding-right: 12px;
}
.chip2-svg {
  color: #999999;
  cursor: pointer;
  height: auto;
  margin: 4px 4px 0 -8px;
  fill: currentColor;
  width: 1em;
  height: 1em;
  display: inline-block;
  font-size: 24px;
  transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  user-select: none;
  flex-shrink: 0;
}

.chip2-svg:hover {
  color: #666666;
}
</style>
