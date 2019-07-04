<template>
  <div style="margin-top: 50px">
    <div class="column is-6 is-offset-3">
      <b style="font-size:30px">New Question</b>
      <div style="margin-top: 10px">
        <b-field label="Title">
          <b-input type="text" maxlength="50" rounded v-model="q.title"></b-input>
        </b-field>
        <b-field label>
          <b-input maxlength="500" type="textarea" v-model="q.desc"></b-input>
        </b-field>
        <b-field label="Enter some tags">
          <b-taginput
            maxtags="5"
            v-model="q.tags"
            :data="filteredTags"
            autocomplete
            :allow-new="false"
            field="name"
            icon="label"
            placeholder="Add a tag"
            @typing="getFilteredTags"
          ></b-taginput>
        </b-field>
        <div>
          <b-button
            type="is-primary"
            size="is-medium"
            style="margin-right: 10px"
            @click="post"
          >Submit</b-button>
          <b-button size="is-medium" @click="cancel">Cancel</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import data from "@/tags.js";
export default {
  data() {
    return {
      q: {
        title: "",
        desc: "",
        tags: []
      },
      filteredTags: data,
      isSelectOnly: false
    };
  },
  methods: {
    cancel() {
      this.$router.push("/all");
    },
    post() {
      this.$store.dispatch("NEWQUESTION", this.q);
      this.$router.push("/one");
    },
    getFilteredTags(text) {
      this.filteredTags = data.filter(option => {
        return (
          option
            .toString()
            .toLowerCase()
            .indexOf(text.toLowerCase()) >= 0
        );
      });
    }
  }
};
</script>

<style>
</style>
