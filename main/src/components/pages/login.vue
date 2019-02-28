<template>
    <div class="main">
        <el-dialog visible="true" title="登录" center="true">
            <el-input type="text" placeholder="用户名" v-model="username"> </el-input>
            <el-input type="password" placeholder="密码" v-model="password"> </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button> 确定 </el-button>
                <el-button> 取消 </el-button>
            </span>
        </el-dialog>
    </div>
</template>

<style scoped>
.el-input {
    margin-top: 15px
}
</style>


<script>
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
                alert('请好好填写！')
            } else {
                let data = {
                    username: this.username,
                    password: sha1(this.password)
                }
                this.$http.post(ServiceAddress.login_api, data).then((res) => {})
            }
        }
    }
}
</script>