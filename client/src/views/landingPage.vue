<template>
  <div class="landing">
    <el-row>
      <el-col :span="12" class="topLanding">
        <div class="grid-content left">
          <h1 class="appLogo">Hoverflow</h1>
        </div>
      </el-col>
      <el-col :span="12">
        <el-row type="flex" class="row-bg right" justify="end">
          <el-col :span="4">
            <div class="grid-content">
              <h4 class="appLogo">Hoverflow</h4>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content">
              <h4 class="appLogo">Hoverflow</h4>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content">
              <h4 class="appLogo">Hoverflow</h4>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <llForm />
    <el-row :gutter="10">
        <el-col :span="14" type="flex">
            <h4  style="margin: 0px; padding: 0px; border: 1px solid purple">hello world</h4>
        </el-col>
        <el-col :span="10" type="flex">
            <h4  style="margin: 0px; padding: 0px; border: 1px solid purple">hello world</h4>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import llForm from '../components/loginLogout.vue';

export default {
  components: {
    llForm,
  },
};
</script>

<style>
.topLanding {
  display: inline-block;
}
.left {
  margin-top: -10px;
  margin-left: 20px;
  padding-left: 20px;
  text-align: left;
  border: 1px solid blue;
}
.right {
  /* margin-top: 10px; */
  margin-right: 20px;
  padding-right: 20px;
  text-align: right;
  border: 1px solid blue;
}
</style>
