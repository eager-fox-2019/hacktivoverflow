<template>
  <el-row>
    <el-col :span="12" class="topLanding">
      <div class="grid-content left">
        <h1 class="appLogo">Hoverflow</h1>
      </div>
    </el-col>
    <el-col :span="12">
      <el-row type="flex" class="row-bg right" justify="end">
        <el-col :span="6">
          <div class="grid-content">
            <h4 class="appLogo">Hoverflow</h4>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <h4 class="appLogo">Hoverflow</h4>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <h4 class="appLogo">Hoverflow</h4>
          </div>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {};
</script>

<style>
.topLanding {
  display: inline-block;
}
.left {
  margin-top: 10px;
  margin-left: 20px;
  padding-left: 20px;
  text-align: left;
  /* border: 1px solid black; */
}
.right {
  margin-top: 10px;
  margin-right: 20px;
  padding-right: 20px;
  text-align: right;
  /* border: 1px solid black; */
}
</style>
