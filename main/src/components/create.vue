<template>
    <div>
        <div class="create-wrap">
            <h3> 新建账号 </h3>
            <input type="text" placeholder="用户名" v-model="username">
            <input type="text" placeholder="真实姓名" v-model="real_name">
            <input type="password" placeholder="密码" v-model="password">
            <input type="password" placeholder="再次输入密码" v-model="password_duplicate">
            <input type="password" placeholder="权限密码" v-model="root_pass">
            <p> 请选择账号类型：
                <select v-model="level">
                    <option value="0"> 管理员 </option>
                    <option value="1"> 小仙女 </option>
                    <option value="2"> 小伙伴 </option>
                </select>
            </p>
            <button v-on:click="Submit"> 提交 </button>
        </div>
    </div>
</template>

<style scoped>
    .create-wrap{text-align:center;}
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
            real_name: '',
            root_pass: '',
            password: '',
            password_duplicate: '',
            level: "0"
        }
    },

    methods: {
        Submit() {
            if(this.username === '' || this.password === '' || this.real_name === '') {
                alert('请认真填写！')
            } else if(this.password !== this.password_duplicate) {
                alert('两次密码不一致！')
            } else {
                let data = {
                    username: this.username,
                    real_name: this.real_name,
                    root_pass: sha1(this.root_pass),
                    password: sha1(this.password),
                    level: Number(this.level),
                }
                this.$http.post(ServiceAddress.create_api, data).then((res) => {
                    console.log(res) /* DEBUG */
                })
            }
        }
    }
}
</script>

