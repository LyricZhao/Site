<template>
    <div>
        <div class="login-wrap">
            <h3> Login </h3>
            <input type="text" placeholder="Username" v-model="username">
            <input type="password" placeholder="Password" v-model="password">
            <button v-on:click="Login"> Login </button>
        </div>
    </div>
</template>

<style>
    .login-wrap{text-align:center;}
    input{display: block; width: 250px; height: 40px; line-height: 40px; margin: 0 auto; margin-bottom: 10px; outline: none; border: 1px solid #888; padding: 10px; box-sizing: border-box;}
    p{color: red;}
    button{display: block; width: 250px; height: 40px; line-height: 40px; margin: 0 auto; border: none; background-color:#41b883; color:#fff; font-size:16px; margin-bottom: 5px;}
    span{cursor: pointer;}
    span:hover{color: #41b883;}
</style>

<script>
/* eslint-disable */
import ServiceAddress from '@/settings/address.js'
import sha1 from 'sha1'

export default {
    data() {
        return {
            username: '',
            password: ''
        }
    },

    methods: {
        Login() {
            if(this.username === '' || this.password === '') {
                alert('Please input your username and password.')
            } else {
                let data = {
                    'username': this.username,
                    'password': sha1(this.password)
                }
                this.$http.post(ServiceAddress.login_api, data).then((res) => {
                    console.log(res)
                })
            }
        }
    }
}
</script>

