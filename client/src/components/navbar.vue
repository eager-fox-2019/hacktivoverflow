<template>
  <div class="navbar2">
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="3" :offset="1">
        <div class="grid-content ">
            <h5 @click="backToHome">ini logo</h5>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content " >
            <h5>ini searchbar</h5>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content ">
            <p></p>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content ">
            <p></p>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content ">
            <a @click="onLogOut"> Log Out</a>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
    methods: {
        onLogOut() {
            this.$router.push('/')
            localStorage.removeItem('token')
        },
        backToHome() {
          this.$router.push('/home')
        }
    }
};
</script>

<style>
.navbar2 {
  height: 50px;
  /* border: 1px solid turquoise; */
  margin: 0px;
  padding: 0px;
  background-color: rgb(177, 136, 58);
  color: whitesmoke;
}
</style>
