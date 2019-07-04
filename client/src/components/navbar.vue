<template>
  <div class="navbar2">
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="3" :offset="1">
        <div class="grid-content ">
            <h5>ini logo</h5>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content " style="border: 1px solid black">
            <h5>ini searchbar</h5>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content " style="border:1px solid green">
            <p>ke-1</p>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content " style="border:1px solid green">
            <p>ke-2</p>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content " style="border:1px solid green">
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
        }
    }
};
</script>

<style>
.navbar2 {
  height: 50px;
  border: 1px solid turquoise;
  margin: 0px;
  padding: 0px;
  background-color: burlywood;
}
</style>
