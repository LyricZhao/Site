<template>
    <div class="main">
        <el-dialog :visible.sync="visible" title="登录" center>
            <el-input type="text" placeholder="用户名" v-model="username"> </el-input>
            <el-input type="password" placeholder="密码" v-model="password"> </el-input>
            <el-checkbox v-model="remember_password"> 记住密码 </el-checkbox>
            <span slot="footer" class="dialog-footer">
                <el-button @click="login"> 确定 </el-button>
                <el-button @click="visible = false"> 取消 </el-button>
            </span>
        </el-dialog>
    </div>
</template>

<style scoped>
.el-input {
    margin-top: 15px
}

.el-checkbox {
    margin-top: 25px
}
</style>


<script>
import service_address from '@/settings/address.js'
import sha1 from 'sha1'

export default {
    name: 'login',
    data() {
        return {
            visible: false,
            username: '',
            password: '',
            remember_password: false
        }
    },

    methods: {
        loginFailed() {
            this.$notify.error({
                title: '登录失败',
                message: '请检查你的输入',
            })
        },
        loginSuccess(real_name) {
            this.$notify({
                title: '登录成功',
                message: '欢迎你，' + real_name + '！',
                type: 'success'
            })
        },
        setVisible(value) {
            this.visible = value
        },
        login() {
            if(this.username === '' || this.password === '') {
                this.loginFailed()
            } else {
                let data = {
                    username: this.username,
                    password: sha1(this.password)
                }
                this.$http.post(service_address.login_api, data).then((res) => {
                    if(res.body.info === 0) {
                        this.visible = false
                        this.loginSuccess(res.body.real_name)
                        sessionStorage.setItem('real_name', res.body.real_name)
                        sessionStorage.setItem('token', res.body.token)
                        sessionStorage.setItem('username', res.body.username)
                        if(this.remember_password) {
                            document.cookie = 'lpuid=' + data.username + ';path=/';
                            document.cookie = 'lppass=' + data.password + ';path=/';
                        }
                        this.$emit('successLogin')
                    } else {
                        this.loginFailed()
                    }
                })
            }
        }
    }
}
</script>