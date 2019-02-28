<template>
    <div class="main">
        <el-dialog center="true" title="新建账号" class="create-wrap" visible="true">
            <el-input type="text" placeholder="用户名" v-model="username"> </el-input>
            <el-input type="text" placeholder="真实姓名" v-model="real_name"> </el-input>
            <el-input type="password" placeholder="密码" v-model="password"> </el-input>
            <el-input type="password" placeholder="再次输入密码" v-model="password_duplicate"> </el-input>
            <el-input type="password" placeholder="权限密码" v-model="root_pass"> </el-input>
            <el-select v-model="level" placeholder="请选择账号类型">
                <el-option value="0"> 管理员 </el-option>
                <el-option value="1"> 小仙女 </el-option>
                <el-option value="2"> 小伙伴 </el-option>
            </el-select>
            <span slot="footer" class="dialog-footer">
                <el-button> 确定 </el-button>
                <el-button> 取消 </el-button>
            </span>
        </el-dialog>
    </div>
</template>

<style scoped>
.el-input {
    margin-top: 15px;
}

.el-select {
    margin-top: 15px;
}
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
            level: ''
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
