<template>
    <div>
        <div class="say-wrap">
            <h3> 说点什么 </h3>
            <input class="input-text-wrap" type="text" placeholder="用户名" v-model="username">
            <input class="input-text-wrap" type="text" placeholder="说点什么" v-model="text"> 
            <p> <input type="checkbox" class="checkbox-wrap" v-model="secret"> 小秘密 </p>
            <button v-on:click="Submit"> 提交 </button>
        </div>
    </div>
</template>

<style>
    .say-wrap{text-align:center;}
    .input-text-wrap{display: block; width: 250px; height: 40px; line-height: 40px; margin: 0 auto; margin-bottom: 10px; outline: none; border: 1px solid #888; padding: 10px; box-sizing: border-box;}
    .checkbox-wrap{vertical-align:middle;margin-top:-1px;}
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
            text: '',
            secret: false
        }
    },

    methods: {
        Submit() {
            let data = {
                username: this.username,
                text: this.text,
                is_private: this.secret
            }
            this.$http.post(ServiceAddress.say_api, data).then((res) => { console.log(res) })
        }
    }
}
</script>
