<template>
    <div>
        <q-btn @click="dialog = true" color="blue">Register</q-btn>
        <q-dialog v-model="dialog" persistent>
            <q-card style="background-color: white; max-width: 600px; width: 440px;">
                <q-card-section>
                    <div class="text-h6">Register</div>
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
                        @keydown.enter.prevent="register"
                        >
                        </q-input>

                        <q-input 
                        v-model="email"
                        outlined
                        label="Email"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Email cannot be empty']"
                        @keydown.enter.prevent="register"
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
                        @keydown.enter.prevent="register"
                        >
                        </q-input>
                    </q-form>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn outline color="grey-7" v-close-popup>Cancel</q-btn>
                    <q-btn color="blue" @click="register">Register</q-btn>
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
            email: "",
            password: "",
            baseUrl: this.$store.state.main.baseUrl
        }
    },
    methods: {
        register: function () {
            this.$axios.request({
                method: "POST",
                url: `${this.baseUrl}/users/register`,
                data: {
                    username: this.username,
                    email: this.email,
                    password: this.password
                }
            })
            .then(created =>{
                sessionStorage.setItem("jwt", created.data.access_token)
                this.$store.commit("CHECK_LOGIN")
                this.$q.notify({
                    color: 'green-6',
                    textColor: 'white',
                    icon: 'done',
                    message: `Welcome ${created.data.username}, you are our newest member, start posting!`,
                    position: 'top'
                })
                this.dialog = false
                this.username = ""
                this.email = ""
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
