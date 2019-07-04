<template>
  <div class="home">
    <NavbarHome></NavbarHome>
    <el-row :gutter="20">
      <el-col :span="15" :offset="2">
        <div class="grid-content homeMain" >
          <el-button
            type="primary"
            @click="onNewQuestion"
          >add question</el-button>
          <askQuestion v-if="questionForm == true" @trigeredfromaskquestion="onNewQuestion"></askQuestion>
          <MainHome v-if="questionForm == false"></MainHome>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content -light" >
          <SideHome></SideHome>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import NavbarHome from "../components/navbar.vue";
import MainHome from "../components/mainHome.vue";
import SideHome from "../components/sideHome.vue";
import askQuestion from "../components/askQuestion.vue";

export default {
  components: {
    HelloWorld,
    NavbarHome,
    MainHome,
    SideHome,
    askQuestion
  },
  data() {
    return {
      questionForm: false
    };
  },
  methods: {
    onNewQuestion() {
      console.log("akan ke new question");
      //   this.$store.dispatch("makeNewQuestion");
      console.log(this.questionForm);
      if (this.questionForm == false) {
        this.questionForm = true;
      } else {
        this.questionForm = false;
      }
      
      console.log(this.questionForm);
    }
  }
};
</script>

<style>
.homeMain {
  height: 100%;
  padding-bottom: 20px;
}
</style>

