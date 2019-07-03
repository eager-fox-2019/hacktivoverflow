<template>
  <div class="llForm">
    <el-row type="flex" class="row-bg">
      <el-col :span="9" :offset="1">
        <div class="grid-content leftForm">
          <!-- <p></p> -->
          <el-row :gutter="20">
            <el-col :span="3">
              <div class="grid-content">
                <p></p>
              </div>
            </el-col>
            <el-col :span="17">
              <div class="grid-content midFormmid" >
                <el-card class="box-card midFormmidCard" v-if="form == 'signIn'">
                  <h1>Sign In</h1>
                  <el-form ref="loginForm" :model="loginForm" label-width="120px">
                    <el-form-item label="Username">
                      <el-input v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="Password">
                      <el-input v-model="loginForm.password" type="password"></el-input>
                    </el-form-item>
                    <p id="toogleSI">
                      don`t have an account yet ?
                      <a @click="toogleRS">click here</a>
                    </p>
                    <el-button type="primary" @click="onLogin">Sign In</el-button>
                  </el-form>
                </el-card>

                <el-card class="box-card midFormmidCard" v-if="form == 'signUp'">
                  <h1>Sign Up</h1>
                  <el-form ref="registerForm" :model="registerForm" label-width="120px">
                    <el-form-item label="Username">
                      <el-input v-model="registerForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="email">
                      <el-input v-model="registerForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="Password">
                      <el-input v-model="registerForm.password" type="password"></el-input>
                    </el-form-item>
                    <p id="toogleSU">
                      have an account ?
                      <a @click="toogleRS">click here</a>
                    </p>
                    <el-button type="primary" @click="onRegister">Sign Up</el-button>
                  </el-form>
                </el-card> 
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">
                <p></p>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content centerForm">
          <!-- <p>center</p> -->
        </div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content rightForm">
          <!-- <p>right</p> -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      registerForm: {
        username: "",
        email: "",
        password: ""
      },
      form: "signIn"
    };
  },
  methods: {
    onLogin() {
    //   console.log("oke,login", this.loginForm);
      this.$store.dispatch('getLogin',this.loginForm)
        .then((scc)=> {
            // console.log(scc,'berhasil balik')
            this.$router.push('/home')
        })
        .catch((err)=> {
            console.log(err)
        })
    },
    onRegister() {
    //   console.log("oke, Register", this.registerForm);
      this.$store.dispatch('getRegister',this.registerForm)
        .then((scc)=> {
            // console.log(scc,'berhasil balik')
            this.$router.push('/home')
        })
        .catch((err)=> {
            // console.log(err)
        })
    },
    toogleRS() {
    //   console.log("ke signin/signup");
    //   console.log(this.form)
      if (this.form === 'signIn') {
        //   console.log('pertama')
        this.form = 'signUp';
      } else if (this.form === 'signUp') {
        //   console.log('kedua')
        this.form = 'signIn';
      }
    }
  },
  created() {
    if (localStorage.getItem("token")) {
    //   console.log("ada");
      this.$store.commit("cekLogin");
    }
  }
};
</script>

<style>
.leftForm {
  /* border: 1px solid black; */
  height: 580px;
}
.centerForm {
  /* border: 1px solid black; */
  height: 580px;
}
.rightForm {
  /* border: 1px solid black; */
  height: 580px;
}
.midFormmid {
  margin-top: 70px;
  height: 400px;
}
.midFormmidCard {
  height: 400px;
}
#toogleSI {
  font-size: 12px;
}
#toogleSU {
  font-size: 12px;
}
</style>
