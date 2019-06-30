<template>
  <div
      style="cursor:pointer"
      v-on:click="filtering(category)"
    >{{ category }}
  </div>
</template>
<script>
export default {
  name: "category-component",
  props: ["category"],
  data() {
    return {};
  },
  components: {},
  computed: {},
  methods: {
    filtering(cat) {
      this.$emit("fetchQuestions", cat);
    }
  },
  created() {}
};
</script>