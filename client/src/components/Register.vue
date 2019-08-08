<template>
    <div>
    <div v-if="goingLogin == 'no'">
        <section>
            <form @submit.prevent="validateBeforeSubmit">
                <b-field label="Username"
                    :type="{'is-danger': errors.has('username')}"
                    :message="errors.first('username')">
                    <b-input type="text" v-model="username" name="username" v-validate="'required|alpha'" />
                </b-field>

                <b-field label="Email"
                    :type="{'is-danger': errors.has('email')}"
                    :message="errors.first('email')">
                    <b-input type="email" v-model="email" name="email" v-validate="'required|email'" />
                </b-field>

                <b-field label="Password"
                    :type="{'is-danger': errors.has('password')}"
                    :message="errors.first('password')">
                    <b-input type="password" v-model="password" name="password" v-validate="'required|min:2'"/>
                </b-field>

                <b-field label="Confirm password"
                    :type="{'is-danger': errors.has('confirm-password')}"
                    :message="[{
                        'The confirm password field is required' : errors.firstByRule('confirm-password', 'required'),
                        'The confirm password is not valid' : errors.firstByRule('confirm-password', 'is')
                    }]">
                    <b-input type="password" v-model="confirmPassword" name="confirm-password"
                        v-validate="{ required: true, is: password }" />
                </b-field>
                <button @click="registerData" type="submit" class="button is-primary"> Register </button>
            </form>
        </section>
                <button @click.prevent="goLogin" class="button is-primary"> Login </button>
    </div>
    <!--  -->
     <div v-if="goingLogin == 'yes'">
        <section>
             <form>
                <b-field label="Email">
                    <b-input type="email" v-model="emailLog" name="email" />
                </b-field>

                <b-field label="Password">
                    <b-input type="password" v-model="passwordLog" name="password" />
                </b-field>
                <button @click.prevent="loginData" type="submit" class="button is-primary"> Login </button>
            </form>
        </section>
    </div>
    </div>
</template>

<script>

export default {
    data() {
            return {
                username: null,
                email : null,
                password: null,
                confirmPassword: null,
                emailLog : null,
                passwordLog : null,
                goingLogin : 'no'
            }
        },
        methods: {
            validateBeforeSubmit() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        this.$toast.open({
                            message: 'Register Success, please click the login button',
                            type: 'is-success',
                            position: 'is-bottom'
                        })
                        return;
                    }
                    this.$toast.open({
                        message: 'Form is not valid! Please check the fields.',
                        type: 'is-danger',
                        position: 'is-bottom'
                    })
                });
            },
            validateBeforeSubmit2() {
               
            },
            registerData(){
                this.$store.dispatch('goRegister', {
                    username : this.username,
                    email : this.email,
                    password : this.password
                })
            },
            goLogin(){
                this.goingLogin = 'yes'
                console.log('masuk sini', this.goingLogin)
            },
             loginData(){
                 console.log('masuk ke l')
                this.$store.dispatch('goLogin', {
                    email : this.emailLog,
                    password : this.passwordLog
                })
                .then(result=>{
                    console.log(result, 'ini apa?')
                    this.$router.push('/MainPage')
                })
            }
        }
}
</script>

<style>

</style>
