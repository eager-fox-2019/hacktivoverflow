<template>
    <div>
        <div class="field">
            <div class="head">
                <img src="https://hacktiv8.com/img/logo-01.png__vzu2vhp2VRX%2Bewg7J0bPlaA0f4f1c19c0064d527c72d44cfe007a08" alt=""><br>
                <h1 id="title"> Overflow</h1>
            </div>
            <div v-if="sess === 'login'">
                <p class="control has-icons-left has-icons-right">
                    <input v-model="formLogin.email" class="input" type="email" placeholder="Email">
                    <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                    </span>
                    <span class="icon is-small is-right">
                    <!-- <i class="fas fa-check"></i> -->
                    </span>
                </p>
                <div class="field">
                <p class="control has-icons-left">
                    <input v-model="formLogin.password" class="input" type="password" placeholder="Password">
                    <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                    </span>
                </p>
                </div>
                <div class="field">
                <p class="control">
                    <button v-if="!process" @click="login" class="button is-info">
                    Login
                    </button>
                    <a v-if="process" class="button is-info is-loading">Loading</a>
                </p>
                </div>
                </div>
            </div>
            <div v-if="sess === 'regis'">
                <p class="control has-icons-left has-icons-right">
                    <input v-model="formRegis.email" class="input" type="email" placeholder="Email">
                    <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                    </span>
                    <span class="icon is-small is-right">
                    <!-- <i class="fas fa-check"></i> -->
                    </span>
                </p>
                <p class="control has-icons-left has-icons-right">
                    <input v-model="formRegis.username" class="input" type="text" placeholder="Username">
                    <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                    </span>
                    <span class="icon is-small is-right">
                    <!-- <i class="fas fa-check"></i> -->
                    </span>
                </p>
                <div class="field">
                <p class="control has-icons-left">
                    <input v-model="formRegis.password" class="input" type="password" placeholder="Password">
                    <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                    </span>
                </p>
                </div>
                <div class="field">
                <p class="control">
                    <button v-if="!process" @click="register" class="button is-warning">
                    Register
                    </button>
                    <a v-if="process" class="button is-warning is-loading">Loading</a>
                </p>
                </div>
                </div>
            <a v-if="sess === 'regis'" @click.prevent="sess = 'login'" class="anchor" href="">already have account ? login</a>
            <a v-if="sess === 'login'" @click.prevent="sess = 'regis'" class="anchor" href="">don't have an account ? register</a>
    </div>
</template>

<script>

export default {
    data(){
        return{
            sess : 'login',
            formLogin : {},
            formRegis : {},
            process : false
        }
    },
    methods : {
        login(){
            this.process = true
            this.$store.dispatch('login', this.formLogin)
                .then(data => {
                    this.process = false
                    this.$toast.open({
                        message: 'Successfully Login!',
                        type: 'is-info'
                    })
                    // this.$router.push('/about')
                })
                .catch(err => {
                    this.process = false
                })
        },
        register(){
            this.process = true
            this.$store.dispatch('register', this.formRegis)
                 .then(data => {
                    this.process = false
                    this.$toast.open({
                        message: 'Successfully Created Account!',
                        type: 'is-warning'
                    })
                    this.sess = 'login'
                })
                .catch(err => {
                    this.process = false
                    this.sess = 'regis'
                })
        }
    }

}
</script>

<style>
#title{
  font-family: 'Yatra One', cursive;
  color: #EA5B2B;
  text-shadow: 2px -2px 1px white;
  font-size: 30px;
  
}
.head{
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 40%;
    margin-bottom: 10px;
}

.anchor {
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
}
</style>
