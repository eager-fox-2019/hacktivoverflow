<template>
  <div class="question">
    <el-row class="mainhomeRow" :gutter="20">
      <el-col :span="24">
        <div class="grid-contentmainHomeContent" style="border: 1px">
          <el-row :gutter="20">
            <el-col :span="5">
              <div class="grid-content" style="border: 1px solid black">
                <p>kestu</p>
              </div>
            </el-col>
            <el-col :span="14">
              <div class="grid-content" style="border: 1px solid black">
                <el-form ref="formQuestion" :model="formQuestion" label-width="120px">
                  <el-form-item label="Title">
                    <el-input v-model="formQuestion.title"></el-input>
                  </el-form-item>
                  <el-form-item label="Description">
                    <el-input type="textarea" v-model="formQuestion.description"></el-input>
                  </el-form-item>
                  <el-button>Cancel</el-button>
                  <el-button type="primary" @click="addNewQuestion">Create</el-button>
                </el-form>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="grid-content" style="border: 1px solid black">
                <p>ketiga</p>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formQuestion: {
        title: "",
        description: ""
      }
    };
  },
  methods: {
      addNewQuestion(){
          console.log('tersubmited')
        //   console.log(this.formQuestion,'ini dinaaaa~~')
          this.$store.dispatch('postNewQuestion',this.formQuestion)
            .then((scc)=> {
                this.$store.dispatch('fetchQuestion')
                this.$emit('trigeredfromaskquestion')
                this.formQuestion.title = ''
                this.formQuestion.description = ''
            })
            .catch((err)=> {
                console.log(err)
            })
      }
  }
};
</script>

<style>
</style>
