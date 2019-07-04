<template>
    <div>
        <q-btn @click="dialog = true" outline color="blue" class="q-mr-md">Login</q-btn>
        <q-dialog v-model="dialog" persistent>
            <q-card style="background-color: white; max-width: 600px; width: 440px;">
                <q-card-section>
                    <div class="text-h6">Login</div>
                </q-card-section>
                <q-card-section>

                    <q-form>
                        <q-input 
                        v-model="username"
                        outlined
                        label="Username"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Username cannot be empty']"
                        @keydown.enter.prevent="login"
                        >
                        </q-input>

                        <q-input 
                        v-model="password"
                        outlined
                        label="Password"
                        type="password"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Password cannot be empty']"
                        @keydown.enter.prevent="login"
                        >
                        </q-input>
                        
                    </q-form>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn outline color="grey-7" v-close-popup>Cancel</q-btn>
                    <q-btn color="blue" @click="login">Login</q-btn>
                </q-card-actions>

            </q-card>
        </q-dialog>
    </div>
</template>

<script>
export default {
    data () {
        return {
            dialog: false,
            username: "",
            password: "",
            baseUrl: this.$store.state.main.baseUrl
        }
    },
    methods: {
        login: function () {
            this.$axios.request({
                method: "POST",
                url: `${this.baseUrl}/users/login`,
                data: {
                    username: this.username,
                    password: this.password
                }
            })
            .then(success =>{
                sessionStorage.setItem("jwt", success.data.access_token)
                this.$store.commit("CHECK_LOGIN")
                this.$q.notify({
                    color: 'green-6',
                    textColor: 'white',
                    icon: 'done',
                    message: `Welcome back, ${success.data.username}.`,
                    position: 'top'
                })
                this.dialog = false
                this.username = ""
                this.password = ""
            })
            .catch(err =>{
                this.$q.notify({
                    color: 'red-5',
                    textColor: 'white',
                    icon: 'error',
                    message: err.response.data,
                    position: 'top'
                })
            })
        }
    }
}
</script>

<style>

</style>
