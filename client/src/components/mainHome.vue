<template>
  <div class="mainHome">
    <el-row
      class="mainhomeRow"
      :gutter="20"
      v-for="(question,i) in this.$store.state.questions"
      :key="i"
    >
      <el-col :span="2" :offset="1">
        <div class="grid-contentmainHomeContent" style="border: 1px">
          <h3>{{ question.upVote.length-question.downVote.length}}</h3>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-contentmainHomeContent" style="border: 1px">
          <h3>{{ question.answers.length }}</h3>
        </div>
      </el-col>
      <el-col :span="19">
        <div class="grid-contentmainHomeContent" style="border: 1px">
          <a @click="toDetailQuestion(question._id)">
            <h1>{{ question.title }}</h1>
          </a>
          <p>@{{question.userId.username}} {{question.userId.createdAt}}</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    toDetailQuestion(questionId) {
      console.log(questionId, "menuju tak terbatas dan melampauinya");
      this.$router.push(`/question/${questionId}`);
    }
  }
};
</script>

<style>
.mainhomeRow {
  height: 100%;
}
.grid-contentmainHomeContent {
  height: 80px;
  margin-bottom: 10px;
}
</style>
