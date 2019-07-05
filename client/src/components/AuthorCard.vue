<template>
  <div class="container">
    <div class="row">
      <div id="picturedisplay" class="row s6 m6 l6">
        <div class="row">
          <div class>
            <span class="relativetime">asked: {{ getDate(question.createdAt) }}</span>
          </div>

        </div>
        <div class="col s1 m1 l1">
          <div class>
            <a href="">
              <div class="gravatar-wrapper-32">
                <img
                  src="../../public/user1.png"
                  alt
                  width="38"
                  height="38"
                />
              </div>
            </a>
          </div>
        </div>
        <div class="col s7 m7 l7">
          <div class>
            <span>{{ question.author.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['question'],
  methods: {
    getDate(datetime) {
      let date = new Date(datetime);
      let dateString = date.toDateString();
      return dateString;
    },
  },
};
</script>

<style scope>
#picturedisplay {
    margin-bottom: 0px;
  padding-bottom: 0px;
}
</style>
